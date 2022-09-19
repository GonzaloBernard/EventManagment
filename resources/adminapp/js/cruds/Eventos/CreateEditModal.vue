<template>
  <v-dialog
    :value="dialog"
    max-width="900"
    @click:outside="$emit('dialogClose')"
  >
    <v-stepper v-model="paso" non-linear>
      <v-stepper-header>
        <v-stepper-step editable step="1">
          Fecha y hora del evento
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="2"> Datos del Evento </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step editable step="3">
          Ingresos / Egresos de Dinero
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card>
            <v-container>
              <v-form @submit.prevent="addEvent">
                <v-row justify="center">
                  <v-col cols="12">
                    <v-row justify="center">
                      <v-date-picker
                        landscape
                        locale="es-es"
                        full-width
                        @input="updateAtributo($event, 'Fecha')"
                        :value="entry.fecha"
                      ></v-date-picker>
                    </v-row>
                    <v-row justify="center">
                      <v-time-picker
                        :value="
                          entry.fecha.length > 10
                            ? entry.fecha
                                .split(' ')[1]
                                .replace(' ', '')
                                .substring(0, 5)
                            : ''
                        "
                        format="24hr"
                        full-width
                        landscape
                        @input="updateAtributo($event, 'Hora')"
                      ></v-time-picker>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row justify="center" class="mt-8">
                  <v-btn
                    color="red darken-3"
                    class="mr-4"
                    dark
                    @click.prevent="$emit('dialogClose')"
                    >Cerrar</v-btn
                  >
                  <v-btn color="primary" @click="paso = 2" class="mx-2">
                    Continuar
                    <v-icon dark right>mdi-arrow-right-box</v-icon>
                  </v-btn>
                </v-row>
              </v-form>
            </v-container>
          </v-card>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-row justify="space-around" class="pa-4">
            <v-col cols="5" align-self="center" class="mr-4">
              <v-row>
                <v-text-field
                  class="col-7"
                  @input="updateAtributo($event, 'Nombre')"
                  type="text"
                  label="Nombre del Evento"
                  :value="entry.nombre"
                ></v-text-field>
                <v-select
                  @input="updateAtributo($event, 'Nombre')"
                  :value="null"
                  placeholder=""
                  class="col-5"
                  :options="[
                    'Infanti x 20',
                    'Teens x 20',
                    'Salón Fiesta 1',
                    'Salón Fiesta 2',
                    'Especial',
                  ]"
                />
              </v-row>
              <v-select
                name="lugar"
                class="mt-8"
                label="descripcion"
                placeholder="Seleccione Lugar"
                :key="'id'"
                :value="entry.lugar_id"
                :options="lists.lugar"
                :closeOnSelect="true"
                :reduce="(lugar) => lugar.id"
                @input="updateAtributo($event, 'Lugar')"
                @[`search.focus`]="focusField('lugar')"
              />
              <v-select
                @input="updateAtributo($event, 'Duracion')"
                :value="entry.duracion"
                placeholder="Duración del evento (en minutos)"
                class="my-8"
                :options="['30', '60', '90', '120', '150', '180', '210', '240']"
              />
              <v-text-field
                @input="updateAtributo($event, 'Cliente')"
                type="text"
                label="Mamá / Papá"
                :value="entry.cliente"
              ></v-text-field>
              <v-text-field
                @input="updateAtributo($event, 'Agasajado')"
                type="text"
                label="Cumple de"
                :value="entry.agasajado"
              ></v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
                prefix="$"
                @input="updateAtributo($event, 'Precio')"
                type="number"
                label="Precio"
                :value="entry.precio"
              ></v-text-field>
              <v-textarea
                rows="4"
                @input="updateAtributo($event, 'Descripcion')"
                type="text"
                label="Detalles"
                :value="entry.descripcion"
              ></v-textarea>
              <v-row justify="center" class="mt-4">
                <v-col cols="4">
                  <v-btn
                    v-for="(color, index) in colors"
                    :key="index"
                    class=""
                    @click="setColor(color)"
                    rounded
                    x-small
                    :color="color"
                  ></v-btn>
                </v-col>
                <v-col cols="4" align-self="center">
                  <v-text-field
                    @input="updateAtributo($event, 'Color')"
                    type="color"
                    :value="entry.color"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="center" class="mb-4">
            <v-btn
              color="red darken-3"
              class="mr-4"
              dark
              @click.prevent="$emit('dialogClose')"
              >Cerrar</v-btn
            >
            <v-btn color="primary" @click="paso = 3" class="mx-2">
              Continuar
              <v-icon dark right>mdi-arrow-right-box</v-icon>
            </v-btn>
          </v-row>
        </v-stepper-content>
        <v-stepper-content step="3">
          <IngresosEgresos class="my-4" />
          <v-row justify="center">
            <v-card
              v-for="(ingreso, indexIngreso) in entry.ingresos"
              elevation="3"
              class="mx-2 mb-4"
              color="green darken-3"
              dark
              outlined
              shaped
              :key="indexIngreso + 5"
              width="200"
            >
              <v-card-title> Ingreso </v-card-title>
              <v-card-text>
                <p>Fecha: {{ ingreso.fecha }}</p>
                <p>Monto: {{ ingreso.monto }}</p>
                <p>
                  Medio de pago:
                  {{
                    listsIngresos.medio_de_pagos.find(
                      (medio) => medio.id === ingreso.medio_de_pago_id
                    ).descripcion
                  }}
                </p>
              </v-card-text>
            </v-card>
            <v-card
              v-for="(egreso, index) in entry.egresos"
              elevation="3"
              color="red darken-3"
              class="mx-2 mb-4"
              dark
              outlined
              shaped
              :key="index"
              width="200"
            >
              <v-card-title> Egreso </v-card-title>
              <v-card-text>
                <p>Fecha: {{ egreso.fecha.substring(0, 10) }}</p>
                <p>Monto: {{ egreso.monto }}</p>
                <p>
                  Categoria:
                  {{
                    listsEgresos.egreso_categoria.find(
                      (categoria) => categoria.id === egreso.egreso_categoria_id
                    ).descripcion
                  }}
                </p>
              </v-card-text>
            </v-card>
          </v-row>
          <v-divider></v-divider>
          <v-row justify="center">
            <v-btn
              @click.prevent="buttonHandler"
              color="green accent-4"
              dark
              class="mr-4 my-4"
              large
            >
              <v-icon dark left>mdi-calendar-plus</v-icon>
              {{
                scenario === "create" ? "Crear Evento" : "Actualizar Evento"
              }}</v-btn
            >
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import IngresosEgresos from "./IngresosEgresos.vue";
export default {
  components: {
    IngresosEgresos,
  },
  data() {
    return {
      fecha: "",
      paso: 1,
      colors: [
        "#b62525",
        "#27b054",
        "#b2a61f",
        "#27a7b0",
        "#aa5f22",
        "#244ba8",
        "#6441e1",
        "#137e86",
      ],
    };
  },
  props: {
    dialog: {
      required: true,
      default: false,
    },
    scenario: {
      required: false,
      default: "",
    },
    id: {
      required: false,
      default: null,
    },
  },
  computed: {
    ...mapGetters("EventoSingle", ["entry", "lists"]),
    ...mapGetters("IngresoSingle", ["listsIngresos"]),
    ...mapGetters("EgresoSingle", ["listsEgresos"]),
  },
  watch: {
    scenario: {
      handler(newVal) {
        this.scenario = newVal;
      },
    },
  },
  methods: {
    ...mapActions("EventoSingle", [
      "loading",
      "storeData",
      "setDescripcion",
      "setNombre",
      "setColor",
      "setHora",
      "setFecha",
      "setAgasajado",
      "setPrecio",
      "setLugar",
      "setCliente",
      "updateData",
      "setDuracion",
    ]),

    // HAY QUE PASARLE COMO PARAMETRO EL NOMBRE DEL ATRIBUTO -> EJEMPLO: nombre = Nombre, = setNombre
    updateAtributo(e, nombre) {
      this[`set${nombre}`](e);
    },
    buttonHandler() {
      if (this.scenario === "create") {
        this.addEvent();
      } else {
        this.updateEvent();
      }
    },
    validator() {
      if (
        this.entry.fecha.length < 1 ||
        !this.entry.hora ||
        !this.entry.nombre ||
        !this.entry.lugar_id
      )
        return false;
      else return true;
    },
    addEvent() {
      if (this.validator()) {
        this.storeData();
        this.$emit("eventAdded");
        this.$emit("dialogClose");
      } else {
        this.$swal("error", "Faltan datos");
      }
    },
    updateEvent() {
      if (this.validator()) {
        this.updateData();
        this.$emit("eventAdded");
        this.$emit("dialogClose");
      } else {
        this.$swal("error", "Faltan datos");
      }
    },
  },
};
</script>

<style>
.v-dialog {
  overflow: auto;
}
</style>
