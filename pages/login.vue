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
import { login } from '../services/api'
// import { mutations } from '../store/dataset'

export default {
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    submit () {
      console.log(this.email, this.password)
      login({ email: this.email, password: this.password }).then(function () {
        // mutations.setIsLogin({ login: true })
        window.location.href = "/"
      })
    }
  }
}
</script>

<style scoped>

</style>
