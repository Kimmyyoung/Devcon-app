import { useEffect, useState } from 'react';
import axios from 'axios';
import { RAPID_API_KEY } from '@env';

const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query)=>{
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(()=>{
  //   fetch(url)
  //   .then(res => res.json())
  //   .then(data => {
  //     setData(data)
  //   })
  //   .catch(error => {
  //     setError(error);
  //   })
  // },[url]);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': rapidApiKey,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    },
    params: {...query},
  };

  const fetchData= async()=>{
    setIsLoading(true);

    try{
      const res = await axios.request(options);
      setData(res.data.data);
      setIsLoading(false);
    }catch(error){
      setError(error)
      alert('Threr is an error');
    }finally {
      setIsLoading(false);
    }
    //finally : either way 'success' and 'error', run the code
  }

  useEffect(()=>{
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  return { data, isLoading, error, refetch };
}

export default useFetch;
