<script setup lang="ts">
  import { watch } from "vue";
  import {useRoute} from 'vue-router';
  import {isUndefined} from "underscore";

  import {BASE_URL} from "@utils/constants";
  import Footer from "@components/Footer/Footer.vue";
  import Header from "@components/Header/Header.vue";
  import CardVehicles from '@components/Card/Card.vue';
  import useGettingInfo from "@composables/useGettingInfo";

  import {Data as D} from "@typings/store";
  import {Paginate} from "@typings/app";
  import {StarWars_Response_vehicles} from "@typings/service";


  const route = useRoute();
  const {getInfo, info} = useGettingInfo();

  const paginate: Paginate = (id) => {
    getInfo<StarWars_Response_vehicles>(`${BASE_URL}/vehicles/?page=${id}`);
  };

  watch(() => route.params.id, (id, _prevId) => {
    window.scrollTo(0, 0);
    !isUndefined(id) && paginate(id as string);
  });
</script>

<template>
  <Header />
  <article v-if="info?.length > 0">
    <CardVehicles v-for="(vehicle, index) in (info as D.VehiclesState[])" :key="vehicle.name" :item="vehicle" :id="`Card${index}`" />
  </article>
  <Footer />
</template>

<style lang="scss" scoped>
 @use 'Pages.scss';
</style>