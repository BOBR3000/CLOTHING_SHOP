<script setup>


defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer']);

</script>

<template>
  <header :totalPrice="totalPrice" class="flex justify-between border-b border-slate-300 px-8 py-8">
  <router-link to="/">
    <div class="flex items-center">
      <img src="/logo.png" alt="Logo" class="w-32">
      <div>
        <h2 class="text-2xl font-bold uppercase">CrushClothing</h2>
        <p class="text-slate-400">Магазин спортивной одежды</p>
      </div>
    </div>
  </router-link>
<ul class="flex items-center gap-8">
  <li @click="emit('openDrawer')"  class="flex items-center gap-2">
    <img src="/cart.svg" alt="">
    <b class="cursor-pointer text-slate-500 hover:text-black">{{totalPrice}}руб.</b>
  </li>


      <router-link to="/FavoRites">
        <li class="flex items-center gap-2">
          <img  src="/heart.svg" alt="">
          <span class="cursor-pointer text-slate-500 hover:text-black">Закладки</span>
        </li>
      </router-link>
</ul>


</header>
</template>

