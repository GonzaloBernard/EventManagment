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
                    <template v-slot:[`item.fecha_liquidacion`]="{ item }">
                      <v-chip class="my-1" v-if="item.fecha_liquidacion">
                        {{item.usuario_gestor?item.usuario_gestor : 'Sin cajero'}}
                      </v-chip>
                      <v-chip class="my-1" outlined v-if="item.fecha_liquidacion">
                        {{item.fecha_liquidacion.substr(0,10)}}
                      </v-chip>
                    </template>

                    <template v-slot:[`item.fecha`]="{ item }">
                      <v-chip class="my-1">
                        {{item.fecha.substr(0,10)}}
                      </v-chip>
                      <v-chip class="my-1" outlined>
                        {{item.fecha.substr(10)}}
                      </v-chip>
                      <v-chip class="my-1" outlined>
                        {{item.duracion}} min
                      </v-chip>
                    </template>


                      <template v-slot:[`item.acciones`]="{ item }">
                        <div class="d-flex justify-content-center">
                          <v-tooltip top color="primary">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                :disabled="item.fecha_liquidacion !== null"
                                @click="saldoFinal(item.id)"
                                class="mx-1"
                                fab
                                dark
                                x-small
                                v-bind="attrs"
                                v-on="on"
                                color="primary darken-3"
                                ><v-icon dark>mdi-check-decagram</v-icon>
                              </v-btn>
                            </template>
                            <span>Caja</span>
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
                          <v-tooltip top color="primary">
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
                      <v-row justify="end">
                        <v-btn
                          @click.prevent="updateEgresosIngresos(selectedEvent).then(() => {modalIngresoEgreso = false, resetStateEventoSingle(),fetchIndexData()})"
                          color="primary"
                          dark
                          class="mr-4 my-4"
                          large>Guardar Cambios
                        </v-btn>
                        <v-btn
                          @click="modalIngresoEgreso = false, resetStateEventoSingle()"
                          class="mr-4 my-4"
                          large>Cerrar
                        </v-btn>
                      </v-row>
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
import CreateEditModal from "@/cruds/Eventos/CreateEditModal.vue";
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
        { text: "Fecha, hora y duración", value: "fecha" },
        { text: "Liquidado", value: "fecha_liquidacion" },
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
    resetStateEventoSingle(){
      //console.log("sadas")
      this.$store.dispatch("EventoSingle/resetState");
    },
    saldoFinal(id) {
      this.selectedEvent = id;
      this.$store.dispatch("IngresoSingle/fetchCreateData");
      this.$store.dispatch("EgresoSingle/fetchCreateData");
      this.$store.dispatch("IngresoSingle/setEventId", id);
      this.$store.dispatch("EgresoSingle/setEventId", id);
      this.fetchShowData(id).then(() => {
        //console.log(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10));
        // SE PONE DELETED AT PARA QUE EL EVENTO SE MARQUE COMO FINALIZADO
        this.setFechaLiquidacion(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10));
        this.modalIngresoEgreso = true;
      })
    },
    agregarIngresoEgreso(id) {
      this.selectedEvent = id;
      this.$store.dispatch("IngresoSingle/fetchCreateData");
      this.$store.dispatch("EgresoSingle/fetchCreateData");
      this.$store.dispatch("IngresoSingle/setEventId", id);
      this.$store.dispatch("EgresoSingle/setEventId", id);
      this.fetchShowData(id).then(() => {
        this.modalIngresoEgreso = true;
      })
    },
    ...mapActions("EventoSingle", [
      "fetchShowData",
      "fetchEditData",
      "fetchCreateData",
      "resetState",
      "updateEgresosIngresos",
      "setFechaLiquidacion",
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
