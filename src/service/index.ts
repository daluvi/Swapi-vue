
import axios from "axios";
// import fetchAdapter from "@shiroyasha9/axios-fetch-adapter";

import {BASE_URL} from "@utils/constants";

import {GettingData, ResponseGroup} from "@typings/service";


// const instance = axios.create({
//   adapter: fetchAdapter,
// });



const gettingData: GettingData = async <TypoRes>(param = BASE_URL, attempts = 0) => {
  return await axios.get(`${param}`).then(({data}: {data: TypoRes}) => {
    return data;
  })
  .catch(<TypoRes extends ResponseGroup>() => {
    return attempts < 5? 
      gettingData<TypoRes>(param, attempts + 1): 
      { count: 0,
        next: null,
        previous: null,
        results: [{
          created: '',
          edited: '',
          url: '',
        }]
      }
    });
};

export {
  gettingData
};