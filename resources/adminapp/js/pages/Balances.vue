<template>
  <div class="container-fluid">
    <v-row>
      <FilterByDateCategory @filter="filters[$event.tipo].valor = $event.valor"/>
      <v-btn @click="filtrar">Filtrar</v-btn>
    </v-row>  
    <v-row>
      <v-col>
        <v-data-table
          must-sort
          :sort-by="['fecha']"
          :sort-desc="[true]"
          :headers="headers"
          :items="[
            ...$store.getters['EgresoIndex/data'].map((egreso) => {
              return { ...egreso, id: 'e' + egreso.id };
            }),
            ...$store.getters['IngresoIndex/data'],
          ]"
          :search="search"
          item-key="id"
          >
          <template v-slot:[`item.monto`]="{ item }">
            <!--# Si es un egreso el id tiene prefijo e --  item.id[0] === e egreso -->
            <v-chip outlined :color=" item.id[0] === 'e' ? 'red' : 'green' ">${{ item.monto }}</v-chip>
            <v-chip outlined :color=" item.id[0] === 'e' ? 'red' : 'green' ">{{ item.medio_de_pago?.descripcion?? item.egreso_categoria.descripcion}}</v-chip>
          </template>
        </v-data-table>
      </v-col>
      <v-col md="4">
        <Bar :height="600" :ingresos="ingresos" :egresos="egresos" v-if="loaded" />
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
      headers: [
        { text: "Fecha", value: "fecha" },
        { text: "Monto", value: "monto" },
        { text: "Evento", value: "evento.cliente" },
      ],
    };
  },
  created() {
    this.$store.dispatch("EgresoIndex/fetchIndexData");
    this.$store.dispatch("IngresoIndex/fetchIndexData");
  },
  components: {
    Bar,
    FilterByDateCategory
  },
  methods: {
    filtrar () {
      alert('en desarrollo')
    }
  },
  computed: {
    ingresos() {
      let ingresosArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.$store.getters["IngresoIndex/data"].forEach((ingreso) => {
        ingresosArray[parseInt(ingreso.fecha.split("-")[1]) - 1] +=
          ingreso.monto;
      });
      return ingresosArray;
    },
    egresos() {
      let egresosArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.$store.getters["EgresoIndex/data"].forEach((egreso) => {
        egresosArray[parseInt(egreso.fecha.split("-")[1]) - 1] += egreso.monto;
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