<template>
  <v-card cols="8">
    <v-card-title>Nuevo Usuario</v-card-title>
    <span></span>
    <v-form >
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
        v-model="password"
        type="password"
        :error-messages="passwordErrors"
        label="Contraseña"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <v-select v-if="superAdminIsLogin"
                :items="items()"
                menu-props="auto"
                hide-details
                label="Rol">
        single-line
      </v-select>
      <span></span>
      <v-card align="center">
        <v-btn class="mr-4" @click="submit">Registrarse</v-btn>
        <v-btn @click="this.$parent.isRegister=false">Cancelar</v-btn>
      </v-card>
      <span></span>
    </v-form>
    <span></span>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import minLength from 'vuelidate/src/validators/minLength'
import { mapActions, mapGetters } from 'vuex'
import { Collection, Rol } from '../services/api'

export default {
  name: 'UserForm',
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required },
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
    phone: '',
    password: '',
    role: ''
  }),
  computed: {
    ...mapGetters('session', ['logged', 'uid', 'localUser', 'adminIsLogin', 'superadminIsLogin']),
    ...mapGetters('dataset', ['getUser', 'getListCol']),
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
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) { return errors }
      // !this.$v.phone.maxLength && errors.push('phone must be at most 9 characters long')
      // !this.$v.phone.required && errors.push('phone is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) { return errors }
      !this.$v.password.minLength && errors.push('contraseña con al menos 8 caracteres')
      !this.$v.password.required && errors.push('surname is required.')
      return errors
    }
  },
  mounted() {
    this.listenCol(Collection.User)
    this.initAuth()
  },
  destroyed() {
    this.unlistenCol(Collection.User)
  },
  methods: {
    ...mapActions('dataset', ['updateModel', 'createModel', 'listenCol', 'unlistenCol', 'listenDoc', 'unlistenDoc']),
    ...mapActions('session', ['initAuth', 'registerUser', 'setUser', 'login']),
    async submit () {
      let roleAux
      if(this.superAdminIsLogin) roleAux = this.role
      else if(this.adminIsLogin) roleAux = Rol.Employee
      else roleAux = Rol.User
      let user = {}
      user = Object.assign(user, {
        name: this.name,
        surname1: this.surname1,
        surname2: this.surname2,
        email: this.email,
        phone: this.phone,
        role: roleAux,
        isBlocked: false,
        isRemoved: false,
        shopId: null,
        basketId: null,
        address: [],
        creditCard: []
      })
      const authUser = await this.registerUser({ email: this.email, password: this.password })
      this.createModel({ collection: Collection.User, data: user, id: authUser.user.uid })
      if(roleAux === Rol.User){
        await this.login({email: this.email, password: this.password})
        window.location.href='/'
      } else {
        this.$parent.isRegister = false
      }
    },
    items(){
      return [Rol.User, Rol.Admin, Rol.Employee]
    }
  }
}
</script>

<style scoped>

</style>
