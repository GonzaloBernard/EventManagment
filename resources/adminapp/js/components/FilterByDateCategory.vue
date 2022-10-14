<template>
  <v-row>
    <v-col cols="3">
      <v-menu
        v-model="menu1"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="desde"
            label="Desde"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            clearable
            @click:clear="$emit('filter', { tipo: 'desde', valor: null })"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="desde"
          @input="
            (menu1 = false), $emit('filter', { tipo: 'desde', valor: $event })
          "
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col cols="3">
      <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="hasta"
            label="Hasta"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
            clearable
            @click:clear="$emit('filter', { tipo: 'hasta', valor: null })"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="hasta"
          @input="
            (menu2 = false), $emit('filter', { tipo: 'hasta', valor: $event })
          "
        ></v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      desde: null,
      hasta: null,
      menu1: false,
      menu2: false,
      opcionSeleccionada: null,
    };
  }
};
</script>

<style>
</style>