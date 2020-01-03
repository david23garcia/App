<template>
  <v-card cols="10">
    <v-card-title>Registrar Comercio</v-card-title>
    <v-form>
      <v-text-field
        v-model="phone"
        :error-messages="phoneErrors"
        label="Telefono"
      ></v-text-field>
      <v-text-field
        v-model="description"
        label="Descripcion"
        :error-messages="descriptionErrors"
      ></v-text-field>
      <p>Dirección</p>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="1">
          <v-text-field
            v-model="type"
            label="Tipo Via"
            :error-messages="typeErrors"
          ></v-text-field>
        </v-col>
        <v-col cols="8">
          <v-text-field
            v-model="street"
            label="Calle"
            :error-messages="streetErrors"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-text-field
            v-model="number"
            label="Numero"
            :error-messages="numberErrors"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-text-field
            v-model="floor"
            :error-messages="floorErrors"
            label="Piso"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-text-field
            v-model="letter"
            :error-messages="letterErrors"
            label="Letra"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="city"
            label="Ciudad"
            :error-messages="cityErrors"
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
          ></v-text-field>
        </v-col>
      </v-row>
      <v-card align="center">
        <v-btn class="mr-4" @click="submit">Modificar</v-btn>
        <v-btn @click="this.$parent.isUpdateShop=false">Cancelar</v-btn>
      </v-card>
    </v-form>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../services/api'

export default {
  name: 'ShopUpdateForm',
  mixins: [validationMixin],
  validations: {
    phone: { required, maxLength: maxLength(9) },
    description: { required },
    type: { required, maxLength: maxLength(10) },
    street: { required, maxLength: maxLength(25) },
    number: { required, maxLength: maxLength(2) },
    floor: { required, maxLength: maxLength(3) },
    letter: { required, maxLength: maxLength(1) },
    city: { required, maxLength: maxLength(20) },
    cv: { required, maxLength: maxLength(5) }

  },
  props: ['id'],
  data: () => ({
    phone: null,
    description: null,
    type: null,
    street: null,
    number: null,
    floor: null,
    letter: null,
    city: null,
    province: null,
    state: null,
    cv: null
  }),
  computed: {
    ...mapGetters('session', ['logged', 'uid', 'email', 'phoneNumber', 'localUser']),
    ...mapGetters('dataset', ['getShop', 'getListCol', 'getCountries', 'getProvinces']),
    phoneErrors () {
      const errors = []
      if (!this.$v.phone.$dirty) { return errors }
      !this.$v.phone.maxLength && errors.push('phone must be at most 9 characters long')
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
      return errors
    },
    streetErrors () {
      const errors = []
      if (!this.$v.street.$dirty) { return errors }
      !this.$v.street.maxLength && errors.push('calle incorrecta')
      return errors
    },
    numberErrors () {
      const errors = []
      if (!this.$v.number.$dirty) { return errors }
      !this.$v.number.maxLength && errors.push('numero erroneo')
      return errors
    },
    floorErrors () {
      const errors = []
      if (!this.$v.floor.$dirty) { return errors }
      !this.$v.floor.maxLength && errors.push('piso incorrecto')
      return errors
    },
    letterErrors () {
      const errors = []
      if (!this.$v.letter.$dirty) { return errors }
      !this.$v.letter.maxLength && errors.push('letra erronea')
      return errors
    },
    cityErrors () {
      const errors = []
      if (!this.$v.city.$dirty) { return errors }
      !this.$v.city.maxLength && errors.push('ciudad incorrecta')
      return errors
    },
    cvErrors () {
      const errors = []
      if (!this.$v.cv.$dirty) { return errors }
      !this.$v.cv.maxLength && errors.push('codigo postal erroneo')
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
      const shop = this.getShop(this.id)
      this.updateModel({ collection: Collection.Shop, data:  {
          phone: this.phone ? this.phone : shop.phone,
          description: this.description ? this.description : shop.description,
          type: this.type ? this.type : shop.type,
          street: this.street ? this.street : shop.street,
          number: this.number ? this.number : shop.number,
          floor: this.floor ? this.floor : shop.floor,
          letter: this.letter ? this.letter : shop.letter,
          city: this.city ? this.city : shop.city,
          province: this.province ? this.province : shop.province,
          state: this.state ? this.state : shop.state,
          cv: this.cv ? this.cv : shop.cv
        }, id: this.id })
    }
  }
}
</script>
