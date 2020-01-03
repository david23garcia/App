<template>
  <v-card cols="10">
    <v-card-title>Registrar Comercio</v-card-title>
    <v-form>
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
        v-model="description"
        label="Descripcion"
        :error-messages="descriptionErrors"
        @input="$v.description.$touch()"
        @blur="$v.description.$touch()"
      ></v-text-field>
      <v-select v-if="superAdminIsLogin()"
      :items="items()"
      menu-props="auto"
      hide-details
      label="user">
      single-line
      </v-select>
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
        <v-col cols="3">
        <v-select
          v-model="state"
          :items="getCountries()"
          menu-props="auto"
          hide-details
          label="Pais">
        </v-select>
        </v-col>
        <v-col cols="3">
          <v-select v-if="state === 'España'"
            v-model="province"
            :items="getProvinces()"
            menu-props="auto"
            hide-details
            label="Provincia">
          </v-select>
        </v-col>
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
      <v-card align="center">
        <v-btn class="mr-4" @click="submit">Registrarse</v-btn>
        <v-btn to="/">Cancelar</v-btn>
      </v-card>
    </v-form>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import minLength from 'vuelidate/src/validators/minLength'
import { mapActions, mapGetters } from 'vuex'
import { Collection, Rol } from '../services/api'

export default {
  name: 'ShopForm',
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    phone: { required, maxLength: maxLength(9) },
    password: { required, minLength: minLength(8) },
    description: { required },
    type: { required, maxLength: maxLength(10) },
    street: { required, maxLength: maxLength(25) },
    number: { required, maxLength: maxLength(2) },
    floor: { required, maxLength: maxLength(3) },
    letter: { required, maxLength: maxLength(1) },
    city: { required, maxLength: maxLength(20) },
    cv: { required, maxLength: maxLength(5) }

  },
  data: () => ({
    name: '',
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
    cv: '',
    user: null
  }),
  computed: {
    ...mapGetters('session', ['logged', 'uid', 'email', 'phoneNumber', 'localUser']),
    ...mapGetters('dataset', ['getUser', 'getListCol', 'getCountries', 'getProvinces']),
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) { return errors }
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) { return errors }
      !this.$v.phone.maxLength && errors.push('phone must be at most 9 characters long')
      !this.$v.phone.required && errors.push('phone is required.')
      // !this.$v.phone.regularExpression && errors.push('deben ser numeros.')
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
    cvErrors () {
      const errors = []
      if (!this.$v.cv.$dirty) { return errors }
      !this.$v.cv.maxLength && errors.push('codigo postal erroneo')
      !this.$v.cv.required && errors.push('surname is required.')
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
    ...mapActions('session', ['initAuth']),
    submit () {
      const userId = this.superAdminIsLogin() ? this.user.id : this.uid
      const shopId = this.createShop(userId)
      this.updateUser(shopId, userId)
      if(this.superAdminIsLogin()) this.$parent.isRegister = false
      else window.location.href = '/articles'
    },
    createShop(id) {
      const shop = {
        userId: id,
        name: this.name,
        email: this.email,
        phone: this.phone,
        description: this.description,
        address: {
          type: this.type,
          street: this.street,
          number: this.number,
          floor: this.floor,
          letter: this.letter,
          city: this.city,
          province: this.province,
          state: this.state,
          cv: this.cv
        },
        shippingMethods: [],
        isBlocked: false,
        isRemoved: false
      }
      const shopId = btoa(this.name.concat(id))
      this.createModel({ collection: Collection.Shop, data: shop, id: shopId })
      return shopId
    },
    updateUser(id, userId) {
      this.updateModel({ collection: Collection.User, data:  {
          role: Rol.Admin,
          shopId: id
        }, id: userId })
    },
    items(){
      this.getListCol(Collection.User).filter(item => !(item.isBlocked || item.isRemoved))
    },
    superAdminIsLogin(){
      return this.logged ? this.localUser.role === Rol.Superadmin : false
    },
  }
}
</script>

<style scoped>

</style>
