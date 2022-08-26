<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <event-hub></event-hub>
    <side-bar :sidebarLinks="sidebarLinks">
      <mobile-menu slot="content"></mobile-menu>
    </side-bar>

    <div class="main-panel">
      <top-navbar></top-navbar>
      <div class="content">
        <dashboard-content></dashboard-content>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardContent from './Content.vue'
import TopNavbar from './TopNavbar.vue'
import MobileMenu from './MobileMenu.vue'

export default {
  components: {
    DashboardContent,
    TopNavbar,
    MobileMenu
  },
  data() {
    return {
      sidebarLinks: [
        {
          title: 'Inicio',
          icon: 'dashboard',
          path: { name: 'dashboard' }
        },
        {
          title: 'Usuarios',
          icon: 'person',
          path: { name: 'users.index' },
          gate: 'user_management_access',
        },
        {
          title: 'Calendario de Eventos',
          icon: 'perm_contact_calendar',
          path: { name: 'eventos.calendario' },
          gate: 'user_management_access',
        },
        {
          title: 'Tabla de Evento',
          icon: 'table_view',
          path: { name: 'eventos.index' },
          gate: 'user_management_access',
        },
        {
          title: 'Tabla de Ingresos',
          icon: 'attach_money',
          path: { name: 'ingresos.index' },
          gate: 'user_management_access',
        },
        {
          title: 'Tabla de Egresos',
          icon: 'money_off',
          path: { name: 'egresos.index' },
          gate: 'user_management_access',
        },
      ]
    }
  }
}
</script>
