<template>
  <div>
    <Bar :ingresos="ingresos" :egresos="egresos" v-if="loaded" />
  </div>
</template>

<script>
import Bar from "../components/Bar.vue";
export default {
  data() {
    return {
      loaded: false,
    };
  },
  created() {
    this.$store.dispatch("EgresoIndex/fetchIndexData");
    this.$store.dispatch("IngresoIndex/fetchIndexData");
  },
  components: {
    Bar,
  },
  computed: {
    ingresos() {
      let ingresosArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.$store.getters["IngresoIndex/data"].forEach((ingreso) => {
        ingresosArray[parseInt(ingreso.fecha.split("-")[1]) - 1] +=
          ingreso.monto;
      });
      this.loaded = true;
      return ingresosArray;
    },
    egresos() {
      let egresosArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      this.$store.getters["EgresoIndex/data"].forEach((egreso) => {
        egresosArray[parseInt(egreso.fecha.split("-")[1]) - 1] += egreso.monto;
      });
      return egresosArray;
    },
  },
};
</script>

<style>
</style>