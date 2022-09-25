<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn color="primary" outlined class="mr-4" @click.stop="createEvent"
            >Nuevo</v-btn
          >
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            HOY
          </v-btn>
          <v-btn fab text small color="primary" @click="prev">
            <v-icon> mdi-chevron-left-circle </v-icon>
          </v-btn>
          <v-btn fab text small color="primary" @click="next" class="mr-4">
            <v-icon> mdi-chevron-right-circle </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            <h2>{{ $refs.calendar.title.toUpperCase() }}</h2>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Día</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mes</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 días</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-progress-linear
          v-if="loading"
          indeterminate
          color="primary"
        ></v-progress-linear>
        <v-calendar
          locale="es-es"
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="eventos"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
        ></v-calendar>

        <CreateEditModal
          :dialog="dialog"
          :scenario="scenario"
          :id="selectedEvent.id"
          @dialogClose="dialog = false"
          @eventAdded="fetchIndexData"
        />

        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card min-width="350px" flat>
            <v-toolbar :color="selectedEvent.color" dark>
              <!-- <v-btn icon @click="editEvent(selectedEvent)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn> -->
              <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              <v-chip class="mx-4" color="primary"> Saldo Pendiente {{`$ ${getSaldoPendiente}`}} </v-chip>
              <v-spacer></v-spacer>
<!--               <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn> -->
              <v-btn icon @click="selectedOpen = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text
              :color="
                $vuetify.theme.dark
                  ? 'blue-grey darken-4'
                  : 'blue-grey lighten-4'
              "
            >
              <h4>Detalle: {{ selectedEvent.descripcion }}</h4>
              <h4>Lugar: {{ selectedEvent.lugar?.descripcion }}</h4>
              <h4>
                Hora de Inicio:
                {{ selectedEvent.fecha?.split(" ")[1].substring(0, 5) }}
              </h4>
              <h4>Duración: {{ selectedEvent.duracion }} min</h4>
              <h4>Mamá / Papá: {{ selectedEvent.cliente }}</h4>
              <h4>Cumple de: {{ selectedEvent.agasajado }}</h4>
              <h4>Precio $ {{ selectedEvent.precio }}</h4>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="agregarIngresoEgreso(selectedEvent.id)">
                <v-icon dark>mdi-plus</v-icon> Registrar Ingreso / Egreso
              </v-btn>
              <v-btn @click="editEvent(selectedEvent)">
                <v-icon dark>mdi-pencil</v-icon> Editar 
              </v-btn>
              <v-btn @click="destroyDataAction(selectedEvent.id)">
                <v-icon dark>mdi-delete-forever</v-icon> Borrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        <v-dialog v-model="modalIngresoEgreso" max-width="900">
          <v-card class="pa-8">
            <ingresos-egresos :scenario="'multiple'" />
            <v-row justify="end">
              <v-btn
                @click.prevent="updateEgresosIngresos(selectedEvent.id).then(() => {modalIngresoEgreso = false, resetStateEventoSingle()})"
                color="primary"
                dark
                class="mr-4 my-4"
                large
                > 
                Guardar Cambios</v-btn
                >
              <v-btn
                @click="modalIngresoEgreso = false, resetStateEventoSingle()"
                class="mr-4 my-4"
                large
                >
                Cerrar</v-btn
              >
            </v-row>
          </v-card>
        </v-dialog>
      </v-sheet>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CreateEditModal from "@/cruds/Eventos/CreateEditModal.vue";
import IngresosEgresos from "@/cruds/Eventos/IngresosEgresos.vue";

export default {
  components: {
    CreateEditModal,
    IngresosEgresos,
  },
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "Mes",
      week: "Semana",
      day: "Dia",
      "4Dias": "4 Días",
    },
    selectedEvent: {},
    scenario: "",
    dialog: false,
    selectedElement: null,
    selectedOpen: false,
    modalIngresoEgreso: false,
    id: null,
  }),
  created() {
    this.fetchIndexData();
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  computed: {
    ...mapGetters("EventosIndex", ["data", "loading"]),
    ...mapGetters("EventoSingle", ["getSaldoPendiente"]),

    eventos() {
      return this.data.map((evento) => {
        return {
          ...evento,
          start: evento.fecha,
          end: evento.fecha,
          color: evento.color,
          name: evento.nombre,
          details: evento.descripcion,
          id: evento.id,
        };
      });
    },
  },
  methods: {
    ...mapActions("EventosIndex", ["fetchIndexData", "destroyData"]),
    ...mapActions("EventoSingle", [
      "updateEgresosIngresos",
      "fetchShowData",
      "fetchEditData",
      "resetState",
      "fetchCreateData",
    ]),
    ...mapActions("IngresoSingle", ["fetchCreateData", "setEventId"]),
    ...mapActions("EgresoSingle", ["fetchCreateData", "setEventId"]),
    
    resetStateEventoSingle(){
      console.log("sadas")
      this.$store.dispatch("EventoSingle/resetState");
      this.$store.dispatch("EgresoSingle/resetState");
      this.$store.dispatch("IngresoSingle/resetState");
    },
    agregarIngresoEgreso(id) {
      this.$store.dispatch("IngresoSingle/fetchCreateData");
      this.$store.dispatch("EgresoSingle/fetchCreateData");
      this.$store.dispatch("IngresoSingle/setEventId", id);
      this.$store.dispatch("EgresoSingle/setEventId", id);
      this.fetchShowData(id).then(() => {
        this.modalIngresoEgreso = true;
      })
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
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      this.fetchShowData(event.id).then(() => {
        const open = () => {
          this.selectedEvent = event;
          this.selectedElement = nativeEvent.target;
          requestAnimationFrame(() =>
            requestAnimationFrame(() => (this.selectedOpen = true))
          );
        };

        if (this.selectedOpen) {
          this.selectedOpen = false;
          requestAnimationFrame(() => requestAnimationFrame(() => open()));
        } else {
          open();
        }

        nativeEvent.stopPropagation();
      });
    },
    createEvent() {
      this.resetState();
      this.$store.dispatch("EventoSingle/fetchCreateData").then(() => {
        this.scenario = "create";
        this.dialog = true;
      });
    },
    editEvent() {
      this.fetchEditData(this.selectedEvent.id).then(() => {
        (this.scenario = "edit"),
          (this.selectedOpen = false),
          (this.dialog = true);
      });
    },
  },
};
</script>
