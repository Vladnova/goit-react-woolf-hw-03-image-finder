import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const MY_KEY = '19870120-8ec79e7454f8912b12bef551c';
axios.defaults.params = {
  key: MY_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const getImg = async (search, page) => {
  try {
    const { data } = await axios(`?q=${search}&page=${page}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
