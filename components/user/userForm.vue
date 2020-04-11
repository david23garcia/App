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
      v-model="email"
      :error-messages="emailErrors"
      label="Email"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
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
    <v-select v-if="superadminIsLogin"
              v-model="select"
              :items="items"
              :error-messages="selectErrors"
              label="Rol"
              required
              @change="$v.select.$touch()"
              @blur="$v.select.$touch()"
    ></v-select>
    <v-text-field
      v-model="password"
      :error-messages="passwordErrors"
      label="Contraseña"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      type="password"
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :error-messages="checkboxErrors"
      label="Aceptar condiciones para continuar con el registro"
      required
      @change="$v.checkbox.$touch()"
      @blur="$v.checkbox.$touch()"
    ></v-checkbox>
    <p v-if="hasError">Fallo en el Registro, vuelva a intentarlo</p>
    <v-btn :disabled="!checkbox" class="mr-4" @click="submit">Registrar</v-btn>
    <v-btn @click="exit()">Cancelar</v-btn>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      surname1: { required, maxLength: maxLength(10) },
      surname2: { maxLength: maxLength(10) },
      password: { minLength: minLength(8) },
      email: { required, email },
      phone: { required, minLength: minLength(9),maxLength: maxLength(9) },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      name: '',
      surname1: '',
      surname2: '',
      phone: null,
      email: '',
      password: '',
      select: null,
      checkbox: false,
      items: [
        'Usuario',
        'Administrador',
        'Empleado'
      ],
      hasError: false
    }),

    computed: {
      ...mapGetters('session', ['superadminIsLogin']),
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('Aceptar para continuar')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Rol necesario')
        return errors
      },
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
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Direccion de correo electronico invalida')
        !this.$v.email.required && errors.push('Direccion de correo electrónico reuerido')
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
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Contraseña con al menos 8 caracteres')
        !this.$v.name.required && errors.push('Contraseña requerida')
        return errors
      },
    },

    methods: {
      ...mapActions('session', ['registerUser']),
      async submit () {
        try{
          await this.registerUser(this.getUser('user'), this.superadminIsLogin)
          await this.exit()
        } catch (e) {
          console.log(e.message)
          this.hasError = true
          this.clear()
        }
      },
      getUser(role){
        return {
          name: this.name,
          surname1: this.surname1,
          surname2: this.surname2,
          email: this.email,
          phone: this.phone,
          role,
          isBlocked: false,
          isRemoved: false,
          basket: [],
          shopId: '',
          password: this.password
        }
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.surname1 = ''
        this.surname2 = ''
        this.phone =  null
        this.email =  ''
        this.password = ''
        this.select = null
        this.checkbox =  false
      },
      async exit () {
        if(this.superadminIsLogin) await this.$router.replace('/users')
        else await this.$router.replace('/')
      }
    }
  }
</script>

<style scoped>

</style>
