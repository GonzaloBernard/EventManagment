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
              <v-text-field
                @input="updateAtributo($event, 'Nombre')"
                type="text"
                label="Nombre del Evento"
                :value="entry.nombre"
              ></v-text-field>
              <v-textarea
                rows="4"
                @input="updateAtributo($event, 'Descripcion')"
                type="text"
                label="Detalles"
                :value="entry.descripcion"
              ></v-textarea>
              <v-text-field
                @input="updateAtributo($event, 'Color')"
                type="color"
                label="color"
                :value="entry.color"
              ></v-text-field>
              <v-text-field
                @input="updateAtributo($event, 'Lugar')"
                type="text"
                label="Escribir 1 para pelotero"
                :value="entry.lugar_id"
              ></v-text-field>
              <v-text-field
                type="text"
                label="Cliente"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center" class="mt-8">
            <v-btn @click.prevent="buttonHandler" color="primay" class="mr-4"
              >{{scenario === 'create' ? 'Crear Evento' : 'Actualizar Evento'}}</v-btn
            >
            <v-btn
              type="submit"
              color="error"
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
    ...mapGetters("EventoSingle", ["entry"]),
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
      "updateData",
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
    addEvent() {
      this.storeData();
      this.$emit("eventAdded");
      this.$emit("dialogClose");
    },
    updateEvent() {
      this.updateData();
      this.$emit("eventAdded");
      this.$emit("dialogClose");
    },
  },
};
</script>

<style>
</style>
