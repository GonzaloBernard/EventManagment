<template>
  <div class="container-fluid">
    <FilterByDateCategory @filter="filters[$event.tipo].valor = $event.valor" />
    <v-row justify="space-between">
      <download-excel
        class="btn btn-outline-success btn-sm ml-4"
        :data="[...ingresosFiltrados, ...egresosFiltrados]"
        :fields="excel_headers"
        worksheet="Balances"
        name="balance.xls"
      >
        <v-icon color="green darken-3" class="mr-2">mdi-download-circle</v-icon>
        Descargar Excel
      </download-excel>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-data-table
          must-sort
          :sort-by="['fecha']"
          :sort-desc="[true]"
          :headers="headers"
          :items="[...ingresosFiltrados, ...egresosFiltrados]"
          :search="search"
          item-key="id"
        >
          <template v-slot:[`item.fecha`]="{ item }">
            {{ item.fecha.substring(0, 10) }}
          </template>
          <template v-slot:[`item.monto`]="{ item }">
            $ {{ item.monto }}
          </template>
          <template v-slot:[`item.movimiento`]="{ item }">
            <!--# Si es un egreso el id tiene prefijo e --  item.id[0] === e egreso -->
            <v-chip outlined :color="item.id[0] === 'e' ? 'red' : 'green'">
              {{
                item.medio_de_pago?.descripcion ??
                item.egreso_categoria.descripcion
              }}</v-chip
            >
          </template>
        </v-data-table>
      </v-col>
      <v-divider inset vertical></v-divider>
      <v-col cols="6">
        <Bar
          :height="600"
          :ingresos="ingresos"
          :egresos="egresos"
          v-if="loaded"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Bar from "../components/Bar.vue";
import FilterByDateCategory from "@components/FilterByDateCategory";
export default {
  data() {
    return {
      search: "",
      excel_headers: {
        id: {
          callback: (value) => {
            return `${value.id.substring(1)}`;
          },
        },
        fecha: "fecha",
        evento: "evento.cliente",

        ingreso: {
            callback: (value) => {
              console.log(value)
              let ingreso = value.id.substring(0,1) === 'i' ? value.monto: ''
                return ` ${ingreso}`;
            },},
        egreso: {
        callback: (value) => {
          console.log(value)
          let egreso = value.id.substring(0,1) === 'e' ? value.monto: ''
            return ` ${egreso}`;
        },},
        "medio de pago": "medio_de_pago.descripcion",
        "Egreso Categoría": "egreso_categoria.descripcion",
      },
      headers: [
        { text: "Fecha", value: "fecha", align: "center" },
        { text: "Evento", align: "center", value: "evento.cliente" },
        { text: "Monto", value: "monto", align: "center" },
        { text: "Movimiento", align: "center", value: "movimiento" },
      ],
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
    };
  },
  created() {
    this.$store.dispatch("EgresoIndex/fetchIndexData");
    this.$store.dispatch("IngresoIndex/fetchIndexData");
  },
  components: {
    Bar,
    FilterByDateCategory,
  },
  methods: {
    filtrar() {
      alert("en desarrollo");
    },
  },
  computed: {
    ingresosFiltrados() {
      let ingresosFiltered = this.$store.getters["IngresoIndex/data"].map(
        (ingreso) => {
          return { ...ingreso, id: "i" + ingreso.id };
        }
      );

      if (this.filters["desde"].valor) {
        ingresosFiltered = ingresosFiltered.filter((ingreso) =>
          moment(ingreso.fecha).isSameOrAfter(
            moment(this.filters["desde"].valor)
          )
        );
      }

      if (this.filters["hasta"].valor) {
        ingresosFiltered = ingresosFiltered.filter((ingreso) =>
          moment(ingreso.fecha).isSameOrBefore(
            moment(this.filters["hasta"].valor)
          )
        );
      }
      return ingresosFiltered;
    },
    egresosFiltrados() {
      let egresosFiltered = this.$store.getters["EgresoIndex/data"].map(
        (egreso) => {
          return { ...egreso, id: "e" + egreso.id };
        }
      );

      if (this.filters["desde"].valor) {
        egresosFiltered = egresosFiltered.filter((ingreso) =>
          moment(ingreso.fecha).isSameOrAfter(
            moment(this.filters["desde"].valor)
          )
        );
      }

      if (this.filters["hasta"].valor) {
        egresosFiltered = egresosFiltered.filter((ingreso) =>
          moment(ingreso.fecha).isBefore(moment(this.filters["hasta"].valor))
        );
      }
      return egresosFiltered;
    },
    ingresos() {
      let ingresosArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.$store.getters["IngresoIndex/data"].forEach((ingreso) => {
        ingresosArray[parseInt(ingreso.fecha.split("-")[1]) - 1] +=
          parseFloat(ingreso.monto);
      });
      return ingresosArray;
    },
    egresos() {
      let egresosArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.$store.getters["EgresoIndex/data"].forEach((egreso) => {
        egresosArray[parseInt(egreso.fecha.split("-")[1]) - 1] += parseFloat(egreso.monto);
      });
      return egresosArray;
    },
    loaded() {
      return (
        this.ingresos.some((ingreso) => ingreso > 0) &&
        this.egresos.some((egreso) => egreso > 0)
      );
    },
  },
};
</script>

<style>
</style>
