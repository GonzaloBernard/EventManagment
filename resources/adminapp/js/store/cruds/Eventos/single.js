function initialState() {
  return {
    entry: {
      id: null,
      descripcion: null,
      cliente: '',
      fecha: '',
      hora: null,
      duracion: null,
      precio: null,
      agasajado: '',
      nombre: null,
      color: null,
      lugar_id: null,
      lugar:null,
      created_at: '',
      updated_at: '',
      deleted_at: '',
      ingresos: [],
      egresos: []
    },
    lists: {
      lugar: []
    },
    loading: false
  }
}

const route = 'eventos'

const getters = {
  entry: state => state.entry,
  lists: state => state.lists,
  loading: state => state.loading,
  getSaldoPendiente: state => {
    const ingresos = state.entry.ingresos?.map((value) => value.monto);
    const egresos = state.entry.egresos?.map((value) => value.monto);
    const initialValue = 0;
    const ingresoTotal = ingresos.reduce( (previousValue, currentValue) => parseFloat(previousValue) + parseFloat(currentValue),initialValue );
    const egresoTotal = egresos.reduce( (previousValue, currentValue) => parseFloat(previousValue) + parseFloat(currentValue),initialValue );
    const sum = parseFloat(state.entry.precio !== null ? state.entry.precio: 0 ) + egresoTotal - ingresoTotal;
    return sum?sum.toFixed(2):0;
  }
}

const actions = {
  storeData({ commit, state, dispatch }) {
    commit('setLoading', true)
    return new Promise((resolve, reject) => {
        let parametros = {
            id: state.entry.id,
            descripcion: state.entry.descripcion,
            cliente: state.entry.cliente,
            fecha: `${state.entry.fecha} ${state.entry.hora}:00`,
            nombre: state.entry.nombre,
            color: state.entry.color ? state.entry.color : '#2B66CC',
            lugar_id: state.entry.lugar_id,
            duracion: state.entry.duracion,
            precio: state.entry.precio,
            agasajado: state.entry.agasajado,
            ingresos: state.entry.ingresos,
            egresos: state.entry.egresos
        }
    console.log(parametros)
      let params = objectToFormData(parametros, {
        indices: true,
        booleansAsIntegers: true
      })

      axios
        .post(route, params)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          let message = error.response.data.message || error.message
          let errors = error.response.data.errors

/*           dispatch(
            'Alert/setAlert',
            { message: message, errors: errors, color: 'danger' },
            { root: true }
          ) */
          console.log(message)
          console.log(errors)
          reject(error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    })
  },
  updateEgresosIngresos({ commit, state }, id) {
    commit('setLoading', true)
    return new Promise((resolve, reject) => {
        let parametros = {
            ingresos: state.entry.ingresos.filter((item) => !item.created_at ),
            egresos: state.entry.egresos.filter((item) => !item.created_at )
        }
        console.log(parametros)
      let params = objectToFormData(parametros, {
        indices: true,
        booleansAsIntegers: true
      })
      params.set('_method', 'PUT')
      axios
        .post(`eventoIngresoEgreso/${id}`, params)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          let message = error.response.data.message || error.message
          let errors = error.response.data.errors
          console.log(message)
          console.log(errors)
          reject(error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    })
  },
  updateData({ commit, state, dispatch }) {
    commit('setLoading', true)

    return new Promise((resolve, reject) => {
        let parametros = {
            id: state.entry.id,
            descripcion: state.entry.descripcion,
            cliente: state.entry.cliente,
            fecha: `${state.entry.fecha.substring(0,10)} ${state.entry.hora}:00`,
            nombre: state.entry.nombre,
            color: state.entry.color ? state.entry.color : '#2B66CC',
            lugar_id: state.entry.lugar_id,
            duracion: state.entry.duracion,
            precio: state.entry.precio,
            agasajado: state.entry.agasajado,
            ingresos: state.entry.ingresos.filter((item) => !item.created_at ),
            egresos: state.entry.egresos.filter((item) => !item.created_at )
        }
        console.log(parametros)
      let params = objectToFormData(parametros, {
        indices: true,
        booleansAsIntegers: true
      })
      params.set('_method', 'PUT')
      axios
        .post(`${route}/${state.entry.id}`, params)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          let message = error.response.data.message || error.message
          let errors = error.response.data.errors

          /* dispatch(
            'Alert/setAlert',
            { message: message, errors: errors, color: 'danger' },
            { root: true }
          ) */
          console.log(message)
          console.log(errors)
          reject(error)
        })
        .finally(() => {
          commit('setLoading', false)
        })
    })
  },
/*   setCompany({ commit }, value) {
    commit('setCompany', value)
  },
  setContactFirstName({ commit }, value) {
    commit('setContactFirstName', value)
  },
  setContactLastName({ commit }, value) {
    commit('setContactLastName', value)
  },
  setContactPhone1({ commit }, value) {
    commit('setContactPhone1', value)
  },
  setContactPhone2({ commit }, value) {
    commit('setContactPhone2', value)
  },
  setContactEmail({ commit }, value) {
    commit('setContactEmail', value)
  },
  setContactSkype({ commit }, value) {
    commit('setContactSkype', value)
  },
  setContactAddress({ commit }, value) {
    commit('setContactAddress', value)
  }, */
  
  removeEgreso({ commit }, value) {
    commit('removeEgreso', value)
  },
  removeIngreso({ commit }, value) {
    commit('removeIngreso', value)
  },
  setIngreso({ commit }, value) {
    commit('setIngreso', value)
  },
  setEgreso({ commit }, value) {
    commit('setEgreso', value)
  },
  setDescripcion({ commit }, value) {
    commit('setDescripcion', value)
  },
  setNombre({ commit }, value) {
    commit('setNombre', value)
  },
  setDuracion({ commit }, value) {
    commit('setDuracion', value)
  },
  setColor({ commit }, value) {
    commit('setColor', value)
  },
  setCliente({ commit }, value) {
    commit('setCliente', value)
  },
  setAgasajado({ commit }, value) {
    commit('setAgasajado', value)
  },
  setPrecio({ commit }, value) {
    commit('setPrecio', value)
  },
  setFecha({ commit }, value) {
    commit('setFecha', value)
  },
  setLugar({ commit }, value) {
    commit('setLugar', value)
  },
  setHora({ commit }, value) {
    commit('setHora', value)
  },
  setCreatedAt({ commit }, value) {
    commit('setCreatedAt', value)
  },
  setUpdatedAt({ commit }, value) {
    commit('setUpdatedAt', value)
  },
  setDeletedAt({ commit }, value) {
    commit('setDeletedAt', value)
  },
  fetchCreateData({ commit }) {
    axios.get(`${route}/create`).then(response => {
      commit('setLists', response.data.meta)
    })
  },
  fetchEditData({ commit, dispatch }, id) {
    commit('setLoading',true)
    axios.get(`${route}/${id}/edit`).then(response => {
      commit('setEntry', response.data.data)
      commit('setLists', response.data.meta)
      commit('setLoading',false)
    })
  },
  fetchShowData({ commit, dispatch }, id) {
    axios.get(`${route}/${id}`).then(response => {
      commit('setEntry', response.data.data)
    })
  },
  resetState({ commit }) {
    commit('resetState')
  }
}

