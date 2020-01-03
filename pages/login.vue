<template>
  <v-card>
    <v-card-title>Iniciar Sesión</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="email"
          label="Email"
          prepend-icon="mdi-account"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Contraseña"
          prepend-icon="mdi-lock"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="submit">Login</v-btn>
      <v-btn to="/">Cancelar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import { mutations } from '../store/dataset'

import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../services/api'
import { createPathByRole } from '../store/session'

export default {
  data: () => ({
    email: '',
    password: ''
  }),
  computed: {
    ...mapGetters('session', ['logged', 'localUser']),
  },
  mounted () {
    this.listenCol(Collection.User)
  },
  destroyed () {
    this.unlistenCol(Collection.User)
  },
  methods: {
    ...mapActions('session', ['login', 'setRole', 'setPath']),
    ...mapActions('dataset', ['listenCol', 'unlistenCol']),
    async submit () {
      await this.login({ email: this.email, password: this.password })
      const localUser = this.localUser
      const role = localUser.role
      const path = createPathByRole(role)
      await this.setRole(role)
      await this.setPath(path)
      window.location.href = path
    }
  }
}
</script>

<style scoped>

</style>
