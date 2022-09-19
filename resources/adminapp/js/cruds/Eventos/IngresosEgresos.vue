<template>
  <v-row justify="center">
    <create-ingreso :scenario="'Multiple'" />
    <create-egreso :scenario="'Multiple'"/>
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
};
</script>

<style>
</style>