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
        <v-subheader inset>COMERCIOS</v-subheader>
        <v-divider></v-divider>
          <v-list-item
            v-for="(item, i) in this.getListCol(shop)"
            :key="i"
            :to="/shops/i.name"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>mdi-playstation</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.name" />
            </v-list-item-content>
          </v-list-item>
        <v-divider></v-divider>
        <v-list-item v-if="this.session()"
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
        <v-list-item v-if="this.session()"
          @click="exit()"
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
      <v-btn icon to="/"><v-icon>mdi-home</v-icon></v-btn>
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
      <v-menu v-if="this.session()"
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
import { Collection, logout, userSession } from '../services/api'
import { actions } from '../store/dataset'
export default {
  components: { basket },
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
      login: userSession()
    }
  },
  // mounted() {
  //   this.listenCol(this.shop)
  // },
  // destroyed() {
  //   this.unlistenCol(this.shop)
  // },
  beforeCreate () {
    console.log('1 - beforeCreate')
  },
  created () {
    console.log('2 - created')
  },
  beforeMount () {
    console.log('3 - beforeMount')
  },
  mounted () {
    this.listenCol(this.shop)
    console.log('4 - mounted')
  },
  beforeUpdate () {
    console.log('5 - beforeUpdate')
  },
  updated () {
    console.log('6 - updated')
  },
  beforeDestroy () {
    console.log('7 - beforeDestroy')
  },
  destroyed () {
    this.unlistenCol(this.shop)
    console.log('8 - destroyed')
  },
  computed: {
    ...mapGetters('dataset', ['getTitle', 'getListCol', 'getListUser', 'getIsLogin', 'getTitle']),
  },
  methods: {
    ...mapActions('dataset', ['listenCol', 'unlistenCol', 'setIsLogin']),
    session(){
      return userSession()
    }
  },

  exit(){
    logout().then(function () {
      actions.setIsLogin(false)
      window.location.href = "/"
    })
  }
}
</script>
