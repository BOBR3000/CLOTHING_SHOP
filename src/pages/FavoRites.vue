<script setup>
import axios from 'axios';
import {onMounted, ref} from 'vue';
import CardList from "../components/CardList.vue";
const FavoRites = ref([])

onMounted(async () => {
  try {
    const {data} = await axios.get('https://093f4f78e87dee54.mokky.dev/favorites')
    FavoRites.value = data.map(obj => obj.item);
  } catch (error) {
    console.log(error)
  }
})
</script>


<template>
  <div>
    <h1 class="text-3xl font-bold">Мои закладки</h1>

    <CardList :items="FavoRites" />
  </div>
</template>