<template>
  <v-row justify="center">
    <create-ingreso :scenario="scenario" />
    <create-egreso :scenario="scenario"/>
  </v-row>
</template>

<script>
import CreateIngreso from "@cruds/Ingresos/Create";
import CreateEgreso from "@cruds/Egresos/Create";
export default {
  props: {
    scenario: {
      type: String,
      required: true,
      default: 'single'
    }
  },
  components: {
    CreateIngreso,
    CreateEgreso
  },
};
</script>

<style>
</style>