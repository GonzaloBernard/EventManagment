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
                            <strong>Egreso</strong>
                        </h4>
                    </div>

                    <div class="card-body">
                        <router-link class="btn btn-primary" :to="{ name: 'egresos.create' }">
                            <i class="material-icons">
                                add
                            </i>
                            {{ $t('global.add') }}
                        </router-link>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <h1>Tabla de Egresos</h1>
                                <v-data-table
                                    :headers="headers"
                                    :items="data"
                                    :search="search"
                                    >
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
            { text: "fecha", value: "fecha" },
            { text: "monto", value: "monto" },
            { text: "categoria", value: "egreso_categoria.descripcion" },
            { text: "evento", value: "evento_id" },
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
    ...mapActions('EgresoIndex', ['fetchIndexData', 'resetState'])
  }
}
</script>
