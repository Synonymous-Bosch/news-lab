import React, { useState, useEffect, useParams} from 'react';
import NewsList from '../components/NewsList';

const NewsContainer = () => {

    const [storyIDs, setStoryIDs] = useState([]);
    const [storyDetails, setStoryDetails] = useState([]);
    const [filteredStories, setFilteredStories] = useState([]);
    const [textInput, setTextInput] = useState("");

    useEffect(() => {
      fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(res => res.json())
      .then(data => setStoryIDs(data));
    }, [])

    useEffect(() => {
        const storyPromises = storyIDs.map((storyID) => {
            console.log(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
            return (
                fetch(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
                .then(res => res.json())
            )
        })

        Promise.all(storyPromises).then((data) => {
            const filteredData = data.filter( story => story.url)
            setStoryDetails(data);
            setFilteredStories(filteredData);
        })
    }, [storyIDs])

    const handleChange = (event) => {
      setTextInput(event.target.value)
    }

    useEffect(() => {
      const filteredStories = storyDetails.filter((story) => {
        return (story.title.toLowerCase().includes(textInput.toLowerCase())) 
      })
      setFilteredStories(filteredStories);
    }, [textInput])



  return (
    <>
    <label>Search for articles including: </label>
    <input type="text" onChange={handleChange} ></input>
    <p>Number of articles with term: {filteredStories.length}</p>
    <h1>Top Stories</h1>
    <NewsList storyDetails={filteredStories} />
    </>
  )
}

export default NewsContainer