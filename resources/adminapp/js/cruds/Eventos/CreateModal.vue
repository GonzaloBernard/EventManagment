<template>
  <v-dialog :value="dialog" max-width="600" @click:outside="$emit('dialogClose')">
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
              v-model="picker"
            ></v-date-picker>
          </v-row>
          <v-radio-group v-model="isChecked">
            <v-radio
              label="Con hora de Inicio y Fin"
              color="indigo"
              :value="false"
            ></v-radio>
            <v-radio
              label="Evento de Todo el día"
              color="red"
              :value="true"
            ></v-radio>
          </v-radio-group>
          <v-text-field
            v-model="name"
            type="text"
            label="Nombre del Evento"
          ></v-text-field>
          <v-textarea
            rows="2"
            v-model="details"
            type="text"
            label="Detalles"
          ></v-textarea>
          <v-text-field
            v-model="color"
            type="color"
            label="color"
          ></v-text-field>
          <v-btn
            type="submit"
            color="primay"
            class="mr-4"
            >Crear Evento</v-btn
          >
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
export default {
  props: {
    dialog: {
      required: true,
      default: false,
    },
  },
  data() {
    return {
      picker: null,
      isChecked: null,
      name: null,
      details: null,
      color: null,
    };
  },
  methods: {
    addEvent() {
      console.log("hola");
    },
  },
};
</script>

<style>
</style>