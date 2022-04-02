import React from 'react';
import moment from 'moment';
import NoImage from '../assets/noImage.png';

export default function NewsDisplay({
  newsData
}) {
  return (
    <div>
      {newsData.map((news) => {
        return (
          <div className='news-container news-data'>
            <div>
              <div className='news-col'>
                <p className='text-capitalize'>{news.source}</p>
                <p>{moment(news.published_at).format('LLL')}</p>
              </div>

              <h3>{news.title}</h3>

              <p>{news.description}</p>
              <div className='news-col text-capitalize'>
                <p>Author: {news.author}</p>
                <p>Category: {news.category}</p>
              </div>
            </div>
            <div>
              <img className='news-image' src={news.image ? news.image : NoImage} alt='image' />
            </div>
          </div>
        )
      })}
    </div>
  )
}
