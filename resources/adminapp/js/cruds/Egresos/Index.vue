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
              <strong>Egresos</strong>
            </h4>
          </div>

          <!-- <div class="card-body">
                        <router-link class="btn btn-primary" :to="{ name: 'egresos.create' }">
                            <i class="material-icons">
                                add
                            </i>
                            {{ $t('global.add') }}
                        </router-link>
                    </div> -->
          <div class="card-body">
            <v-row justify="center">
              <h4>Filtros</h4>
            </v-row>
            <v-row justify="center" class="filtros">
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
                  placeholder="Categoría"
                  :options="lists.egreso_categoria"
                />
              </v-col>
            </v-row>
            <download-excel
              class="btn btn-outline-success btn-sm"
              :data="egresosFiltrados"
              :fields="excel_headers"
              worksheet="Egresos"
              name="Egresos.xls"
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
                  :items="egresosFiltrados"
                  :search="search"
                >
                  <template v-slot:[`item.monto`]="{ item }">
                    <v-chip color="red darken-3" dark>
                      {{ `$ ${item.monto}` }}
                    </v-chip>
                  </template>
                  <template v-slot:[`item.fecha`]="{ item }">
                    {{ item.fecha.substring(0, 10) }}
                  </template>
                  <template v-slot:[`item.acciones`]="{ item }">
                    <div class="d-flex justify-content-center">
                     <!--#  <v-tooltip bottom color="primary">
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
                        <span>Editar Egreso</span>
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
                        <span>Borrar Egreso</span>
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
        categoria: "egreso_categoria.descripcion",
      },
      search: "",
      headers: [
        { text: "Fecha", value: "fecha" },
        { text: "Evento #", value: "evento.id" },
        { text: "Cliente", value: "evento.cliente" },
        { text: "Monto", value: "monto", align: "end" },
        { text: "Categoria", value: "egreso_categoria.descripcion" },
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
    ...mapGetters("EgresoIndex", ["data", "total", "loading", "lists"]),

    egresosFiltrados() {
      let egresosFiltered = this.data;

      if (this.filters["desde"].valor) {
        egresosFiltered = egresosFiltered.filter((egreso) =>
          moment(egreso.fecha).isAfter(moment(this.filters["desde"].valor))
        );
      }

      if (this.filters["hasta"].valor) {
        egresosFiltered = egresosFiltered.filter((egreso) =>
          moment(egreso.fecha).isBefore(moment(this.filters["hasta"].valor))
        );
      }

      if (this.filters["select"].valor) {
        egresosFiltered = egresosFiltered.filter(
          (egreso) =>
            egreso.egreso_categoria_id === this.filters["select"].valor.id
        );
      }

      return egresosFiltered;
    },
  },
  methods: {
    ...mapActions("EgresoIndex", ["fetchIndexData", "resetState", "destroyData"]),
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
