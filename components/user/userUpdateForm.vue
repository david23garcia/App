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
      :counter="10"
      label="Apellido 1"
      required
      @input="$v.surname1.$touch()"
      @blur="$v.surname1.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="surname2"
      :error-messages="surname2Errors"
      :counter="10"
      label="Apellido 2"
      required
      @input="$v.surname2.$touch()"
      @blur="$v.surname2.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="phone"
      :counter="9"
      :error-messages="phoneErrors"
      label="Teléfono"
      required
      @input="$v.phone.$touch()"
      @blur="$v.phone.$touch()"
    ></v-text-field>
    <p v-if="hasError">Fallo en el Registro, vuelva a intentarlo</p>
    <v-btn class="mr-4" @click="submit">Registrar</v-btn>
    <v-btn @click="exit()">Cancelar</v-btn>
  </form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { maxLength, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../../services/api'

export default {
  mixins: [validationMixin],

  validations: {
    name: { maxLength: maxLength(10) },
    surname1: { maxLength: maxLength(10) },
    surname2: { maxLength: maxLength(10) },
    phone: { minLength: minLength(9),maxLength: maxLength(9) }
  },
  data: () => ({
    name: '',
    surname1: '',
    surname2: '',
    phone: null,
    hasError: false
  }),

  computed: {
    ...mapGetters('session', ['adminIsLogin', 'superadminIsLogin']),
    ...mapGetters('dataset', ['getUser']),
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('El nombre debe tener 10 caracteres como máximo')
      !this.$v.name.required && errors.push('Nombre requerido.')
      return errors
    },
    surname1Errors () {
      const errors = []
      if (!this.$v.surname2.$dirty) return errors
      !this.$v.surname1.maxLength && errors.push('El apellido debe tener 10 caracteres como máximo')
      !this.$v.surname1.required && errors.push('Apellido requerido.')
      return errors
    },
    surname2Errors () {
      const errors = []
      if (!this.$v.surname2.$dirty) return errors
      !this.$v.surname2.maxLength && errors.push('El apellido debe tener 10 caracteres como máximo')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.minLength && errors.push('Numero de telefono de 9 digitos')
      !this.$v.phone.maxLength && errors.push('Numero de telefono de 9 digitos')
      !this.$v.phone.required && errors.push('Numero de telefono requerido')
      return errors
    },
  },

  methods: {
    ...mapActions('dataset', ['updateModel', 'createModel']),
    ...mapActions('session', ['registerUser']),
    async submit () {
      try{
        await this.updateModel(Collection.User, this.getUserUpdate(), this.$route.params.id)
        this.exit()
      } catch (e) {
        this.hasError = true
      }
    },
    getUserUpdate(){
      return {
        name: this.name,
        surname1: this.surname1,
        surname2: this.surname2,
        phone: this.phone
      }
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.surname1 = ''
      this.surname2 = ''
      this.phone =  null
    },
    exit () {
      if(this.superadminIsLogin) this.$router.replace("/users")
      if(this.adminIsLogin) this.$router.replace("/shops/"+this.getUser(this.$route.params.id).shopId)
      else this.$router.replace("/users/"+this.$route.params.id)
    }
  },
}
</script>

<style scoped>

</style>
