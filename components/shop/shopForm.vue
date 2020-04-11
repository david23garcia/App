<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      :counter="25"
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
    <v-text-field
      v-model="address"
      :counter="150"
      :error-messages="addressErrors"
      label="Dirección"
      required
      @input="$v.address.$touch()"
      @blur="$v.address.$touch()"
    ></v-text-field>
    <v-select v-if="superadminIsLogin"
              v-model="select"
              :items="users()"
              :error-messages="selectErrors"
              label="Usuario"
              required
              @change="$v.select.$touch()"
              @blur="$v.select.$touch()"
    ></v-select>
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
import { Collection, Rol } from '../../services/api'

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(25) },
    description: { required, maxLength: maxLength(250) },
    email: { required, email },
    phone: { required, minLength: minLength(9),maxLength: maxLength(9) },
    address: {required, maxLength: maxLength(150)},
    select: { required },
    checkbox: {
      checked (val) {
        return val
      },
    },
  },

  data: () => ({
    name: '',
    description: '',
    phone: null,
    email: '',
    select: null,
    checkbox: false,
    hasError: false,
    address: ''
  }),

  computed: {
    ...mapGetters('session', ['superadminIsLogin', 'uid']),
    ...mapGetters('dataset', ['getListCol']),
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
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) return errors
      !this.$v.description.maxLength && errors.push('La descripcion debe tener 250 caracteres como máximo')
      !this.$v.description.required && errors.push('Descripcion necesaria.')
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
    users(){
      return this.getListCol(Collection.User).filter((user)=> {
        return user.role === Rol.User
      }).map((user)=> user.email)
    },
    async submit () {
      try {
        const userId = this.superadminIsLogin ? this.getUser(this.select).id : this.uid
        const shopId = btoa(this.name.concat(userId))
        const shop = this.getShop(userId)
        await this.createModel({ collection: Collection.Shop, data: shop, id: shopId })
        await this.updateModel({ collection: Collection.User, data:  {
            role: Rol.Admin,
            shopId
          }, id: userId })
        this.exit()
      } catch (e) {
        this.clear()
        this.hasError = true
      }
    },
    getShop(id){
      return {
        userId: id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        description: this.description,
        address: this.address,
        shippingMethods: [],
        isBlocked: false,
        isRemoved: false
      }
    },
    getUser(email){
      for(const user of this.getListCol(Collection.User)){
        if(user.email === email) return user
      }
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.description = ''
      this.phone =  null
      this.email =  ''
      this.select = null
      this.checkbox =  false
      this.address = ''
    },
    exit () {
      if(this.superadminIsLogin) this.$router.replace('/shops')
      else this.$router.replace('/')
    }
  }
}
</script>

<style scoped>

</style>
