<script setup lang="ts">
  import {isArray} from "underscore";

  import {BASE_URL_IMG} from "@utils/constants";
  import {getId, hasValue, isResCharacter, isResFilms, isResPlanets, isResSpecies, isResStarships, isResVehicles} from "@utils/util";

  import {InfoExtra} from "@typings/components";


  const {info, title = 'Vehículos'} = defineProps<InfoExtra.Props>();

  const onErrorImg: InfoExtra.OnErrorImg = (e) => {
    e.currentTarget.src = `${BASE_URL_IMG}/placeholder.jpg`;
  };

</script>

<template>
  <div v-if="hasValue(info[0])" class="list-feature"><h6>{{title}}: </h6>
    <template v-if="isArray(info) && isResCharacter(info)">
      <div v-for="character in info" :key="getId(character.url)" class="info">
        <img :src="`${BASE_URL_IMG}/characters/${getId(character.url)}.jpg`" :alt="character.name" width="32.9" @error="onErrorImg" />
        <div class="feature">
          <p>
            <strong>Nombre: </strong>{{character.name}}
          </p>
        </div>
      </div>
    </template>
    <template v-if="isArray(info) && isResFilms(info)">
      <div v-for="film in info" :key="getId(film.url)" class="info">
        <img :src="`${BASE_URL_IMG}/films/${getId(film.url)}.jpg`" :alt="film.title" width="32.9" @error="onErrorImg" />
        <div class="feature">
          <p>
            <strong>Nombre: </strong>{{film.title}}
          </p>
        </div>
      </div>
    </template>
    <template v-if="isArray(info) && isResPlanets(info)">
      <div v-for="planet in info" :key="getId(planet.url)" class="info">
        <img :src="`${BASE_URL_IMG}/planets/${getId(planet.url)}.jpg`" :alt="planet.name" width="32.9" @error="onErrorImg" />
        <div class="feature">
          <p>
            <strong>Nombre: </strong>{{planet.name}}
          </p>
        </div>
      </div>
    </template>
    <template v-if="isArray(info) && isResSpecies(info)">
      <div v-for="specie in info" :key="getId(specie.url)" class="info">
        <img :src="`${BASE_URL_IMG}/species/${getId(specie.url)}.jpg`" :alt="specie.name" width="32.9" @error="onErrorImg" />
        <div class="feature">
          <p>
            <strong>Nombre: </strong>{{specie.name}}
          </p>
        </div>
      </div>
    </template>
    <template v-if="isArray(info) && isResSpecies(info)">
      <div v-for="specie in info" :key="getId(specie.url)" class="info">
        <img :src="`${BASE_URL_IMG}/species/${getId(specie.url)}.jpg`" :alt="specie.name" width="32.9" @error="onErrorImg" />
        <div class="feature">
          <p>
            <strong>Nombre: </strong>{{specie.name}}
          </p>
        </div>
      </div>
    </template>
    <template v-if="isArray(info) && isResStarships(info)">
      <div v-for="starship in info" :key="getId(starship.url)" class="info">
        <img :src="`${BASE_URL_IMG}/starships/${getId(starship.url)}.jpg`" :alt="starship.name" width="32.9" @error="onErrorImg" />
        <div class="feature">
          <p>
            <strong>Nombre: </strong>{{starship.name}}
          </p>
        </div>
      </div>
    </template>
    <template v-if="isArray(info) && isResVehicles(info)">
      <div v-for="vehicle in info" :key="getId(vehicle.url)" class="info">
        <img :src="`${BASE_URL_IMG}/vehicles/${getId(vehicle.url)}.jpg`" :alt="vehicle.name" width="32.9" @error="onErrorImg" />
        <div class="feature">
          <p>
            <strong>Nombre: </strong>{{vehicle.name}}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .list-feature {
    width: 100%;
    padding-bottom: 2%;
    h6 {padding-bottom: 1%; color: var(--head-sixth-col); text-shadow: 1px 1px 3px var(--head-sixth-col-sdw); font-weight: bold;}
        
    .info{
      margin-top: 2%;
      width: 96%;
      padding: 0 2% 1%;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
    }
    .feature {
      display: flex;
      width: 100%;
      padding-left: 5%;
      p {
        display: inline-flex;
        width: 48%;
        flex-direction: column;
        padding: 0 1%;
        color: var(--paragraph-col); text-shadow: 1px 1px 3px var(--paragraph-col-sdw);
        
        strong{font-weight: bold; display: inline-flex; align-items: flex-start;}
      }
    }
  }
</style>