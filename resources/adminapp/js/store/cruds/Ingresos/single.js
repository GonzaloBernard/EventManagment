function initialState() {
    return {
        entry: {
            id: null,
            ///////////
            //descripcion: '',
            monto: "",
            fecha: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
            medio_de_pago: null,
            medio_de_pago_id: null,
            evento_id: null,
            ///////////
            created_at: "",
            updated_at: "",
            deleted_at: "",
        },
        lists: {
            medio_de_pago: [],
        },
        loading: false,
    };
}

const route = "ingresos";

const getters = {
    entry: (state) => state.entry,
    lists: (state) => state.lists,
    listsIngresos: (state) => state.lists,
    loading: (state) => state.loading,
};

const actions = {
    storeData({ commit, state, dispatch }) {
        commit("setLoading", true);

        return new Promise((resolve, reject) => {
            let params = objectToFormData(state.entry, {
                indices: true,
                booleansAsIntegers: true,
            });
            axios
                .post(route, params)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    let message = error.response.data.message || error.message;
                    let errors = error.response.data.errors;

                    console.log(message);
                    console.log(errors);
                    reject(error);
                })
                .finally(() => {
                    commit("setLoading", false);
                });
        });
    },
    updateData({ commit, state, dispatch }) {
        commit("setLoading", true);
        return new Promise((resolve, reject) => {
            let params = objectToFormData(state.entry, {
                indices: true,
                booleansAsIntegers: true,
            });
            params.set("_method", "PUT");
            axios
                .post(`${route}/${state.entry.id}`, params)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    let message = error.response.data.message || error.message;
                    let errors = error.response.data.errors;
                    console.log(message);
                    console.log(errors);
                    reject(error);
                })
                .finally(() => {
                    commit("setLoading", false);
                });
        });
    },

    // ATRIBUTOS
    setEventId({ commit }, value) {
        commit("setEventId", value);
    },
    setMedioDePago({ commit }, value) {
        commit("setMedioDePago", value);
    },
    setDescripcion({ commit }, value) {
        commit("setDescripcion", value);
    },
    setMonto({ commit }, value) {
        commit("setMonto", value);
    },
    setFecha({ commit }, value) {
        commit("setFecha", value);
    },
    // ATRIBUTOS

    setCreatedAt({ commit }, value) {
        commit("setCreatedAt", value);
    },
    setUpdatedAt({ commit }, value) {
        commit("setUpdatedAt", value);
    },
    setDeletedAt({ commit }, value) {
        commit("setDeletedAt", value);
    },
    fetchCreateData({ commit }) {
        axios.get(`${route}/create`).then((response) => {
            //console.log(response.data.meta);
            commit("setLists", response.data.meta);
        });
    },
    fetchEditData({ commit, dispatch }, id) {
        axios.get(`${route}/${id}/edit`).then((response) => {
            commit("setEntry", response.data.data);
            commit("setLists", response.data.meta);
        });
    },
    fetchShowData({ commit, dispatch }, id) {
        axios.get(`${route}/${id}`).then((response) => {
            commit("setEntry", response.data.data);
        });
    },
    resetState({ commit }) {
        commit("resetState");
    },
};

const mutations = {
    setEntry(state, entry) {
        state.entry = entry;
    },

    // ATRIBUTOS
    setEventId(state, value) {
        state.entry.evento_id = value;
    },
    setMedioDePago(state, value) {
        state.entry.medio_de_pago = value;
        state.entry.medio_de_pago_id = value.id;
    },
    setDescripcion(state, value) {
        state.entry.descripcion = value;
    },
    setMonto(state, value) {
        state.entry.monto = value;
    },
    setFecha(state, value) {
        state.entry.fecha = value;
    },
    // ATRIBUTOS

    setCreatedAt(state, value) {
        state.entry.created_at = value;
    },
    setUpdatedAt(state, value) {
        state.entry.updated_at = value;
    },
    setDeletedAt(state, value) {
        state.entry.deleted_at = value;
    },
    setLists(state, lists) {
        state.lists = lists;
    },
    setLoading(state, loading) {
        state.loading = loading;
    },
    resetState(state) {
        state = Object.assign(state, initialState());
    },
};

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations,
};
