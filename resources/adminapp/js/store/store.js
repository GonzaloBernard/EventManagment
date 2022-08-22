import Vue from 'vue'
import Vuex from 'vuex'

import Alert from './modules/alert'
import I18NStore from './modules/i18n'
import PermissionsIndex from './cruds/Permissions'
import PermissionsSingle from './cruds/Permissions/single'
import RolesIndex from './cruds/Roles'
import RolesSingle from './cruds/Roles/single'
import UsersIndex from './cruds/Users'
import UsersSingle from './cruds/Users/single'
import EventosIndex from './cruds/Eventos'
import EventoSingle from './cruds/Eventos/single'
import IngresosIndex from './cruds/Ingresos'
import IngresosSingle from './cruds/Ingresos/single'
import EgresosIndex from './cruds/Egresos'
import EgresosSingle from './cruds/Egresos/single'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    Alert,
    I18NStore,
    PermissionsIndex,
    PermissionsSingle,
    RolesIndex,
    RolesSingle,
    UsersIndex,
    UsersSingle,
    // ENTIDADES DEL MODELO
    EventosIndex,
    EventoSingle,
    IngresosIndex,
    IngresosSingle,
    EgresosIndex,
    EgresosSingle
  },
  strict: debug
})
