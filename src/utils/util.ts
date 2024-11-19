
import {
  isArray, 
  isEmpty, 
  isNull, 
  isObject, 
  isUndefined} from "underscore";
import {
  MinimalResponse,
  ResultCharacter, 
  ResultFilms, 
  ResultGroup, 
  ResultPlanets, 
  ResultSpecies, 
  ResultStarships, 
  ResultVehicles
} from "@typings/service";
import {BASE_URL_IMG} from "@utils/constants";

import {Utils as U} from "@typings/utils";

export function isResCharacter(item: (ResultGroup | MinimalResponse) | (ResultGroup | MinimalResponse)[]): item is ResultCharacter | ResultCharacter[] {
  return isArray(item) 
    ? item.some((x) => 
        isObject(x)
          ? ('homeworld' in x) && ('films' in x) && ('species' in x) && ('starships' in x) && ('vehicles' in x)
          : false
      )
    : ('homeworld' in item) && ('films' in item) && ('species' in item) && ('starships' in item) && ('vehicles' in item);
}

export function isResSpecies(item: (ResultGroup | MinimalResponse) | (ResultGroup | MinimalResponse)[]): item is ResultSpecies | ResultSpecies[] {
  return isArray(item) 
    ? item.some((x) =>
        isObject(x)
          ? ('homeworld' in x) && ('films' in x) && !('species' in x) && !('starships' in x) && !('vehicles' in x)
          : false
      )
    : ('homeworld' in item) && ('films' in item) && !('species' in item) && !('starships' in item) && !('vehicles' in item);
}

export function isResVehicles(item: (ResultGroup | MinimalResponse) | (ResultGroup | MinimalResponse)[]): item is ResultVehicles | ResultVehicles[] {
  return isArray(item) 
    ? item.some((x) => 
        isObject(x)
          ? !('homeworld' in x) && ('films' in x) && !('species' in x) && !('starships' in x) && !('vehicles' in x) && ('vehicle_class' in x)
          : false
      )
    : !('homeworld' in item) && ('films' in item) && !('species' in item) && !('starships' in item) && !('vehicles' in item) && ('vehicle_class' in item);
}
export function isResStarships(item: (ResultGroup | MinimalResponse) | (ResultGroup | MinimalResponse)[]): item is ResultStarships | ResultStarships[] {
  return isArray(item) 
    ? item.some((x) =>
        isObject(x)
          ? !('homeworld' in x) && ('films' in x) && !('species' in x) && !('starships' in x) && !('vehicles' in x) && ('starship_class' in x)
          : false
      )
    : !('homeworld' in item) && ('films' in item) && !('species' in item) && !('starships' in item) && !('vehicles' in item) && ('starship_class' in item);
}

export function isResPlanets(item: (ResultGroup | MinimalResponse) | (ResultGroup | MinimalResponse)[]): item is ResultPlanets | ResultPlanets[] {
  return isArray(item)
    ? item.some((x) =>
        isObject(x)
          ? !('homeworld' in x) && ('films' in x) && !('species' in x) && !('starships' in x) && !('vehicles' in x) && ('gravity' in x)
          : false
      )
    : !('homeworld' in item) && ('films' in item) && !('species' in item) && !('starships' in item) && !('vehicles' in item) && ('gravity' in item);
}

export function isResFilms(item: (ResultGroup | MinimalResponse) | (ResultGroup | MinimalResponse)[]): item is ResultFilms | ResultFilms[] {
  return isArray(item) 
    ? item.some((x) => 
        isObject(x)
          ? !('homeworld' in x) && !('films' in x) && ('species' in x) && ('starships' in x) && ('vehicles' in x)
          : false
      )
    : !('homeworld' in item) && !('films' in item) && ('species' in item) && ('starships' in item) && ('vehicles' in item);
}

export const isUrlFilms = (x: string) => !!x.match(/\/api\/films\//);
export const isUrlPeople = (x: string) => !!x.match(/\/api\/people\//);
export const isUrlPlanets = (x: string) => !!x.match(/\/api\/planets\//);
export const isUrlSpecies = (x: string) => !!x.match(/\/api\/species\//);
export const isUrlStarShips = (x: string) => !!x.match(/\/api\/starships\//);
export const isUrlVehicles = (x: string) => !!x.match(/\/api\/vehicles\//);

export const getUrlPath = (x: string) => {
  const match = x.match(/\/(films|people|species|starships|planets|vehicles)?\/?/);
  const valueOfMatched = !isNull(match)? match[1]: undefined;
  return valueOfMatched;
};

export const getId: U.GetId = (url) => parseInt(url?.replace(/\D/g, ''), 10);

export const removeActiveClass = () => {
  document.querySelectorAll("nav a.active")?.forEach((item) => {
    item.classList.remove('active');
  });
};

export const addActiveClass: U.AddActiveClass = (index) => {
  const headerLinks = document.querySelectorAll("header nav.paginationNav a:not(.prevBtn):not(.nextBtn)");
  const footerLinks = document.querySelectorAll("footer nav.paginationNav a:not(.prevBtn):not(.nextBtn)");
  
  if (headerLinks.length > 0 && footerLinks.length > 0) {
    removeActiveClass();
    headerLinks[index].classList.add('active');
    footerLinks[index].classList.add('active');
  } else {
    setTimeout(() => addActiveClass(index), 1000);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasValue = (item: any): boolean => {
  return !isEmpty(item) && !isNull(item) && !isUndefined(item);
};

export const getIndexOfActiveInPagination: U.GetIndexOfActiveInPagination = () => {
  const headerLinks = document.querySelectorAll("header nav a:not(.prevBtn):not(.nextBtn)");
  let index = 0;
  headerLinks.forEach((v, i) => {
    index = v.classList.contains('active') ? i : index;
  });
  return index;
};

export const changeOpenNavigation = () => {
  document.querySelector('.openNav')?.classList.toggle('open');
  document.querySelector('.navigation')?.classList.toggle('open');
};

export const onChangeTheme: U.OnChangeTheme = (e) => {
  e.preventDefault();
  document.getElementsByTagName('html')[0].setAttribute('theme', e.target.value);
};

export const openFlip: U.OpenFlip = (e, id) => {
  e.preventDefault();

  const allFlipElements = document.querySelectorAll(`.flip-card .inner`);
  const currentElement = document.querySelector(`#${id} .flip-card .inner`);

  allFlipElements.forEach((item) => {
    item?.classList.remove('flip');
  });
  currentElement?.classList.add('flip');
};
export const closeFlip: U.CloseFlip = (e, id) => {
  e.preventDefault();

  const currentElement = document.querySelector(`#${id} .flip-card .inner`);

  currentElement?.classList.remove('flip');
};
export const onErrorImg: U.OnErrorImg = (e) => {
  e.currentTarget.src = `${BASE_URL_IMG}/placeholder.jpg`;
};