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
              :value="entry.fecha"
            ></v-date-picker>
          </v-row>
          <v-text-field
            @input="updateAtributo($event, 'Nombre')"
            type="text"
            label="Nombre del Evento"
            :value="entry.nombre"
          ></v-text-field>
          <v-textarea
            rows="2"
            @input="updateAtributo($event,'Descripcion')"
            type="text"
            label="Detalles"
            :value="entry.descripcion"
          ></v-textarea>
          <v-text-field
            @input="updateAtributo($event,'Color')"
            type="color"
            label="color"
            :value="entry.color"
          ></v-text-field>
          <v-btn @click.prevent="scenario === 'create' ? addEvent : updateEvent"  color="primay" class="mr-4">Crear Evento</v-btn>
          <v-btn
            type="submit"
            color="error"
            class="mr-4"
            @click.prevent="$emit('dialogClose')"
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
    scenario: {
      required: false,
      default: ''
    },
    id: {
      required: false,
      default: null
    }
  },
  watch: {
    entry: {
      handler(newVal){ 
        console.log(newVal)
      }
    }
  },
  methods: {
    ...mapActions("EventoSingle", ["loading", "entry", "storeData", "setDescripcion", "setNombre", "setColor", "setFecha"]),

    // HAY QUE PASARLE COMO PARAMETRO EL NOMBRE DEL ATRIBUTO -> EJEMPLO: nombre = Nombre, = setNombre
    updateAtributo(e, nombre) {
      this[`set${nombre}`](e)
    },
    addEvent() {
      this.storeData()
      this.$emit("eventAdded")
      this.$emit("dialogClose")
    },
    updateEvent() {
      this.updateData()
      this.$emit("eventAdded")
      this.$emit("dialogClose")
    }
  },
};
</script>

<style>
</style>