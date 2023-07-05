import React, { useState, useEffect, useParams} from 'react';
import NewsList from '../components/NewsList';

const NewsContainer = () => {

    const [storyIDs, setStoryIDs] = useState([]);
    const [storyDetails, setStoryDetails] = useState([]);
    const [textInput, setTextInput] = useState("");

    useEffect(() => {
      fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(res => res.json())
      .then(data => setStoryIDs(data));
    }, [])

    useEffect(() => {
        const storyPromises = storyIDs.slice(0, 10).map((storyID) => {
            console.log(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
            return (
                fetch(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
                .then(res => res.json())
            )
        })

        Promise.all(storyPromises).then((data) => {
            setStoryDetails(data)
        })
    }, [storyIDs])



  return (
    <>
    <h1>Hello NewsContainer</h1>
    <NewsList storyDetails={storyDetails} />
    </>
  )
}

export default NewsContainer