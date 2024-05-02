<script setup>
import DrawerHead from './DrawerHead.vue'
import cardListDrawer from './CardListDrawer.vue'
import emptyDrawer from './emptyDrawer.vue'

const emit = defineEmits(['createOrder'])

defineProps({
  totalPrice: Number,
  vatPrice: Number,
  disabledButton: Boolean
})
</script>

<template>
  <div class="fixed top-0 left-0 w-full h-full bg-slate-500/50 z-10"></div>
  <div class="bg-white w-96 h-full fixed top-0 right-0 z-20 p-8">
    <DrawerHead />


    <div v-if="!totalPrice" class="flex h-full items-center ">
      <emptyDrawer
        title="Корзина пуста"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
        imageUrl="/public/JEMA GER 1722-13.png"
      />
    </div>

  <div v-else>
    <cardListDrawer />
  
      <div>
        <div class="flex flex-col gap-5 mt-6">
          <div class="flex gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-slate-300 border-dashed"></div>
            <b>{{ totalPrice }} руб.</b>
          </div>
  
          <div class="flex gap-2">
            <span>Доставка:</span>
            <div class="flex-1 border-b border-slate-300 border-dashed"></div>
            <b>{{ vatPrice }} руб.</b>
          </div>
  
          <div>
            <button
              @click="emit('createOrder')"
              :disabled="disabledButton"
              class="bg-black text-white py-3 px-5 w-full rounded-3xl font-bold hover:bg-slate-800 transition hover:shadow-2xl hover:-translate-y-1 cursor-pointer active:translate-y-1 disabled:bg-slate-300"
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
  </div>
  </div>
</template>
