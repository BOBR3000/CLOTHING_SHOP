<script setup>
import { inject } from 'vue'
import card_for_drawer from './card_for_drawer.vue'

const { cart, removeFromCart } = inject('Cart')
</script>

<template>
  <div class="flex flex-col py-3" v-auto-animate>
    <card_for_drawer
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :imageUrl="item.imageUrl"
      @onClickRemove="() => removeFromCart(item)"
    />
  </div>
</template>
