import { createWebHashHistory, createRouter, Router, RouteRecordRaw } from 'vue-router'

import Characters from '@pages/Characters.vue';
import Films from '@pages/Films.vue';
import Home from '@pages/Home.vue';
import Planets from '@pages/Planets.vue';
import Species from '@pages/Species.vue';
import Starships from '@pages/StarShips.vue';
import Vehicles from '@pages/Vehicles.vue';


const routes: RouteRecordRaw[] = [
  {
    path: "/people/:id",
    name: "characters",
    component: Characters,
  },
  {
    path: "/films/:id",
    name: "films",
    component: Films,
  },
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/planets/:id",
    name: "planets",
    component: Planets,
  },
  {
    path: "/species/:id",
    name: "species",
    component: Species,
  },
  {
    path: "/starships/:id",
    name: "starships",
    component: Starships,
  },
  {
    path: "/vehicles/:id",
    name: "vehicles",
    component: Vehicles,
  },
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router