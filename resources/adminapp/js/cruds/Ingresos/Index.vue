<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header card-header-primary card-header-icon">
                        <div class="card-icon"><i class="material-icons">assignment</i>
                        </div>
                        <h4 class="card-title">
                            {{ $t('global.table') }}
                            <strong>Ingreso</strong>
                        </h4>
                    </div>

                    <div class="card-body">
                        <router-link class="btn btn-primary" :to="{ name: 'ingresos.create' }">
                            <i class="material-icons">
                                add
                            </i>
                            {{ $t('global.add') }}
                        </router-link>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <h1>Tabla de Ingresos</h1>
                                <v-data-table
                                    :headers="headers"
                                    :items="data"
                                    :search="search"
                                    >
                                <template v-slot:[`item.monto`]="{ item }">
                                    <v-chip color="green darken-3" dark>
                                        {{`$ ${item.monto}`}}
                                    </v-chip>
                                </template>
                                <template v-slot:[`item.fecha`]="{ item }">
                                    {{item.fecha.substring(0,10)}}
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
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
        search: "",
        headers: [
            { text: "Fecha", value: "fecha" },
            { text: "Monto", value: "monto" },
            { text: "Medio de Pago", value: "medio_de_pago.descripcion" },
            { text: "Evento", value: "evento.cliente" },
            { text: "Acciones", value: "acciones" , align: "center"},
        ],
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  created(){
    //console.log("asd")
    this.fetchIndexData()
  },
  computed: {
    ...mapGetters('IngresoIndex', ['data', 'total', 'loading'])
  },
  methods: {
    ...mapActions('IngresoIndex', ['fetchIndexData', 'resetState'])
  }
}
</script>
