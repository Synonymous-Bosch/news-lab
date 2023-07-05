import React from 'react';

const NewsItem = ({story}) => {
  return (
    <a href={story.url}>{story.title}</a>
  )
}

export default NewsItem;