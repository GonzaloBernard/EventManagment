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
              <v-col cols="8">
              <filter-by-date-category
                :opcionesSelect="lists.lugar"
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
                      <v-tooltip bottom color="primary">
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
                      </v-tooltip>
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
import FilterByDateCategory from "../../components/FilterByDateCategory.vue";

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

      search: "",
      headers: [
        { text: "Fecha", value: "fecha" },
        { text: "Monto", value: "monto" },
        { text: "Categoria", value: "egreso_categoria.descripcion" },
        { text: "Evento", value: "evento.cliente" },
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
    ...mapActions("EgresoIndex", ["fetchIndexData", "resetState"]),
    editItem() {
      alert("EN desarrollo");
    },
    destroyDataAction() {
      alert("EN desarrollo");
    },
  },
};
</script>
