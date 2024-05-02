<script setup>

defineProps ({
  imageUrl: String,
  title: String,
  description: String
})

</script>


<template>
  <div class="flex flex-col items-center text-center gap-4 w-72 mx-auto">
    <img height="100" width="100" :src="imageUrl" alt="Empty" />
    <h2 class="mt-4 text-2xl font-bold">{{ title }}</h2>
    <p class="text-slate-400">{{ description }}</p>
  </div>
</template>