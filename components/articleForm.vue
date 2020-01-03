<template>
  <form>
    <v-text-field
      v-model="name"
      :error-messages="titleErrors"
      :counter="10"
      label="Titulo"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="description"
      :error-messages="descriptionErrors"
      label="Descripción"
      required
      @input="$v.description.$touch()"
      @blur="$v.description.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="price"
      type="number"
      :error-messages="priceErrors"
      label="Precio"
      @input="$v.price.$touch()"
      @blur="$v.price.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="quantity"
      type="number"
      :error-messages="quantityErrors"
      label="Cantidad"
      @input="$v.quantity.$touch()"
      @blur="$v.quantity.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="barcode"
      :error-messages="barcodeErrors"
      label="Codigo de Barras"
      @input="$v.barcode.$touch()"
      @blur="$v.barcode.$touch()"
    ></v-text-field>
<!--    <v-select v-if="superAdminIsLogin()"-->
<!--              :items="items()"-->
<!--              menu-props="auto"-->
<!--              hide-details-->
<!--              label="shop">-->
<!--      single-line-->
<!--    </v-select>-->
    <v-btn class="mr-4" @click="submit">Añadir</v-btn>
    <v-btn @click="clear">Cancelar</v-btn>
  </form>
</template>

<script>
import minValue from 'vuelidate/src/validators/minValue'
import maxLength from 'vuelidate/src/validators/maxLength'
import minLength from 'vuelidate/src/validators/minLength'
import required from 'vuelidate/src/validators/required'
import { validationMixin } from 'vuelidate'
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../services/api'

export default {
  name: 'ArticleForm',
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(100) },
    description: { required, maxLength: maxLength(5000), minLength: minLength(150) },
    price: { required, minValue: minValue (0) },
    quantity: { required, minValue: minValue (0) },
    barcode: { maxLength: maxLength(15) }
  },
  data: () => ({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    barcode: '',
    shop: null
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
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) { return errors }
      !this.$v.description.maxLength && errors.push('Descripcion Incorrecta')
      !this.$v.description.minLength && errors.push('Descripcion Incorrecta')
      !this.$v.description.required && errors.push('Descripcion necesaria.')
      return errors
    },
    priceErrors () {
      const errors = []
      if (!this.$v.price.$dirty) { return errors }
      !this.$v.price.minValue && errors.push('Precio Incorrecto')
      !this.$v.price.required && errors.push('Precio necesario.')
      return errors
    },
    quantityErrors () {
      const errors = []
      if (!this.$v.quantity.$dirty) { return errors }
      !this.$v.quantity.minValue && errors.push('Cantidad Incorrecta')
      !this.$v.quantity.required && errors.push('quantity necesaria.')
      return errors
    },
    barcodeErrors () {
      const errors = []
      if (!this.$v.barcode.$dirty) { return errors }
      !this.$v.barcode.maxLength && errors.push('Codigo de Barras incorrecto')
      !this.$v.barcode.required && errors.push('Codigo de Barras necesario.')
      return errors
    }
  },
  mounted() {
    this.listenCol(Collection.Shop)
    this.listenCol(Collection.User)
    this.initAuth()
  },
  destroyed() {
    this.unlistenCol(Collection.Shop)
    this.unlistenCol(Collection.User)
  },
  methods: {
    ...mapActions('dataset', ['updateModel', 'createModel', 'listenCol', 'unlistenCol', 'listenDoc', 'unlistenDoc']),
    ...mapActions('session', ['initAuth']),
    submit () {
      const article = {
        title: this.name,
        description: this.description,
        price: this.price,
        quantity: this.quantity,
        barcode: this.barcode,
        shopId: this.localUser.shopId,
        commentary: [],
        assessment: [],
        isRemoved: false
      }

      this.createModel({ collection: Collection.Article, data: article, id: btoa(this.name.concat(this.localUser.shopId)) })
      this.$parent.isRegister = false
    },
    clear () {
      this.$parent.isRegister = false
    }
  }
}
</script>

<style scoped>

</style>
