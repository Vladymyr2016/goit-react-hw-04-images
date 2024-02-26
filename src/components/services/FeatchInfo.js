import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '42040031-47a3b216d4f97a43df3da958a';

const FeatchInfo = async (q, page) => {
  console.log(q);
  const { data } = await axios.get('', {
    params: {
      q,
      page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return data;
};

export default FeatchInfo;
