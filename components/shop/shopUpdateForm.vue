<template>
  <form>
    <v-card-title>Registrar Nuevo Usuario</v-card-title>
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
      v-model="description"
      :error-messages="descriptionErrors"
      :counter="250"
      label="Descripción"
      required
      @input="$v.description.$touch()"
      @blur="$v.description.$touch()"
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
    <v-text-field
      v-model="address"
      :counter="150"
      :error-messages="addressErrors"
      label="Dirección"
      required
      @input="$v.address.$touch()"
      @blur="$v.address.$touch()"
    ></v-text-field>
    <p v-if="hasError">Fallo en el Registro, vuelva a intentarlo</p>
    <v-btn class="mr-4" @click="submit">Modificar</v-btn>
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
    description: { maxLength: maxLength(250) },
    phone: { minLength: minLength(9),maxLength: maxLength(9) },
    address: { maxLength: maxLength(150) },
  },

  data: () => ({
    name: '',
    description: '',
    phone: null,
    hasError: false,
    address: ''
  }),

  computed: {
    ...mapGetters('session', ['superadminIsLogin']),
    ...mapGetters('dataset', ['getListCol']),
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('El nombre debe tener 10 caracteres como máximo')
      !this.$v.name.required && errors.push('Nombre requerido.')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.maxLength && errors.push('La descripcion debe tener 250 caracteres como máximo')
      !this.$v.description.required && errors.push('Descripcion necesaria.')
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
    addressErrors () {
      const errors = []
      if (!this.$v.address.$dirty) return errors
      !this.$v.address.minLength && errors.push('Dirección con máximo 150 caracteres')
      !this.$v.address.required && errors.push('Direccion necesaria')
      return errors
    },
  },
  mounted() {
    this.listenCol(Collection.User)
  },
  destroyed() {
    this.unlistenCol(Collection.User)
  },
  methods: {
    ...mapActions('dataset', ['updateModel', 'createModel', 'listenCol', 'unlistenCol']),
    ...mapActions('session', ['registerUser']),
    async submit () {
      try{
        await this.updateModel(Collection.User, this.getShopUpdate(), this.$route.params.id)
        this.exit()
      } catch (e) {
        this.hasError = true
      }
    },
    getShopUpdate(){
      return {
        name: this.name,
        description: this.description,
        address: this.address,
        phone: this.phone
      }
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.description = ''
      this.phone =  null
      this.address = ''
    },
    exit () {
      if(this.superadminIsLogin) this.$router.replace('/shops')
      else this.$router.replace('/shops/'+this.$route.params.id)
    }
  }
}
</script>
