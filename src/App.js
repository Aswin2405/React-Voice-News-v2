import './App.css';
import { useEffect, useState } from 'react';
import NewsDisplay from './components/NewsDisplay';
import axios from 'axios';
import alanBtn from '@alan-ai/alan-sdk-web';

function App() {
  const API_KEY = `e1ffa1530e8949ed49e888892e0d908d`
  const API_Endpoint = `http://api.mediastack.com/v1/news`;
  const ALAN_SDK_Key = `803072af320a4031d385ee5c9f9cbf5c2e956eca572e1d8b807a3e2338fdd0dc/stage`
  const [categories, setCategories] = useState('general')
  const [newsData, setNewsData] = useState([])
  const getNewsData = () => {
    axios.get(`${API_Endpoint}?access_key=${API_KEY}&categories=${categories}&languages=en`)
      .then(response => {
        setNewsData(response.data.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const categorySelect = (e) => {
    setCategories(e.target.value)
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
  }, [categories])
  return (
    <>
    <h1>GoodNews Voice</h1>
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
      <NewsDisplay newsData={newsData} />
    </>
  );
}

export default App;
