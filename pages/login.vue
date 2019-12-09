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

export default {
  data: () => ({
    email: '',
    password: ''
  }),
  mounted() {
    this.initAuth()
  },
  destroyed() {
  },
  computed: {
    ...mapGetters('dataset', ['logged'])
  },
  methods: {
    ...mapActions('session', ['loginSession', 'initAuth']),
    submit () {
      console.log("mail: ", this.email, "pass: ", this.password)
      this.loginSession({ email: this.email, password: this.password })
      window.location.href = "/"
    }
  }
}
</script>

<style scoped>

</style>
