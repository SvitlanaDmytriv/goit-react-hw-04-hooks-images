import axios from 'axios';

const KEY = '23051678-b5ac65469c9e5d51c8f14a2a6';

function fetchImg(name = 'cat', page = 1) {
  return axios.get(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  );
}

export default fetchImg;
