<template>
  <form>
    <v-col>
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
  import { minValue } from 'vuelidate/lib/validators'
  import { mapActions, mapGetters } from 'vuex'
  import { Collection } from '../../services/api'

  export default {
    mixins: [validationMixin],

    validations: {
      price: { minValue: minValue(0.01) },
      quantity: { minValue: minValue(1) },
      discount: { minValue: minValue(5) },
    },

    data: () => ({
      price: null,
      quantity: null,
      discount: null,
      hasError: false
    }),

    computed: {
      ...mapGetters('session', ['superadminIsLogin', 'uid']),
      ...mapGetters('dataset', ['getListCol']),
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
    },
    destroyed() {
      this.unlistenCol(Collection.User)
    },
    methods: {
      ...mapActions('dataset', ['updateModel', 'listenCol', 'unlistenCol']),
      async submit () {
        try {
          const article = this.getUpdateArticle()
          await this.updateModel({ collection: Collection.Article, data: article, id: this.$route.params.id })
          this.exit()
        } catch (e) {
          this.hasError = true
        }
      },
      getUpdateArticle(){
        return {
          quantity: parseFloat(this.quantity),
          price: parseFloat(this.price),
          discount: parseFloat(this.discount),
        }
      },
      getShopByUser(){
        for(const shop of  this.getListCol(Collection.Shop)){
          if(shop.userId === this.uid) return shop
        }
      },
      clear () {
        this.$v.$reset()
        this.price =  null
        this.quantity = null
        this.discount =  null
      },
      exit () {
        this.$router.replace('/articles')
      }
    }
  }
</script>

<style scoped>

</style>
