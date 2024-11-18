import { computed, Ref, ref } from 'vue'
import { defineStore } from 'pinia'

import {Data} from "@typings/store";
import { StarWars_Response } from '@typings/service';

interface PayloadPagination extends StarWars_Response {};

export const useInfoStore = defineStore('info', () => {
  const count: Ref<number> = ref(0);
  const info: Ref<Data.StateGroup[]> = ref([]);
  const loading: Ref<boolean> = ref(false);
  const next: Ref<string | null> = ref(null);
  const previous: Ref<string | null> = ref(null);

  const isLoading = computed(() => loading.value);

  function setIsLoading (payload: boolean) {
    loading.value = payload;
  };

  function saveDataPagination(payload: PayloadPagination) {
    console.log('[STORE] saveDataPagination -> payload',payload);
    count.value = payload.count;
    next.value = payload.next;
    previous.value = payload.previous;
  };

  function saveInfo(payload: Data.StateGroup[]) {
    payload.map((item) => info.value.push(item));
  };
  
  function clearInfo() {
    info.value = [];
  };

  return { clearInfo,
    saveDataPagination,
    saveInfo,
    setIsLoading, 
    count, 
    info, 
    isLoading, 
    next, 
    previous
  }
})