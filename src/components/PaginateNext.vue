<template>
  <div>
    <button
        :disabled="!previousPageAvailable"
        @click="previousPage"
    >
      previous
    </button>
    <button
        :disabled="!nextPageAvailable"
        @click="nextPage"
    >
      next
    </button>
    <p
        v-for="element in pageElements"
        :key="element.id"
    >
      {{ element.name }}
    </p>
  </div>
</template>

<!-- components/ElementTable.vue -->
<script setup lang="ts">
import axios from 'axios';
import { reactive, ref } from 'vue';
import { usePaginatedResource } from '@/composables/paginatedResource';

interface Element { // Element from the API
  id: string,
  name: string,
}

interface Params {
  page?: number,
  size?: number,
  search: string,
}
const getElements = async (
    params: Params,
): Promise<{ total: number, elements: Array<Element> }> => {
  const response = await axios.get('https://some.url/endpoint', { params });
  return { total: response.data.total, elements: response.data.items };
}

const page = ref(1);
const params = reactive({ search: 'some search' });

const previousPage = () => {
  page.value -= 1;
}

const nextPage = () => {
  page.value += 1;
}

const resetPage = () => {
  page.value = 1;
};

const {
  pageElements,
  previousPageAvailable,
  nextPageAvailable,
} = usePaginatedResource(getElements, page, resetPage, params);
</script>