const mutations = {
  setEntry(state, entry) {
    state.entry = entry
    state.entry.hora = entry.fecha.substring(11,16)
  },
/*   setCompany(state, value) {
    state.entry.company_id = value
  },
  setContactFirstName(state, value) {
    state.entry.contact_first_name = value
  },
  setContactLastName(state, value) {
    state.entry.contact_last_name = value
  },
  setContactPhone1(state, value) {
    state.entry.contact_phone_1 = value
  },
  setContactPhone2(state, value) {
    state.entry.contact_phone_2 = value
  },
  setContactEmail(state, value) {
    state.entry.contact_email = value
  },
  setContactSkype(state, value) {
    state.entry.contact_skype = value
  },
  setContactAddress(state, value) {
    state.entry.contact_address = value
  }, */
  removeIngreso(state, value) {
    state.entry.ingresos.splice(value, 1)
  },
  removeEgreso(state, value) {
    state.entry.egresos.splice(value, 1)
  },
  setEgreso(state, value) {
    state.entry.egresos.push(value)
  },
  setIngreso(state, value) {
    state.entry.ingresos.push(value)
  },
  setAgasajado(state, value) {
    state.entry.agasajado = value
  },
  setPrecio(state, value) {
    state.entry.precio = value
  },
  setNombre(state, value) {
    state.entry.nombre = value
  },
  setDuracion(state, value) {
    state.entry.duracion = value
  },
  setHora(state, value) {
    state.entry.hora = value
  },
  setColor(state, value) {
    state.entry.color = value
  },
  setDescripcion(state, value) {
    state.entry.descripcion = value
  },
  setCliente(state, value) {
    state.entry.cliente = value
  },
  setFecha(state, value) {
    state.entry.fecha = value
  },
  setLugar(state, value) {
    state.entry.lugar_id = value.id
    state.entry.lugar = value
  },
  setCreatedAt(state, value) {
    state.entry.created_at = value
  },
  setUpdatedAt(state, value) {
    state.entry.updated_at = value
  },
  setDeletedAt(state, value) {
    state.entry.deleted_at = value
  },
  setLists(state, lists) {
    state.lists = lists
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  resetState(state) {
    state = Object.assign(state, initialState())
  }
}

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations
}
