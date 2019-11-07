<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="10"
      label="Nombre"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="surname1"
      :error-messages="surname1Errors"
      label="Apellido 1"
      required
      @input="$v.surname1.$touch()"
      @blur="$v.surname1.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="surname2"
      :error-messages="surname2Errors"
      label="Apellido 2"
      @input="$v.surname2.$touch()"
      @blur="$v.surname2.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="phone"
      :error-messages="phoneErrors"
      label="Telefono"
      @input="$v.phone.$touch()"
      @blur="$v.phone.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="Email"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="emailRT"
      :error-messages="emailRTErrors"
      label="Repetir Email"
      @input="$v.emailRT.$touch()"
      @blur="$v.emailRT.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      label="Contraseña"
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      type="password"
    ></v-text-field>
<!--    <v-text-field-->
<!--      v-model="passwordRT"-->
<!--      :error-messages="passwordRTErrors"-->
<!--      label="Repetir Contraseña"-->
<!--      @input="$v.passwordRT.$touch()"-->
<!--      @blur="$v.passwordRT.$touch()"-->
<!--      type="password"-->
<!--    ></v-text-field>-->
    <v-btn class="mr-4" @click="submit">Registrarse</v-btn>
    <v-btn @click="clear">Cancelar</v-btn>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
import minLength from 'vuelidate/src/validators/minLength'

export default {
  mixins: [validationMixin],
  name: 'userform',
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    emailRT: { email },
    surname1: { required, maxLength: maxLength(10) },
    surname2: { maxLength: maxLength(10) },
    phone: { required, maxLength: maxLength(9) },
    password: { required, minLength: minLength(8) }
  },

  data: () => ({
    name: '',
    surname1: '',
    surname2: '',
    email: '',
    emailRT: '',
    phone: '',
    password: ''
    // passwordRT: ''
  }),

  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) { return errors }
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    surname1Errors () {
      const errors = []
      if (!this.$v.surname1.$dirty) { return errors }
      !this.$v.surname1.maxLength && errors.push('surname must be at most 10 characters long')
      !this.$v.surname1.required && errors.push('surname is required.')
      return errors
    },
    surname2Errors () {
      const errors = []
      if (!this.$v.surname2.$dirty) { return errors }
      !this.$v.surname2.maxLength && errors.push('surname must be at most 10 characters long')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) { return errors }
      !this.$v.email.maxLength && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    emailRTErrors () {
      const errors = []
      if (!this.$v.emailRT.$dirty) { return errors }
      this.$v.email !== this.$v.emailRT && errors.push('Mail dont equals')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) { return errors }
      !this.$v.phone.maxLength && errors.push('phone must be at most 9 characters long')
      !this.$v.phone.required && errors.push('phone is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) { return errors }
      !this.$v.password.minLength && errors.push('contraseña con al menos 8 caracteres')
      !this.$v.password.required && errors.push('surname is required.')
      return errors
    }
    // passwordRTErrors () {
    //   const errors = []
    //   if (!this.$v.passwordRT.$dirty) { return errors }
    //   this.$v.password !== this.$v.passwordRT && errors.push('surname must be at most 10 characters long')
    //   return errors
    // }
  },

  methods: {
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.surname1 = ''
      this.surname2 = ''
      this.email = ''
      this.phone = ''
    }
  }
}
</script>

<style scoped>

</style>
