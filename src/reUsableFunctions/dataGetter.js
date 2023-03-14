import axios from "axios";
const fetchData = async (url, headers, params) => {
    try {
      const response = await axios.get(url, { headers, params });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export default fetchData