<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header card-header-primary card-header-icon">
            <div class="card-icon">
              <i class="material-icons">assignment</i>
            </div>
            <h4 class="card-title">
              {{ $t("global.table") }}
              <strong>Evento</strong>
            </h4>
          </div>

          <div class="card-body">
            <v-btn
              color="primary"
              outlined
              class="mr-4"
              @click.stop="createEvent"
              >Nuevo</v-btn
            >
            <CreateEditModal
              :dialog="dialog"
              :scenario="scenario"
              :id="selectedEvent.id"
              @dialogClose="dialog = false"
              @eventAdded="fetchIndexData"
            />
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <template>
                  <v-card>
                    <v-card-title>
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <v-data-table
                      :headers="headers"
                      :items="data"
                      :search="search"
                    >
                      <template v-slot:[`item.acciones`]="{ item }">
                        <div class="d-flex justify-content-center">
                          <v-tooltip top color="success">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                @click="saldoFinal(item.id)"
                                class="mx-1"
                                fab
                                dark
                                x-small
                                v-bind="attrs"
                                v-on="on"
                                color="green darken-3"
                                ><v-icon dark>mdi-plus</v-icon>
                              </v-btn>
                            </template>
                            <span>Saldo Final</span>
                          </v-tooltip>
                          <v-tooltip top color="success">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                @click="agregarIngresoEgreso(item.id)"
                                class="mx-1"
                                fab
                                dark
                                x-small
                                v-bind="attrs"
                                v-on="on"
                                color="green darken-3"
                                ><v-icon dark>mdi-plus</v-icon>
                              </v-btn>
                            </template>
                            <span>Agregar Ingreso/Egreso</span>
                          </v-tooltip>
                          <v-tooltip bottom color="primary">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                @click="editEvent(item.id)"
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
                            <span>Editar Evento</span>
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
                            <span>Borrar Evento</span>
                          </v-tooltip>
                        </div>
                      </template>
                    </v-data-table>
                  </v-card>
                  <v-dialog v-model="modalIngresoEgreso" max-width="900">
                    <v-card class="pa-8">
                      <ingresos-egresos :scenario="'multiple'" />
                    </v-card>
                  </v-dialog>
                </template>
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
import CreateEditModal from "./CreateEditModal.vue";
import IngresosEgresos from "@/cruds/Eventos/IngresosEgresos"
export default {
  components: {
    CreateEditModal,
    IngresosEgresos
  },
  data() {
    return {
      search: "",
      modalIngresoEgreso: false,
      headers: [
        { text: "#", value: "id" },
        { text: "Nombre", value: "nombre" },
        { text: "Lugar", value: "lugar.descripcion" },
        { text: "Mamá / Papá", value: "cliente" },
        { text: "Cumple de", value: "agasajado" },
        { text: "Precio $", value: "precio" },
        { text: "Fecha y hora", value: "fecha" },
        { text: "Duración", value: "duracion" },
        { text: "Acciones", value: "acciones", align: "center" },
      ],
      dialog: false,
      scenario: "",
      selectedEvent: {},
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
    ...mapGetters("EventosIndex", ["data", "total", "loading"]),
  },
  methods: {
    ...mapActions("EventosIndex", [
      "fetchIndexData",
      "resetState",
      "destroyData",
    ]),
    saldoFinal(id) {
      alert("En Desarrollo")
      this.$store.dispatch("IngresoSingle/fetchCreateData");
      this.$store.dispatch("EgresoSingle/fetchCreateData");
      this.$store.dispatch("IngresoSingle/setEventId", id);
      this.$store.dispatch("EgresoSingle/setEventId", id);
      this.fetchShowData(id).then(() => {
        this.modalIngresoEgreso = true;
      })
    },
    agregarIngresoEgreso(id) {
      this.$store.dispatch("IngresoSingle/fetchCreateData");
      this.$store.dispatch("EgresoSingle/fetchCreateData");
      this.$store.dispatch("IngresoSingle/setEventId", id);
      this.$store.dispatch("EgresoSingle/setEventId", id);
      this.modalIngresoEgreso = true;
    },
    ...mapActions("EventoSingle", [
      "fetchShowData",
      "fetchEditData",
      "fetchCreateData",
      "resetState",
    ]),
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
    createEvent() {
      this.resetState();
      this.fetchCreateData().then(() => {
        this.scenario = "create";
        this.dialog = true;
      });
    },
    editEvent(id) {
      this.fetchEditData(id).then(() => {
        (this.scenario = "edit"), (this.dialog = true);
      });
    },
  },
};
</script>
