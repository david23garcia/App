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
      v-model="description"
      label="Descripcion"
      :error-messages="descriptionErrors"
      @input="$v.description.$touch()"
      @blur="$v.description.$touch()"
    ></v-text-field>
    <p>Dirección</p>
    <v-divider></v-divider>
    <v-row>
      <v-col cols="1">
        <v-text-field
          v-model="type"
          label="Tipo Via"
          :error-messages="typeErrors"
          @input="$v.type.$touch()"
          @blur="$v.type.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="8">
        <v-text-field
          v-model="street"
          label="Calle"
          :error-messages="streetErrors"
          @input="$v.street.$touch()"
          @blur="$v.street.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-text-field
          v-model="number"
          label="Numero"
          :error-messages="numberErrors"
          @input="$v.number.$touch()"
          @blur="$v.number.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-text-field
          v-model="floor"
          :error-messages="floorErrors"
          label="Piso"
          @input="$v.floor.$touch()"
          @blur="$v.floor.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="1">
        <v-text-field
          v-model="letter"
          :error-messages="letterErrors"
          label="Letra"
          @input="$v.letter.$touch()"
          @blur="$v.letter.$touch()"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="city"
          label="Ciudad"
          :error-messages="cityErrors"
          @input="$v.city.$touch()"
          @blur="$v.city.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="province"
          label="Provincia"
          :error-messages="provinceErrors"
          @input="$v.province.$touch()"
          @blur="$v.province.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="state"
          label="Pais"
          :error-messages="stateErrors"
          @input="$v.state.$touch()"
          @blur="$v.state.$touch()"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          v-model="cv"
          label="Codigo Postal"
          :error-messages="cvErrors"
          @input="$v.cv.$touch()"
          @blur="$v.cv.$touch()"
        ></v-text-field>
      </v-col>
    </v-row>

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
  name: 'shopform',
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    emailRT: { email },
    surname1: { required, maxLength: maxLength(10) },
    surname2: { maxLength: maxLength(10) },
    phone: { required, maxLength: maxLength(9) },
    password: { required, minLength: minLength(8) },
    description: { required },
    type: { required, maxLength: maxLength(10) },
    street: { required, maxLength: maxLength(25) },
    number: { required, maxLength: maxLength(2) },
    floor: { required, maxLength: maxLength(3) },
    letter: { required, maxLength: maxLength(1) },
    city: { required, maxLength: maxLength(20) },
    province: { required, maxLength: maxLength(15) },
    state: { required, maxLength: maxLength(15) },
    cv: { required, maxLength: maxLength(5) }

  },
  data: () => ({
    name: '',
    surname1: '',
    surname2: '',
    email: '',
    phone: '',
    description: '',
    type: '',
    street: '',
    number: '',
    floor: '',
    letter: '',
    city: '',
    province: '',
    state: '',
    cv: ''
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
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) { return errors }
      !this.$v.description.required && errors.push('surname is required.')
      return errors
    },
    typeErrors () {
      const errors = []
      if (!this.$v.type.$dirty) { return errors }
      !this.$v.type.maxLength && errors.push('tipo erroneo')
      !this.$v.type.required && errors.push('surname is required.')
      return errors
    },
    streetErrors () {
      const errors = []
      if (!this.$v.street.$dirty) { return errors }
      !this.$v.street.maxLength && errors.push('calle incorrecta')
      !this.$v.street.required && errors.push('surname is required.')
      return errors
    },
    numberErrors () {
      const errors = []
      if (!this.$v.number.$dirty) { return errors }
      !this.$v.number.maxLength && errors.push('numero erroneo')
      !this.$v.number.required && errors.push('surname is required.')
      return errors
    },
    floorErrors () {
      const errors = []
      if (!this.$v.floor.$dirty) { return errors }
      !this.$v.floor.maxLength && errors.push('piso incorrecto')
      !this.$v.floor.required && errors.push('surname is required.')
      return errors
    },
    letterErrors () {
      const errors = []
      if (!this.$v.letter.$dirty) { return errors }
      !this.$v.letter.maxLength && errors.push('letra erronea')
      !this.$v.letter.required && errors.push('surname is required.')
      return errors
    },
    cityErrors () {
      const errors = []
      if (!this.$v.city.$dirty) { return errors }
      !this.$v.city.maxLength && errors.push('ciudad incorrecta')
      !this.$v.city.required && errors.push('surname is required.')
      return errors
    },
    provinceErrors () {
      const errors = []
      if (!this.$v.province.$dirty) { return errors }
      !this.$v.province.maxLength && errors.push('provincia incorrecto')
      !this.$v.province.required && errors.push('surname is required.')
      return errors
    },
    stateErrors () {
      const errors = []
      if (!this.$v.state.$dirty) { return errors }
      !this.$v.state.maxLength && errors.push('pais incorrecto')
      !this.$v.state.required && errors.push('surname is required.')
      return errors
    },
    cvErrors () {
      const errors = []
      if (!this.$v.cv.$dirty) { return errors }
      !this.$v.cv.maxLength && errors.push('codigo postal erroneo')
      !this.$v.cv.required && errors.push('surname is required.')
      return errors
    }
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
