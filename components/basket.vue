<template>
  <v-card>
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        router
        exact
      >
        <v-list-item-content>
          <v-row>
            <v-col>
              {{ item.quantity }}
            </v-col>
            <v-col>
              {{ item.name }}
            </v-col>
            <v-col>
              {{ calculatePartialPrice( item.price, item.quantity ) }}
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-row>
      <v-col>
        <v-btn>
          PAGAR
        </v-btn>
      </v-col>
      <v-col>
        Precio Total: {{ totalPrice }} €
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        name: 'articulo A',
        price: 2.05,
        quantity: 5
      },
      {
        name: 'articulo B',
        price: 15.9,
        quantity: 1
      },
      {
        name: 'articulo C',
        price: 20,
        quantity: 1
      },
      {
        name: 'articulo D',
        price: 5.5,
        quantity: 1
      },
      {
        name: 'articulo E',
        price: 1,
        quantity: 10
      }
    ],
    totalPrice: 0
  }),
  name: 'basket',
  methods: {
    calculatePartialPrice (price, quantity) {
      const partialPrice = price * quantity
      this.totalPrice += partialPrice
      return partialPrice
    }
  }

}
</script>

<style scoped>

</style>
