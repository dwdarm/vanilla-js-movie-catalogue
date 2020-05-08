import buildUrl from 'build-url';
import { BASE_URL, API_KEY } from './config';

const discover = (params = {}) => {
  return fetch(buildUrl(BASE_URL , {
    path: 'discover/movie',
    queryParams: { ...params, api_key: API_KEY }
  }));
}

export default discover;
