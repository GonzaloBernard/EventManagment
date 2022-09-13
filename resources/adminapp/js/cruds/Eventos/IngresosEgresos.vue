<template>
  <v-row justify="center">
    <create-ingreso v-if="agregarIngreso" :scenario="'Multiple'" />
    <create-egreso v-if="agregarEgreso" :scenario="'Multiple'"/>
    <v-btn
      v-if="!agregarIngreso"
      @click="agregarIngreso = !agregarIngreso"
      color="green darken-3"
      class="ma-2 white--text"
    >
      Agregar Ingreso
      <v-icon right dark> mdi-plus </v-icon>
    </v-btn>
    <v-btn
      v-if="!agregarEgreso"
      @click="agregarEgreso = !agregarEgreso"
      color="red darken-3"
      class="ma-2 white--text"
    >
      Agregar Egreso
      <v-icon right dark> mdi-minus </v-icon>
    </v-btn>
  </v-row>
</template>

<script>
import CreateIngreso from "@cruds/Ingresos/Create";
import CreateEgreso from "@cruds/Egresos/Create";
export default {
  components: {
    CreateIngreso,
    CreateEgreso
  },
  data() {
    return {
      agregarIngreso: false,
      agregarEgreso: false,
    };
  },
};
</script>

<style>
</style>