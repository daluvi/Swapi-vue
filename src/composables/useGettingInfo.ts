import { storeToRefs } from "pinia";

import { 
  getId,
  hasValue,
  isResCharacter, 
  isResFilms, 
  isResPlanets, 
  isResSpecies, 
  isResStarships, 
  isResVehicles, 
  isUrlFilms, 
  isUrlPeople, 
  isUrlPlanets, 
  isUrlSpecies, 
  isUrlVehicles 
} from "@utils/util";
import {gettingData} from "@service/index";
import {useInfoStore} from "@store/index";

import {Data as D} from "@typings/store";
import { 
  ResponseGroup,
  ResultCharacter,
  ResultFilms,
  ResultGroup,
  ResultPlanets,
  ResultSpecies,
  ResultStarships,
  ResultVehicles,
  StarWars_Response_minimal,
} from "@typings/service";


const useGettingInfo = () => {
  const store = useInfoStore();
  const {info} = storeToRefs(store);
  const {
    clearInfo,
    saveDataPagination,
    saveInfo,
    setIsLoading
  } = store;
  const checkingTypeUrl = async (url: string): Promise<ResultGroup | StarWars_Response_minimal> => {
    let data;
    if (isUrlPeople(url)) {
      data = await gettingData<ResultCharacter>(url);
    } else if (isUrlPlanets(url)) {
      data = await gettingData<ResultPlanets>(url);
    } else if (isUrlFilms(url)) {
      data = await gettingData<ResultFilms>(url);
    } else if (isUrlSpecies(url)) {
      data = await gettingData<ResultSpecies>(url);
    } else if (isUrlVehicles(url)) {
      data = await gettingData<ResultVehicles>(url);
    } else {
      data = await gettingData<ResultStarships>(url);
    }
    return data;
  };

  const processAsyncDetailsInArray = async (urls: string[]): Promise<(ResultGroup | StarWars_Response_minimal)[]> => Promise.all(
    urls.map(async (url) => {
      return await checkingTypeUrl(url);
    })
  );

  const processAsyncDetails = async (url: string): Promise<(ResultGroup | StarWars_Response_minimal)[]> => {
    return [await checkingTypeUrl(url)];
  };

  const checkTypeOfProcessToUse = 
    async (item: string | string[]): Promise<(ResultGroup | StarWars_Response_minimal)[]> =>
      item instanceof Array ?
        await processAsyncDetailsInArray(item) :
        await processAsyncDetails(item);
  
  const processingToCharacters = async (item: ResultCharacter) => {
    const homeworld = hasValue(item.homeworld) ? await checkTypeOfProcessToUse(item.homeworld as string) as unknown as ResultPlanets: [''];
    const films = hasValue(item.films) ? await checkTypeOfProcessToUse(item.films) as unknown as ResultFilms: [''];
    const species = hasValue(item.species) ? await checkTypeOfProcessToUse(item.species) as unknown as ResultSpecies: [''];
    const starships = hasValue(item.starships) ? await checkTypeOfProcessToUse(item.starships) as unknown as ResultStarships: [''];
    const vehicles = hasValue(item.vehicles) ? await checkTypeOfProcessToUse(item.vehicles) as unknown as ResultVehicles: [''];
    return {...item, homeworld, films, species, starships, vehicles} as unknown as ResultCharacter;
  };
  const processingToSpecies = async (item: ResultSpecies) => {
    const homeworld = hasValue(item.homeworld) ? await checkTypeOfProcessToUse(item.homeworld as string) as unknown as ResultPlanets: [''];
    const films =  hasValue(item.films) ? await checkTypeOfProcessToUse(item.films) as unknown as ResultFilms: [''];
    const people = hasValue(item.people) ? await checkTypeOfProcessToUse(item.people) as unknown as ResultCharacter: [''];
    return {...item, homeworld, films, people} as unknown as ResultSpecies;
  };
  const processingToVehicles = async (item: ResultVehicles) => {
    const films =  hasValue(item.films) ? await checkTypeOfProcessToUse(item.films) as unknown as ResultFilms : [''];
    const pilots = hasValue(item.pilots) ? await checkTypeOfProcessToUse(item.pilots) as unknown as ResultCharacter : [''];
    return {...item, films, pilots} as unknown as ResultVehicles;
  };
  const processingToStarships = async (item: ResultStarships) => {
    const films = hasValue(item.films) ? await checkTypeOfProcessToUse(item.films) as unknown as ResultFilms: [''];
    const pilots = hasValue(item.pilots) ? await checkTypeOfProcessToUse(item.pilots) as unknown as ResultCharacter: [''];
    return {...item, films, pilots} as unknown as ResultStarships;
  };
  const processingToPlanets = async (item: ResultPlanets) => {
    const films = hasValue(item.films) ? await checkTypeOfProcessToUse(item.films) as unknown as ResultFilms: [''];
    const residents = hasValue(item.residents) ? await checkTypeOfProcessToUse(item.residents) as unknown as ResultCharacter: [''];
    return {...item, films, residents} as unknown as ResultPlanets;
  };

  const processingToFilms = async (item: ResultFilms) => {
    const species = hasValue(item.species) ? await checkTypeOfProcessToUse(item.species) as unknown as ResultSpecies: [''];
    const starships = hasValue(item.starships) ? await checkTypeOfProcessToUse(item.starships) as unknown as ResultStarships: [''];
    const vehicles = hasValue(item.vehicles) ? await checkTypeOfProcessToUse(item.vehicles) as unknown as ResultVehicles: [''];
    const characters = hasValue(item.characters) ? await checkTypeOfProcessToUse(item.characters) as unknown as ResultCharacter: [''];
    const planets = hasValue(item.planets) ? await checkTypeOfProcessToUse(item.planets) as unknown as ResultPlanets: [''];
    return {...item, species, starships, vehicles, characters, planets} as unknown as ResultFilms;
  };

  const processDetails = (data: ResultGroup[]): Promise<ResultGroup[]> => Promise.all(
    data.map(async item => {
      if (isResCharacter(item)) {
        return await processingToCharacters(item);
      } else if (isResSpecies(item)) {
        return await processingToSpecies(item);
      } else if (isResVehicles(item)) {
        return await processingToVehicles(item);
      } else if (isResStarships(item)) {
        return await processingToStarships(item);
      } else if (isResPlanets(item)) {
        return await processingToPlanets(item);
      } else if (isResFilms(item)) {
        return await processingToFilms(item);
      } else {
        return {
          created: '',
          edited: '',
          url: '',
        }
      }
    })
  );

  const getInfo = async <TypeRes extends ResponseGroup>(url: string): Promise<void> => {
    clearInfo();
    setIsLoading(true);
    const response = await gettingData<TypeRes>(url);
    const processedResult = await processDetails(response.results);
    const data = {...response, results: processedResult};
      saveDataPagination({count: data.count, next: data.next, previous: data.previous});
      data.results.map((result) => {
        const id = getId(result.url);
        saveInfo([{...result, id}] as unknown as D.StateGroup[]);  
      });
    setIsLoading(false);
  };

  return {getInfo, info};
};

export default useGettingInfo;
