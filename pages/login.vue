<template>
  <v-card>
    <v-card-title>Iniciar Sesión</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          prepend-icon="mdi-account"
          label="Email"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Contraseña"
          prepend-icon="mdi-lock"
          type="password"
        ></v-text-field>
      </v-form>
      <p v-if="hasError">Usuario o contraseña incorrectos</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="submit">Login</v-btn>
      <v-btn to="/">Cancelar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'

export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
  },
  data: () => ({
    email: '',
    password: '',
    hasError: false
  }),
  computed: {
    ...mapGetters('session', ['path']),
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Direccion de correo electronico invalida')
      !this.$v.email.required && errors.push('Direccion de correo electrónico reuerido')
      return errors
    },
  },
  methods: {
    ...mapActions('session', ['login']),
    async submit () {
      try {
        await this.login({ email: this.email, password: this.password })
        await this.$router.replace(this.path)
      } catch (e) {
        this.hasError = true
        this.email = ''
        this.password = ''
      }
    }
  }
}
</script>

<style scoped>

</style>
