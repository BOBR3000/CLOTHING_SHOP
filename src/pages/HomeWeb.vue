<script setup>
import CardList from '../components/CardList.vue'
import { reactive, ref, watch, onMounted, inject, provide } from 'vue'
import axios from 'axios'

const { cart, addToCart, removeFromCart } = inject('Cart')
const items = ref([])


const filters = reactive({
  sortBy: 'title',
  search: ''
})

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}


const onChangeSearchInput = (event) => {
  filters.search = event.target.value
}


const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id,
        item
      }
      item.isFavorite = true
      const { data } = await axios.post('https://093f4f78e87dee54.mokky.dev/favorites', obj)

      item.favoriteId = data.id
    } else {
      item.isFavorite = false
      await axios.delete(`https://093f4f78e87dee54.mokky.dev/favorites/${item.favoriteId}`)
      item.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}


const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.search) {
      params.title = `*${filters.search}*`
    }

    const { data } = await axios.get('https://093f4f78e87dee54.mokky.dev/items', {
      params
    })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (error) {
    console.log(error)
  }
}

const fetchFavoriteItems = async () => {
  try {
    const { data: favorites } = await axios.get('https://093f4f78e87dee54.mokky.dev/favorites')
    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchItems()
  await fetchFavoriteItems()
})


provide('addToFavorite', addToFavorite)

watch (cart, () => {
  items.value = items.value.map((items) => ({
    ...items,
    isAdded: false
  }))
});

watch(filters, fetchItems)

</script>

<template>
  <div class="flex justify-between items-center ">
    <h2 class="text-3xl font-bold mb-8">Каталог</h2>

    <div class="flex gap-4">
      <select
        @change="onChangeSelect"
        class="border border-slate-200 rounded-3xl px-3 py-2"
        name="select"
        id="1"
      >
        <option value="name">По названию</option>
        <option value="-price">По цене (дорогие)</option>
        <option value="price">По цене (дешевые)</option>
      </select>

      <div class="relative">
        <img class="absolute top-3 left-3" src="/search.svg" alt="" />
        <input
          @input="onChangeSearchInput"
          class="border border-slate-200 rounded-3xl px-4 py-2 pl-8 outline-none focus:border-gray-400"
          type="text"
          placeholder="Поиск"
        />
      </div>
    </div>
  </div>
    <div class="mt-8">
      <CardList :items="items" @addToFavorite="addToFavorite" @addToCart="onClickAddPlus" />
    </div>
</template>
