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
        <v-subheader v-if="!logged || userIsLogin" inset>COMERCIOS</v-subheader>
        <v-subheader v-if="adminIsLogin" inset>ADMINISTRADOR</v-subheader>
        <v-subheader v-if="superadminIsLogin" inset>SUPERADMINISTRADOR</v-subheader>
        <v-divider></v-divider>
        <ul v-if="!logged || userIsLogin">
          <v-list-item
            v-for="(item, i) in items()"
            :key="i"
            :to="'/shops/'+item.id"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>mdi-storefront</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
            </v-list-item-content>
          </v-list-item>
        </ul>
        <v-list-item v-if="adminIsLogin || superadminIsLogin"
                     :to="'/articles'"
                     router
                     exact
        >
          <v-list-item-action>
            <v-icon>mdi-playstation</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Artículos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="superadminIsLogin"
                     :to="'/users'"
                     router
                     exact
        >
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Empleados</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="adminIsLogin || userIsLogin"
                     :to="'/orders'"
                     router
                     exact
        >
          <v-list-item-action>
            <v-icon>mdi-package-variant-closed</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Pedidos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="superadminIsLogin"
                     :to="'/shops'"
                     router
                     exact
        >
          <v-list-item-action>
            <v-icon>mdi-storefront</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Comercios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-if="!logged"
                     :to="'/login'"
                     router
                     exact
        >
          <v-list-item-action>
            <v-icon>mdi-account-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="logged && !adminIsLogin"
                     :to="'/users/'+uid"
                     router
                     exact
        >
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if=" adminIsLogin"
          :to="'/shops/'+localUser.shopId"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Perfil Comercio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="userIsLogin || !logged"
                     :to="'/register'"
                     router
                     exact
        >
          <v-list-item-action>
            <v-icon v-if="!logged">mdi-account-plus</v-icon>
            <v-icon v-else>mdi-store</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-if="!logged">Registrarse</v-list-item-title>
            <v-list-item-title v-else>Registrar Comercio</v-list-item-title>
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
            <v-list-item-title>Ayuda</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="logged"
           router
           exact
          @click="exit"
        >
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
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
      <v-btn icon :to="path"><v-icon>mdi-home</v-icon></v-btn>
      <v-toolbar-title v-text="getTitle()" />
      <v-spacer />
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        left
      >
      </v-menu>
      <v-menu v-if="userIsLogin"
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
import { Collection } from '../services/api'
export default {
  components: { basket },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false

    }
  },
  computed: {
    ...mapGetters('dataset', ['getTitle', 'getListCol', 'getListLogged', 'getListDefault']),
    ...mapGetters('session', ['logged', 'localUser', 'uid', 'userIsLogin', 'adminIsLogin', 'superadminIsLogin', 'path'])
  },
  mounted() {
    this.listenCol(Collection.User)
    this.listenCol(Collection.Shop)
    this.initAuth()
  },
  destroyed() {
    this.unlistenCol(Collection.User)
    this.unlistenCol(Collection.Shop)
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol']),
    ...mapActions('session', ['logout', 'initAuth']),
    exit(){
      this.logout()
      this.$router.replace('/')
    },
    items() {
      return this.getListCol(Collection.Shop).filter(item => !(item.isBlocked || item.isRemoved))
    }
  }
}
</script>
