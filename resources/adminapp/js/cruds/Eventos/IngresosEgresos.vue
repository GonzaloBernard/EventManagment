<template>
  <v-row justify="center">
    <template >
      <span class="m-1">Saldo Pendiente </span> 
      
      <v-chip color="green darken-3" dark>
          {{`$ ${getSaldoPendiente}`}}
      </v-chip>
    </template>
    <create-ingreso scenario="multiple" />
    <create-egreso scenario="multiple" />

    <v-row justify="center">
      <v-card
        v-for="(ingreso, indexIngreso) in entry.ingresos"
        elevation="3"
        class="mx-2 mb-4"
        color="green darken-3"
        dark
        outlined
        shaped
        :key="indexIngreso + 200"
        width="200"
      >
        <v-card-title class="mb-2">
          <v-row justify="space-around">
            <span class="ml-1">Ingreso</span>
            <!-- El v-if="!ingreso.created_at" deja eliminar solo los que no esten en base de datos -->
            <!-- Todos los ingresos / egresos con created_at NO SE MANDAN en la request -->
            <v-btn
              v-if="!ingreso.created_at"
              fab
              dark
              x-small
              color="green lighten-3"
              @click="removeEgresoIngreso('Ingreso', indexIngreso)"
            >
              <v-icon dark color="white"> mdi-delete-forever </v-icon>
            </v-btn>
          </v-row>
        </v-card-title>
        <v-card-text>
          <p>Fecha: {{ ingreso.fecha }}</p>
          <p>Monto: {{ ingreso.monto }}</p>
          <p>
            Medio de pago:
            {{
              ingreso.medio_de_pago !== null ? ingreso.medio_de_pago.descripcion : 'No registrado'
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
        <v-card-title class="mb-2">
          <v-row justify="space-around">
            <span class="ml-1">Egreso</span>
            <!-- El v-if="!egreso.created_at" deja eliminar solo los que no esten en base de datos -->
            <!-- Todos los egresos / egresos con created_at NO SE MANDAN en la request -->
            <v-btn
            v-if="!egreso.created_at"
              fab
              dark
              x-small
              color="red lighten-3"
              @click="removeEgresoIngreso('Egreso', index)"
            >
              <v-icon dark color="white"> mdi-delete-forever </v-icon>
            </v-btn>
          </v-row>
        </v-card-title>

        <v-card-text>
          <p>Fecha: {{ egreso.fecha.substring(0, 10) }}</p>
          <p>Monto: {{ egreso.monto }}</p>
          <p>
            Categoria:
            {{
              egreso.egreso_categoria !== null ? egreso.egreso_categoria.descripcion : 'No registrado'
            }}
          </p>
        </v-card-text>
      </v-card>
    </v-row>
  </v-row>
</template>

<script>
import CreateIngreso from "@cruds/Ingresos/Create";
import CreateEgreso from "@cruds/Egresos/Create";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("EventoSingle", ["entry","getSaldoPendiente"]),
    ...mapGetters("IngresoSingle", ["listsIngresos"]),
    ...mapGetters("EgresoSingle", ["listsEgresos"]),
  },
  methods: {
    ...mapActions("EventoSingle", ["removeEgreso", "removeIngreso"]),
    removeEgresoIngreso(tipo, index) {
      this[`remove${tipo}`](index);
    },
  },
  components: {
    CreateIngreso,
    CreateEgreso,
  },
};
</script>

<style>
</style>