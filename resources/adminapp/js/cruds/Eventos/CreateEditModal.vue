<template>
  <v-dialog
    :value="dialog"
    max-width="900"
    @click:outside="$emit('dialogClose')"
  >
    <v-card class="p-2">
      <v-container>
        <v-form @submit.prevent="addEvent">
          <v-row justify="center">
            <h3 v-if="scenario === 'create'" class="font-weight-bold">
              Crear nuevo evento
            </h3>
            <h3 v-if="scenario === 'edit'" class="font-weight-bold">
              {{ `Editar evento ${id}` }}
            </h3>
          </v-row>
          <v-divider class="mx-4 mb-8"></v-divider>
          <v-row justify="center">
            <v-col cols="7">
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
            <v-col class="ml-4" cols="4" align-self="center">
              <v-row>
                <v-text-field
                  class="col-8"
                  @input="updateAtributo($event, 'Nombre')"
                  type="text"
                  label="Nombre del Evento"
                  :value="entry.nombre"
                ></v-text-field>
                <v-select 
                  @input="updateAtributo($event, 'Nombre')"
                  :value="null"
                  placeholder=""
                  class="col-2"
                  :options="['Infanti x 20' ,'Teens x 20' ,'Salón Fiesta 1' ,'Salón Fiesta 2' ,'Especial']"
                />
              </v-row>
              <v-textarea
                rows="4"
                @input="updateAtributo($event, 'Descripcion')"
                type="text"
                label="Detalles"
                :value="entry.descripcion"
              ></v-textarea>
              <v-select
                name="lugar"
                class="my-2"
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
                class="my-4"
                :options="['30', '60', '90', '120', '150', '180', '210', '240']"
              />
              <v-text-field 
                @input="updateAtributo($event, 'Cliente')"
                type="text" 
                label="Mamá / Papá"
                :value="entry.cliente"
              ></v-text-field>

              <!-- FALTA AGREGARLO A VUEX- POST -->
              <v-text-field 
                @input="updateAtributo($event, 'Agasajado')"
                type="text" 
                label="Cumple de"
                :value="entry.agasajado"
              ></v-text-field>
              <!-- FALTA AGREGARLO A VUEX- POST -->
              <v-text-field 
                prefix="$"
                @input="updateAtributo($event, 'Precio')"
                type="number"
                label="Precio"
                :value="entry.precio"
              ></v-text-field>
              <v-row>
                <v-col align="center">
                  <v-btn class="" @click="setColor('#b62525')" rounded x-small color="#b62525"></v-btn>
                  <v-btn class="" @click="setColor('#27b054')" rounded x-small color="#27b054"></v-btn>
                  <v-btn class="" @click="setColor('#b2a61f')" rounded x-small color="#b2a61f"></v-btn>
                  <v-btn class="" @click="setColor('#27a7b0')" rounded x-small color="#27a7b0"></v-btn>
                  <v-btn class="" @click="setColor('#aa5f22')" rounded x-small color="#aa5f22"></v-btn>
                  <v-btn class="" @click="setColor('#244ba8')" rounded x-small color="#244ba8"></v-btn>
                  <v-btn class="" @click="setColor('#6441e1')" rounded x-small color="#6441e1"></v-btn>
                  <v-btn class="" @click="setColor('#137e86')" rounded x-small color="#137e86"></v-btn>
                </v-col>
                <v-col class="col-4" align="center">
                <v-text-field
                    @input="updateAtributo($event, 'Color')"
                    type="color"
                    :value="entry.color"
                ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row justify="center" class="mt-8">
            <v-btn @click.prevent="buttonHandler" color="secondary" class="mr-4">{{
              scenario === "create" ? "Crear Evento" : "Actualizar Evento"
            }}</v-btn>
            <v-btn
              type="submit"
              color="primay"
              class="mr-4"
              @click.prevent="$emit('dialogClose')"
              >Cerrar</v-btn
            >
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      fecha: "",
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
      "setLugar",
      "setCliente",
      "updateData",
      "setDuracion"
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
        !this.entry.descripcion ||
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
</style>
