<template>
  <v-container>
    <v-row justify="center">
      <!--       <v-col cols="3" align-self="center">
        <v-text-field
          :value="entry.descripcion"
          outlined
          @input="setDescripcion($event)"
          label="Monto"
        />
      </v-col> -->
      <v-col cols="3" align-self="center">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              outlined
              v-model="date"
              label="Seleccione Fecha"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" locale="es-es" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancelar </v-btn>
            <v-btn text color="primary" @click="saveDate(date)">
              Guardar Fecha
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="2" align-self="center">
        <v-text-field
          :value="entry.monto"
          outlined
          prepend-inner-icon="mdi-currency-usd"
          @input="setMonto($event)"
          label="Monto"
        />
      </v-col>
      <!-- <bootstrap-alert /> -->
      <v-col cols="3" align-self="center" class="mb-8">
        <v-select
          @input="setMedioDePago($event)"
          :value="entry.medio_de_pago"
          label="descripcion"
          placeholder="Medio de pago"
          :options="lists.medio_de_pagos"
        />
      </v-col>
      <v-col cols="2" align-self="center" class="mb-8">
        <v-btn
          @click="handleSubmit"
          color="green lighten-3"
          class="ma-2 white--text"
        >
        <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-divider></v-divider>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      menu: false,
      status: "",
      activeField: "",
    };
  },
  props: {
    scenario: {
      type: String,
      required: true,
      default: "",
    },
  },
  computed: {
    ...mapGetters("IngresoSingle", ["entry", "loading", "lists"]),
  },
  mounted() {
    this.fetchCreateData();
    this.saveDate(this.date);
  },
  beforeDestroy() {
    this.resetState();
  },
  methods: {
    ...mapActions("IngresoSingle", [
      "storeData",
      "resetState",
      "fetchCreateData",
      "setMedioDePago",
      "setDescripcion",
      "setMonto",
      "setFecha",
    ]),
    ...mapActions("EventoSingle", ["setIngreso"]),
    handleSubmit() {
      if (this.scenario === "multiple") {
        if (
          this.entry.fecha &&
          this.entry.medio_de_pago_id &&
          this.entry.monto
        ) {
          this.setIngreso({
            fecha: this.entry.fecha,
            medio_de_pago: this.entry.medio_de_pago,
            medio_de_pago_id: this.entry.medio_de_pago.id,
            monto: this.entry.monto,
          });
          this.setMonto(0);
        }
      } else {
        this.submitForm();
      }
    },
    saveDate(date) {
      this.$refs.menu.save(date);
      let dateFormat = date + " 00:00:00";
      this.setFecha(dateFormat);
    },
    submitForm() {
      this.storeData()
        .then(() => {
          this.$eventHub.$emit("create-success");
        })
        .catch((error) => {
          this.status = "failed";
          _.delay(() => {
            this.status = "";
          }, 3000);
        });
    },
    focusField(name) {
      this.activeField = name;
    },
    clearFocus() {
      this.activeField = "";
    },
  },
};
</script>
