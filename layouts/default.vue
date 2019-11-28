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
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        <v-divider></v-divider>
        <v-list-item
          to="/"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="userTittle" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-help-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="helpTittle" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="exitTittle" />
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
      <v-toolbar-title v-text="title" />
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
              v-for="(item, i) in itemsUser"
              :key="i"
              @click="v-on"
              :to="item.to"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <v-menu
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
import basket from '../components/basket'
export default {
  components: { basket },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-store',
          title: 'Comercio A',
          to: '/inspire'
        },
        {
          icon: 'mdi-store',
          title: 'Comercio B',
          to: '/inspire'
        },
        {
          icon: 'mdi-store',
          title: 'Comercio B',
          to: '/inspire'
        },
        {
          icon: 'mdi-store',
          title: 'Comercio C',
          to: '/inspire'
        },
        {
          icon: 'mdi-store',
          title: 'Comercio D',
          to: '/inspire'
        }
      ],
      itemsUser: [
        {
          title: 'Iniciar Sesion',
          to: '/login'
        },
        {
          title: 'Pedidos'
        },
        {
          title: 'Perfil'
        },
        {
          title: 'Registrarse'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Comercio Local',
      userTittle: 'Cuenta',
      helpTittle: 'Ayuda',
      exitTittle: 'Salir'
    }
  }
}
</script>
