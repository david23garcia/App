<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
<!--        <v-subheader inset>COMERCIOS</v-subheader>-->
<!--        <v-divider></v-divider>-->
<!--          <v-list-item-->
<!--            v-for="(item, i) in this.getListCol(shop).filter((s) => {-->
<!--              return !((s.isBlocked === true) || (s.isRemoved === true))-->
<!--             })"-->
<!--            :key="i"-->
<!--            :to="'/shops/'+item.title"-->
<!--            router-->
<!--            exact-->
<!--          >-->
<!--            <v-list-item-action>-->
<!--              <v-icon>mdi-playstation</v-icon>-->
<!--            </v-list-item-action>-->
<!--            <v-list-item-content>-->
<!--              <v-list-item-title v-text="item.id" />-->
<!--            </v-list-item-content>-->
<!--          </v-list-item>-->
        <shoplayout v-if="(this.role === this.employee || this.role === this.admin) && this.logged" ></shoplayout>
        <adminlayout v-else-if="this.role === this.superAdmin && this.logged"></adminlayout>
        <userlayout v-else></userlayout>
        <v-divider></v-divider>
        <v-list-item v-if="this.logged"
          to="/user/id"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="profile" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/admin"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-help-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="help" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="this.logged"
          @click="this.logout"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="exit" />
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon :to=this.path><v-icon>mdi-home</v-icon></v-btn>
      <v-toolbar-title v-text="this.getTitle()" />
      <v-spacer />
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        left
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item
              v-for="(item, i) in this.getListUser()"
              :key="i"
              @click="v-on"
              :to="item.to"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <v-menu v-if="this.logged"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="500"
        right>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </template>
          <basket />
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
    </v-navigation-drawer>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import basket from '../components/basket'
import { Collection, Rol } from '../services/api'
import Userlayout from '../components/userlayout'
import Adminlayout from '../components/adminlayout'
import Shoplayout from '../components/shoplayout'
export default {
  components: { Shoplayout, Adminlayout, Userlayout, basket },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      profile: 'Cuenta',
      help: 'Ayuda',
      exit: 'Cerrar Sesión',
      shop: Collection.Shop,
      user: Rol.User,
      superAdmin: Rol.Superadmin,
      employee: Rol.Employee,
      admin: Rol.Admin

    }
  },
    mounted() {
      this.listenCol(this.shop)
      this.initAuth()
    },
    destroyed() {
      this.unlistenCol(this.shop)
    },
  computed: {
    ...mapGetters('dataset', ['getTitle', 'getListCol', 'getListUser']),
    ...mapGetters('session', ['logged', 'uid', 'role', 'path'])
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol']),
    ...mapActions('session', ['logout', 'initAuth']),
  }
}
</script>
