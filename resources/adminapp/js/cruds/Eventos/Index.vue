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
                            <strong>Evento</strong>
                        </h4>
                    </div>

                    <div class="card-body">
                        <router-link class="btn btn-primary" :to="{ name: 'eventos.create' }">
                            <i class="material-icons">
                                add
                            </i>
                            {{ $t('global.add') }}
                        </router-link>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <h1>Tabla de Eventos</h1>
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
    }
  },
  beforeDestroy() {
    this.resetState()
  },
  created(){
    console.log("asd")
    this.fetchIndexData()
  },
  computed: {
    ...mapGetters('EventosIndex', ['data', 'total', 'loading'])
  },
  methods: {
    ...mapActions('EventosIndex', ['fetchIndexData', 'resetState'])
  }
}
</script>
