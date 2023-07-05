import React from 'react';
import NewsItem from './NewsItem';

const NewsList = ({storyDetails}) => {
    console.log(storyDetails);
    const storyNodes = storyDetails.map((story) => {
            return ( 
                <li><NewsItem key={story.id} story={story} /> </li>
            )
        
    })

  return (

    <ul>
        {storyNodes}
    </ul>

  )
}

export default NewsList;