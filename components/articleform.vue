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
      v-model="description"
      :error-messages="descriptionErrors"
      label="Descripción"
      required
      @input="$v.description.$touch()"
      @blur="$v.description.$touch()"
    ></v-text-field>
    <v-text-field
      type="number"
      v-model="price"
      :error-messages="priceErrors"
      label="Precio"
      @input="$v.price.$touch()"
      @blur="$v.price.$touch()"
    ></v-text-field>
    <v-text-field
      type="number"
      v-model="quantity"
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
    <v-btn class="mr-4" @click="submit">Añadir</v-btn>
    <v-btn @click="clear">Cancelar</v-btn>
  </form>
</template>

<script>
import minValue from 'vuelidate/src/validators/minValue'
import maxLength from 'vuelidate/src/validators/maxLength'
import minLength from 'vuelidate/src/validators/minLength'

export default {
  name: 'articleform',
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    description: { required, maxLength: maxLength(500), minLength: minLength(150) },
    price: { required, minValue: minValue (0) },
    quantity: { required, minValue: minValue (0) },
    barcode: { maxLength: maxLength(15) }
  },

  data: () => ({
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    barcode: ''
  }),

  computed: {
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

  methods: {
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.description = ''
      this.price = ''
      this.quantity = ''
      this.barcode = ''
    }
  }
}
</script>

<style scoped>

</style>
