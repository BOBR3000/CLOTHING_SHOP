<script setup>
import card from './ca-rd.vue'



defineProps({
  items: Array
})

const emit = defineEmits(['addToFavorite', 'addToCart']);

</script>

<template>
  <div class="grid grid-cols-4 gap-8" v-auto-animate>
    <card
      v-for="item in items"
      :id="item.id"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :onClickAdd="() => emit('addToCart', item)"
      :onClickFavorite="() => emit('addToFavorite', item)"
      :isAdded="item.isAdded"
      :isFavorite="item.isFavorite"
    />

  </div>
</template>
