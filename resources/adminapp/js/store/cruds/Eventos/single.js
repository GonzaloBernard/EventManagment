function initialState() {
  return {
    entry: {
      id: null,
      descripcion: null,
      cliente: '',
      fecha: '',
      hora: null,
      duracion: null,
      nombre: null,
      color: null,
      lugar_id: null,
      created_at: '',
      updated_at: '',
      deleted_at: ''
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
  loading: state => state.loading
}

const actions = {
  storeData({ commit, state, dispatch }) {
    commit('setLoading', true)
    /* dispatch('Alert/resetState', null, { root: true }) */

    return new Promise((resolve, reject) => {
        let parametros = {
            id: state.entry.id,
            descripcion: state.entry.descripcion,
            cliente: state.entry.cliente,
            fecha: `${state.entry.fecha} ${state.entry.hora}:00`,
            nombre: state.entry.nombre,
            color: state.entry.color ? state.entry.color : '#2B66CC',
            lugar_id: state.entry.lugar_id,
            duracion: state.entry.duracion
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
  updateData({ commit, state, dispatch }) {
    commit('setLoading', true)
    /* dispatch('Alert/resetState', null, { root: true }) */
    return new Promise((resolve, reject) => {
        let parametros = {
            id: state.entry.id,
            descripcion: state.entry.descripcion,
            cliente: state.entry.cliente,
            fecha: `${state.entry.fecha.substring(0,10)} ${state.entry.hora}:00`,
            nombre: state.entry.nombre,
            color: state.entry.color ? state.entry.color : '#2B66CC',
            lugar_id: state.entry.lugar_id,
            duracion: state.entry.duracion
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
    state.entry.lugar_id = value
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
