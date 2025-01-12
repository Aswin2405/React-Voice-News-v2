import './App.css';
import { useEffect, useState } from 'react';
import NewsDisplay from './components/NewsDisplay';
import axios from 'axios';
import alanBtn from '@alan-ai/alan-sdk-web';

function App() {
  const API_KEY = `d1012a32921c4917af09afae68dbd3fe`
  const API_Endpoint = `http://api.mediastack.com/v1/news`;
  const ALAN_SDK_Key = `1222910db44bc9ed1536d484d3298f122e956eca572e1d8b807a3e2338fdd0dc/stage`
  const [categories, setCategories] = useState('general');
  const [countries, setCountry] = useState('in')
  const [newsData, setNewsData] = useState([])
  const getNewsData = () => {
    axios.get(`${`http://api.mediastack.com/v1/news`}?access_key=${`d1012a32921c4917af09afae68dbd3fe`}&categories=${categories}&languages=en&countries=${countries}`)
      .then(response => {
        console.log(response.data,"dafa")
        setNewsData(response.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const categorySelect = (e) => {
    setCategories(e.target.value)
  }

  const countrySelect = (e) => {
    setCountry(e.target.value)
  }

  useEffect(() => {
    alanBtn({
      key: ALAN_SDK_Key,
      onCommand: (commandData) => {
        setCategories((commandData.data).toLowerCase());
      }
    });
  }, []);

  useEffect(() => {
    getNewsData();
  }, [categories, countries])
  return (
    <>
      <h1>GoodNews Voice</h1>
      <p className='app-description'>Press the Mic and Say Get the news from any category</p>
      <div className='category-filter'>
        <label for="category">Choose a Category</label>
        <select
          name="category"
          id="category"
          className='category-select'
          onChange={categorySelect}
        >
          <option value="general">General</option>
          <option value="business">Business</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
          <option value="sports">Sports</option>
          <option value="technology">Technology</option>
        </select>
      </div>
      <div className='category-filter'>
        <label for="category">Choose a Country</label>
        <select
          name="country"
          id="country"
          className='category-select'
          onChange={countrySelect}
        >
          <option value="in">India</option>
          <option value="us">United States</option>
          <option value="gb">United Kingdom</option>
          <option value="cn">China</option>
          <option value="hk">Hong-Kong</option>
          <option value="jp">Japan</option>
          <option value="tr">Turkey</option>
          <option value="ua">Ukraine</option>
        </select>
      </div>
      <NewsDisplay newsData={newsData} />

      {newsData.length === 0 ? (
        <h2 className='noNews'>No News Found</h2>
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
