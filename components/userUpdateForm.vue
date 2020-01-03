<template>
  <v-card cols="8">
    <v-card-title>Actualizar Pefil Usuario</v-card-title>
    <span></span>
    <v-form >
      <v-text-field
        v-model="phone"
        :error-messages="phoneErrors"
        label="Telefono"
        @input="$v.phone.$touch()"
        @blur="$v.phone.$touch()"
      ></v-text-field>
<!--      <v-text-field-->
<!--        v-model="email"-->
<!--        :error-messages="emailErrors"-->
<!--        label="Email"-->
<!--        @input="$v.email.$touch()"-->
<!--        @blur="$v.email.$touch()"-->
<!--      ></v-text-field>-->
      <v-card align="center">
        <v-btn class="mr-4" @click="submit">Modificar</v-btn>
        <v-btn @click="this.$parent.isUpdateUser=false">Cancelar</v-btn>
      </v-card>
      <span></span>
    </v-form>
    <span></span>
  </v-card>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength } from 'vuelidate/lib/validators'
  import { mapActions, mapGetters } from 'vuex'
  import { Collection } from '../services/api'

  export default {
    name: 'UserUpdateForm',
    mixins: [validationMixin],
    validations: {
      phone: { required, maxLength: maxLength(9) },
    },

    data: () => ({
      phone: null,
    }),
    computed: {
      ...mapGetters('session', ['logged', 'uid', 'localUser']),
      ...mapGetters('dataset', ['getUser', 'getListCol']),
      phoneErrors () {
        const errors = []
        if (!this.$v.phone.$dirty) { return errors }
        !this.$v.phone.maxLength && errors.push('phone must be at most 9 characters long')
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
      ...mapActions('session', ['initAuth', 'registerUser', 'setUser', 'login']),
      submit () {
          if(this.phone !== null){
          this.updateModel({ collection: Collection.Shop, data:  {
              phone: this.phone
            }, id: this.id })
        }
        this.$parent.isUpdateUser=false
      }
    }
  }
</script>

<style scoped>

</style>

