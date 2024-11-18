<script setup lang="ts">
import {isNull} from "underscore";

import {BASE_URL_IMG} from "@utils/constants";
import {closeFlip, getId, isResCharacter, isResFilms, isResPlanets, isResSpecies, isResStarships, isResVehicles, onErrorImg, openFlip} from "@utils/util";

import InfoExtra from "@components/InfoExtra/InfoExtra.vue";
import Feature from "@components/Feature/Feature.vue";

import {CardCharacter} from '@typings/components';

const {id, item} = defineProps<CardCharacter.Props>()

const id_url = getId(item.url);

const isCharacters = isResCharacter(item);
const isFilms = isResFilms(item);
const isPlanets = isResPlanets(item);
const isSpecies = isResSpecies(item);
const isStarships = isResStarships(item);
const isVehicles = isResVehicles(item);

const sectionPath =
  isCharacters ? 'characters' :
  isFilms ? 'films' :
  isPlanets ? 'planets' :
  isSpecies ? 'species' :
  isStarships ? 'starships' :
  isVehicles ? 'vehicles' : null;
console.log("[CARD] id: ", id);
</script>

<template>
  <section :id="id" className="card">
    <figure className="flip-card">
      <div className="inner">
        <div className="front" @click="(e) => { openFlip(e, id); }">
          <img v-if="!isNull(sectionPath)" :src="`${BASE_URL_IMG}/${sectionPath}/${id_url}.jpg`" alt="1" height="auto" width="auto" @error="onErrorImg" />
        </div>
        <div className="back">
          <button type="button" @click="(e) => { closeFlip(e, id); }">x</button>
          <div v-if="isCharacters" className="info">
            <Feature title="Birth Year" :value="item.birth_year" />
            <Feature title="Gender" :value="item.gender" />
            <Feature title="Eye Color" :value="item.eye_color" />
            <Feature title="Hair Color" :value="item.hair_color" />
            <Feature title="Height" :value="item.height" />
            <Feature title="Weight" :value="item.mass" />
            <Feature title="Skin Colors" :value="item.skin_color" />
          </div>
          <div v-else-if="isFilms" className="info">
            <Feature title="Opening" :value="item.opening_crawl" long />
            <Feature title="Episode" :value="`${item.episode_id}`" />
            <Feature title="Director" :value="item.director" />
            <Feature title="Producers" :value="item.producer" />
            <Feature title="Release Date" :value="item.release_date" />
          </div>
          <div v-else-if="isPlanets" className="info">
            <Feature title="Rotation Period" :value="`${item.rotation_period}`" />
            <Feature title="Orbital Period" :value="`${item.orbital_period}`" />
            <Feature title="Diameter" :value="`${item.diameter}`" />
            <Feature title="Gravity" :value="`${item.gravity}`" />
            <Feature title="Earth Surface" :value="`${item.terrain}`" />
            <Feature title="Weathers" :value="`${item.climate}`" />
            <Feature title="Water Surface" :value="`${item.surface_water}`" />
            <Feature title="Population" :value="`${item.population}`" />
          </div>
          <div v-else-if="isSpecies" className="info">
            <Feature title="Eyes Colors" :value="item.eye_colors" />
            <Feature title="Hair Colors" :value="item.hair_colors" />
            <Feature title="Skins Colors" :value="item.skin_colors" />
            <Feature title="Rate Height" :value="`${item.average_height}`" />
            <Feature title="Rate Life" :value="`${item.average_lifespan}`" />
            <Feature title="Classification" :value="`${item.classification}`" />
            <Feature title="Designation" :value="`${item.designation}`" />
            <Feature title="Languages" :value="item.language" />
          </div>
          <div v-else-if="isStarships" className="info">
            <Feature title="Model" :value="item.model" />
            <Feature title="Cargo Capacity" :value="`${item.cargo_capacity}`" />
            <Feature title="Consumable" :value="`${item.consumables}`" />
            <Feature title="Hyperdrive Rating" :value="`${item.hyperdrive_rating}`" />
            <Feature title="Length" :value="`${item.length}`" />
            <Feature title="Cost In Credits" :value="`${item.cost_in_credits}`" />
            <Feature title="Manufacturer" :value="item.manufacturer" />
            <Feature title="Max Atmosphering Speed" :value="`${item.max_atmosphering_speed}`" />
            <Feature title="Passengers" :value="`${item.passengers}`" />
            <Feature title="Starships Class" :value="item.starship_class" />
          </div>
          <div v-else-if="isVehicles" className="info">
            <Feature title="Model" :value="item.model" />
            <Feature title="Cargo Capacity" :value="`${item.cargo_capacity}`" />
            <Feature title="Consumables" :value="`${item.consumables}`" />
            <Feature title="Length" :value="`${item.length}`" />
            <Feature title="Cost In Credits" :value="`${item.cost_in_credits}`" />
            <Feature title="Manufacturer" :value="item.manufacturer" />
            <Feature title="Max Atmosphering Speed" :value="`${item.max_atmosphering_speed}`" />
            <Feature title="Passengers" :value="`${item.passengers}`" />
            <Feature title="Vehicles Class" :value="item.vehicle_class" />
          </div>
          <template v-if="isCharacters">
            <InfoExtra title="Planeta de origen" :info="item.homeworld" />
            <InfoExtra title="Filmes" :info="item.films" />
            <InfoExtra title="Naves estelares" :info="item.starships" />
            <InfoExtra title="Vehículos" :info="item.vehicles" />
          </template>
          <template v-else-if="isFilms">
            <InfoExtra title="Personajes" :info="item.characters" />
            <InfoExtra title="Planetas" :info="item.planets" />
            <InfoExtra title="Especies" :info="item.species" />
            <InfoExtra title="Naves estelares" :info="item.starships" />
            <InfoExtra title="Vehículos" :info="item.vehicles" />
          </template>
          <template v-else-if="isPlanets">
            <InfoExtra title="Filmes" :info="item.films" />
            <InfoExtra title="Residentes" :info="item.residents" />
          </template>
          <template v-else-if="isSpecies">
            <InfoExtra title="Planeta de origen" :info="item.homeworld" />
            <InfoExtra title="Filmes" :info="item.films" />
            <InfoExtra title="Personas" :info="item.people" />
          </template>
          <template v-else-if="isStarships">
            <InfoExtra title="Filmes" :info="item.films" />
            <InfoExtra title="Pilotos" :info="item.pilots" />
          </template>
          <template v-else-if="isVehicles">
            <InfoExtra title="Filmes" :info="item.films" />
            <InfoExtra title="Pilotos" :info="item.pilots" />
          </template>
        </div>
      </div>
      <figcaption><h4>Name: {{item.name}}</h4></figcaption>
    </figure>
  </section>
