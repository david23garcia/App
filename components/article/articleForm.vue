<template>
  <form>
    <v-col>
      <v-row>
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="20"
          label="Nombre"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field></v-row>
      <v-row>
        <v-text-field
          v-model="description"
          :error-messages="descriptionErrors"
          :counter="250"
          label="Descripción"
          required
          @input="$v.description.$touch()"
          @blur="$v.description.$touch()"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="barcode"
          :error-messages="barcodeErrors"
          :counter="250"
          label="Código de Barras"
          required
          @input="$v.barcode.$touch()"
          @blur="$v.barcode.$touch()"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-col> <v-text-field
          v-model="quantity"
          :error-messages="quantityErrors"
          type="number"
          label="Cantidad"
          required
          @input="$v.quantity.$touch()"
          @blur="$v.quantity.$touch()"
        ></v-text-field></v-col>
        <v-col> <v-text-field
          v-model="price"
          :error-messages="priceErrors"
          type="number"
          label="Precio"
          required
          @input="$v.price.$touch()"
          @blur="$v.price.$touch()"
        ></v-text-field></v-col>
        <v-col> <v-text-field
          v-model="discount"
          :error-messages="discountErrors"
          type="number"
          label="Descuento"
          @input="$v.discount.$touch()"
          @blur="$v.discount.$touch()"
        ></v-text-field></v-col>
      </v-row>
    </v-col>
    <p v-if="hasError">Fallo en el Registro, vuelva a intentarlo</p>
    <v-btn class="mr-4" @click="submit">Registrar</v-btn>
    <v-btn @click="exit()">Cancelar</v-btn>
  </form>
</template>


<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minValue, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'
import { Collection } from '../services/api'

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20) },
    description: { required, maxLength: maxLength(250) },
    price: { required, minValue: minValue(0.01) },
    quantity: { required, minValue: minValue(1) },
    discount: { minValue: minValue(5) },
    barcode: { required, minLength: minLength(18), maxLength: maxLength(18) },
  },

  data: () => ({
    name: '',
    description: '',
    price: null,
    quantity: null,
    discount: null,
    barcode: '',
    hasError: false
  }),

  computed: {
    ...mapGetters('session', ['superadminIsLogin', 'uid']),
    ...mapGetters('dataset', ['getListCol']),
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('El nombre debe tener 20 caracteres como máximo')
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
    barcodeErrors () {
      const errors = []
      if (!this.$v.barcode.$dirty) return errors
      !this.$v.barcode.maxLength && errors.push('El codigo de barras debe tener 18 caracteres')
      !this.$v.barcode.minLength && errors.push('El codigo de barras debe tener 18 caracteres')
      !this.$v.barcode.required && errors.push('Codigo de Barras necesario.')
      return errors
    },
    quantityErrors () {
      const errors = []
      if (!this.$v.quantity.$dirty) return errors
      !this.$v.quantity.minValue && errors.push('Se necesita registrar con al menos 1 producto')
      !this.$v.quantity.required && errors.push('Cantidad necesaria.')
      return errors
    },
    priceErrors () {
      const errors = []
      if (!this.$v.price.$dirty) return errors
      !this.$v.price.minValue && errors.push('El precio no puede ser menor a 0,05€')
      !this.$v.price.required && errors.push('Precio necesario')
      return errors
    },
    discountErrors () {
      const errors = []
      if (!this.$v.discount.$dirty) return errors
      !this.$v.discount.maxLength && errors.push('El descuento debe ser superior al 5%')
      return errors
    },
  },
  mounted() {
    this.listenCol(Collection.User)
    this.listenCol(Collection.Shop)
  },
  destroyed() {
    this.unlistenCol(Collection.User)
    this.unlistenCol(Collection.Shop)
  },
  methods: {
    ...mapActions('dataset', ['createModel', 'listenCol', 'unlistenCol']),
    ...mapActions('session', ['registerUser']),
    async submit () {
      try {
        const shop = this.getShopByUser()
        const shopId = shop.id
        const article = this.getNewArticle(shopId)
        await this.createModel({ collection: Collection.Article, data: article, id: null })
        this.exit()
      } catch (e) {
        this.hasError = true
      }
    },
    getNewArticle(id){
      return {
        name: this.name,
        description: this.description,
        quantity: this.quantity,
        price: this.price,
        shopId: id,
        discount: this.discount,
        isBlocked: false,
        isRemoved: false
      }
    },
    getShopByUser(){
      for(const shop of  this.getListCol(Collection.Shop)){
        if(shop.userId === this.uid) return shop
      }
    },
    clear () {
      this.$v.$reset()
      this.name =  ''
      this.description =  ''
      this.price =  null
      this.quantity = null
      this.discount =  null
      this.barcode =  ''
    },
    exit () {
      this.$router.replace('/articles')
    }
  }
}
</script>

<style scoped>

</style>
