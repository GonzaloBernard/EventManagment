<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header card-header-primary card-header-icon">
                        <div class="card-icon"><i class="material-icons">assignment</i>
                        </div>
                        <h4 class="card-title">
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
                        <div class="row">
                            <div class="col-md-12">
                                <v-data-table
                                    :headers="headers"
                                    :items="data"
                                    :search="search"
                                    >
                                <template v-slot:[`item.monto`]="{ item }">
                                    <v-chip color="red darken-3" dark>
                                        {{`$ ${item.monto}`}}
                                    </v-chip>
                                </template>
                                <template v-slot:[`item.fecha`]="{ item }">
                                    {{item.fecha.substring(0,10)}}
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
            { text: "Categoria", value: "egreso_categoria.descripcion" },
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
    ...mapGetters('EgresoIndex', ['data', 'total', 'loading'])
  },
  methods: {
    ...mapActions('EgresoIndex', ['fetchIndexData', 'resetState']),
    editItem(){
        alert("EN desarrollo")
    },
    destroyDataAction(){
        alert("EN desarrollo")
    },
  }
}
</script>
