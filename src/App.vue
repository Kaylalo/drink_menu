<template>
  <header id="nav-bar">
    Cocktails Menu
  </header>
  <body class="content">
  <div class="border-box">
    <div class="container center">
      <h1>Cocktails Menu</h1>
      <div class="image-grid">
        <div v-for="(item, index) in data" :key="item" class="grid-item"  @click="showIngredient(item.idDrink, index)">
          <div :class= "{ 'selected-item': index === selectedItemIndex }">
            <img width=200  :src="item.strDrinkThumb"/>
            <p>
            {{ item.strDrink }}
          </p>
          </div>
        </div>
      </div>
      <div v-if="selectedCocktail">
        <h2>{{ selectedCocktail.strDrink }}</h2>
        <p>Main Ingredient: {{ selectedCocktail.strIngredient1 }}</p>
        <p>Category: {{ selectedCocktail.strCategory }}</p>
        <p>Instructions: {{ selectedCocktail.strInstructions }}</p>
      </div>
      <p><span>Order Now!</span> cocktailsmenu.com</p>
      <paginate :page-count="10" :page-range="3" :margin-pages="2" :click-handler="clickCallback" :prev-text="'Prev'"
                :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'"></paginate>
    </div>
  </div>
  </body>
</template>

<script setup>

import { ref } from 'vue';
import axios from 'axios';
import Paginate from "vuejs-paginate-next"

const data = ref([])
const selectedCocktail = ref(null);
const selectedItemIndex = ref(-1); // Initialize with -1 to indicate no selection

// for (let i = 0; i < 6; i++) {
//   axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php').then((response) => {
//     data.value.push(response.data.drinks[0])
//   }).catch((err) => {
//     console.error(err)
//   })
// }
const showIngredient = async (idDrink, index) => {
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`);
    selectedCocktail.value = response.data.drinks[0];
    selectedItemIndex.value = index; // Set the selected item's index
  } catch (error) {
    console.error(error);
  }
}

let currentPage = ref(1); // Track the current page
let totalCocktailCount = ref(0);
const itemsPerPage = 6;

const fetchCocktailsForPage = async (page) => {
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail&p=${page}`);
    const allCocktails = response.data.drinks;
    totalCocktailCount.value = allCocktails.length; // Update total cocktail count

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    data.value = allCocktails.slice(startIndex, endIndex); // Update the data with cocktails for the current page
  } catch (error) {
    console.error(error);
  }
};

const clickCallback = (pageNum) => {
  console.log(pageNum);
  currentPage.value = pageNum; // Update the current page
  fetchCocktailsForPage(currentPage.value); // Fetch and update cocktails for the clicked page
};
// Load initial cocktails
fetchCocktailsForPage(currentPage.value)

</script>