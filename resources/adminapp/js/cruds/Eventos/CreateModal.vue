<template>
  <v-dialog
    :value="dialog"
    max-width="600"
    @click:outside="$emit('dialogClose')"
  >
    <v-card class="p-2">
      <v-container>
        <v-form @submit.prevent="addEvent">
          <v-row justify="center">
            <h3 class="font-weight-bold">Crear nuevo evento</h3>
          </v-row>
          <v-divider class="mx-4 mb-8"></v-divider>
          <v-row justify="center">
            <v-chip label outlined color="primary" class="mb-2">Fecha</v-chip>
            <v-date-picker
              locale="es-es"
              elevation="5"
              full-width
              @input="updateAtributo($event, 'Fecha')"
            ></v-date-picker>
          </v-row>
          <v-text-field
            @input="updateAtributo($event, 'Nombre')"
            type="text"
            label="Nombre del Evento"
          ></v-text-field>
          <v-textarea
            rows="2"
            @input="updateAtributo($event,'Descripcion')"
            type="text"
            label="Detalles"
          ></v-textarea>
          <v-text-field
            @input="updateAtributo($event,'Color')"
            type="color"
            label="color"
          ></v-text-field>
          <v-btn @click.prevent="addEvent()"  color="primay" class="mr-4">Crear Evento</v-btn>
          <v-btn
            type="submit"
            color="error"
            class="mr-4"
            @click="$emit('dialogClose')"
            >Cerrar</v-btn
          >
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    dialog: {
      required: true,
      default: false,
    },
  },
  methods: {
    ...mapActions("EventoSingle", ["storeData", "setDescripcion", "setNombre", "setColor", "setFecha"]),

    // HAY QUE PASARLE COMO PARAMETRO EL NOMBRE DEL ATRIBUTO -> EJEMPLO: nombre = Nombre, = setNombre
    updateAtributo(e, nombre) {
      this[`set${nombre}`](e)
    },
    addEvent() {
      this.storeData()
      this.$emit("eventAdded")
      this.$emit("dialogClose")
    }
  },
};
</script>

<style>
</style>