</template>

<style scoped lang="scss">
  .card, .card-home {
    border: 1px solid var(--card-col-b);
    box-shadow: 0px 0px 7px var(--card-col-b);
    a {text-decoration: none;}
  }

  figure {max-width: 100%;}
  figure img {max-width: 100%; height: fit-content;}
  figcaption {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 3%;
  }

  section {
    display: flex;
    justify-content: center;
  }

  h4 {color: var(--head-fourth-col); font-weight: bold;}

  .flip-card {
    background-color: transparent;
    width: 400px;
    perspective: 1000px;
    
    .inner {
      position: relative;
      width: 100%;
      height: 0%;
      transition: transform 0.8s;
      transform-style: preserve-3d;
      padding-top: 137.5%;

      .front,
      .back {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
      }
      .front {
        width: 100%;
        background-color: var(--card-col-bg_front);
      }
      .back {
        width: 88%;
        padding: 0 6%;
        background-color: var(--card-col-bg_back);
        color: var(--card-col_back);
        transform: rotateY(180deg);
        justify-content: flex-start;
        overflow-y: auto;
        & button{
          position: absolute;
          right: 0;
          top: 0;
          background-color: transparent;
          border: none;
          color: var(--card_col_btn-close);
          background-color: var(--card_col-bg_btn-close);
          width: 25px;
          height: 25px;
          border-radius: 5px;
          border-top-right-radius: 0px;
          border: 1px solid;
          border-color: var(--card_col-b_btn-close);
        }
        .info {
          margin-top: 4%;
          display: flex;
          padding-bottom: 2%;
          flex-wrap: wrap;
          justify-content: space-between; 
        }
      }
      &.flip {
        transform: rotateY(180deg);
      }
    }
    
  }

  @media screen and (max-width: 848px) {
    .flip-card {
      .inner{
        .back{
          padding: 0 9% 0 3%;
          button{width: 35px; height: 35px;}
        }
      }
    }
  }

  @media screen and (max-width: 430px) {
    section {margin: 0 5px;}
    .flip-card {
      width: 100%;
      max-width: 400px;
    }
  }

  @media screen and (max-width: 410px) {
    section {margin: 0 5px;}
  }
</style>