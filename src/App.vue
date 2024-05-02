<script setup>
import {ref, provide, computed } from 'vue'
import axios from 'axios'
import hHeader from './components/hHeader.vue'
import Drawer from './components/_Drawer.vue'



/* Корзина  */

const cart = ref([])
const isCreatingOrder = ref(false)
const drawerOpen = ref(false)

const totalPrice = computed(() => {
  return cart.value.reduce((acc, item) => acc + item.price, 0)
})

const vatPrice = computed(() => {
  return Math.round(totalPrice.value * 0.05)
})

const cartIsEmpty = computed(() => cart.value.length === 0)

const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)

const drawerClose = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://093f4f78e87dee54.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value
    })

    cart.value = []
    return data
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}
const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}
const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}
/* Корзина  */



provide('Cart', {
  cart,
  openDrawer,
  drawerClose,
  addToCart,
  removeFromCart
})


</script>

<template>
  <Drawer
    v-if="drawerOpen"
    :totalPrice="totalPrice"
    :vatPrice="vatPrice"
    @createOrder="createOrder"
    :disabledButton="cartButtonDisabled"
  />

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
      <hHeader :totalPrice="totalPrice" @openDrawer="openDrawer" />

      <div class="p-10">
        <HomeWeb />
        <router-view></router-view>
      </div>

  </div>
  
</template>
