<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div :class="[$vuetify.theme.dark ? 'bg-dark' : '', 'card']">
          <div class="card-header card-header-primary card-header-icon">
            <div class="card-icon">
              <i class="material-icons">assignment</i>
            </div>
            <h4
              :class="[$vuetify.theme.dark ? 'text-light' : '', 'card-title']"
            >
              <strong>Ingresos</strong>
            </h4>
          </div>
          <div class="card-body">
            <v-row justify="center">
              <h4>Filtros</h4>
            </v-row>
            <v-row justify="center"  class="filtros">
              <v-col cols="8">
                <filter-by-date-category
                  @filter="filters[$event.tipo].valor = $event.valor"
                />
              </v-col>
              <v-col cols="4" align-self="center">
                <v-select
                  @input="filters['select'].valor = $event"
                  v-model="opcionSeleccionada"
                  label="descripcion"
                  placeholder="Medio de pago"
                  :options="lists.medio_de_pagos"
                />
              </v-col>
            </v-row>
            <download-excel
              class="btn btn-outline-success btn-sm"
              :data="ingresosFiltrados"
              :fields="excel_headers"
              worksheet="Ingresos"
              name="Ingresos.xls"
            >
              <v-icon color="green darken-3" class="mr-2"
                >mdi-download-circle</v-icon
              >
              Descargar Excel
            </download-excel>
            <div class="row">
              <div class="col-md-12">
                <v-data-table
                  :headers="headers"
                  :items="ingresosFiltrados"
                  :search="search"
                >
                  <template v-slot:[`item.monto`]="{ item }">
                    <v-chip color="green darken-3" dark>
                      {{ `$ ${item.monto?.toFixed(2)}` }}
                    </v-chip>
                  </template>
                  <template v-slot:[`item.fecha`]="{ item }">
                    {{ item.fecha.substring(0, 10) }}
                  </template>
                  <template v-slot:[`item.acciones`]="{ item }">
                    <div class="d-flex justify-content-center">
                      <!--# <v-tooltip bottom color="primary">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="editItem(item.id)"
                            class="mx-1"
                            fab
                            dark
                            x-small
                            v-bind="attrs"
                            v-on="on"
                            color="primary"
                            ><v-icon dark>mdi-pencil</v-icon></v-btn
                          >
                        </template>
                        <span>Editar Ingreso</span>
                      </v-tooltip> -->
                      <v-tooltip top color="error">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            @click="destroyDataAction(item.id)"
                            class="mx-1"
                            fab
                            dark
                            x-small
                            v-bind="attrs"
                            v-on="on"
                            color="red darken-3"
                            ><v-icon dark>mdi-delete-forever</v-icon>
                          </v-btn>
                        </template>
                        <span>Borrar Ingreso</span>
                      </v-tooltip>
                    </div>
                  </template>
                </v-data-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import FilterByDateCategory from "@/components/FilterByDateCategory.vue";

export default {
  components: { FilterByDateCategory },
  data() {
    return {
      search: "",
      opcionSeleccionada: null,
      filters: {
        desde: {
          valor: null,
        },
        hasta: {
          valor: null,
        },
        select: {
          valor: null,
        },
      },
      excel_headers: {
        id: "id",
        fecha: "fecha",
        evento: "evento.cliente",
        monto: "monto",
        "medio de pago": "medio_de_pago.descripcion",
      },
      headers: [
        { text: "Fecha", value: "fecha" },
        { text: "Evento #", value: "evento.id" },
        { text: "Cliente", value: "evento.cliente" },
        { text: "Monto", value: "monto", align: "end" },
        { text: "Medio de Pago", value: "medio_de_pago.descripcion" },
        { text: "Acciones", value: "acciones", align: "center" },
      ],
    };
  },
  beforeDestroy() {
    this.resetState();
  },
  created() {
    //console.log("asd")
    this.fetchIndexData();
  },
  computed: {
    ...mapGetters("IngresoIndex", ["data", "total", "loading", "lists"]),

    ingresosFiltrados() {
      let ingresosFiltered = this.data;

      if (this.filters["desde"].valor) {
        ingresosFiltered = ingresosFiltered.filter((ingreso) =>
          moment(ingreso.fecha).isAfter(moment(this.filters["desde"].valor))
        );
      }

      if (this.filters["hasta"].valor) {
        ingresosFiltered = ingresosFiltered.filter((ingreso) =>
          moment(ingreso.fecha).isBefore(moment(this.filters["hasta"].valor))
        );
      }

      if (this.filters["select"].valor) {
        ingresosFiltered = ingresosFiltered.filter(
          (ingreso) =>
            ingreso.medio_de_pago_id === this.filters["select"].valor.id
        );
      }

      return ingresosFiltered;
    },
  },
  methods: {
    ...mapActions("IngresoIndex", ["fetchIndexData", "resetState", "destroyData"]),
    editItem() {
      alert("EN desarrollo");
    },
    destroyDataAction(id) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        confirmButtonColor: "#dd4b39",
        focusCancel: true,
        reverseButtons: true,
      }).then((result) => {
        if (result.value) {
          this.destroyData(id);
        }
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.filtros
  background-color: rgba(0,0,0,0.03)
  margin-bottom: .75rem
  margin-top: .5rem
  border-style: groove
</style>
