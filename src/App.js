import './App.css';
import logo from './images/hlogo.png';
import React, { useEffect, useState } from 'react';
import PostList from './PostList';
import PostFilter from './PostFilter';
import CreatePost from './CreatePost';
import EventButton from './EventButton';


const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://654166c1f0b8287df1fe51c2.mockapi.io/hobby')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
        setFilteredPosts(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);


  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState(['Crafts', 'Outdoor', 'Technology', 'Cooking']); // Example categories

  const addNewPost = (newPost) => {
    fetch('https://654166c1f0b8287df1fe51c2.mockapi.io/hobby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })
      .then(response => response.json())
      .then(data => {
        setPosts(prevPosts => [data, ...prevPosts]);
        setFilteredPosts(prevFilteredPosts => [data, ...prevFilteredPosts]);
      })
      .catch(error => console.error('Error:', error));
  };


  const filterPosts = (category) => {
    if (!category || category === '') {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post => post.category === category);
      setFilteredPosts(filtered);
    }
  };

  return (
    <div>
      <header>
        <img className="logo" src={logo} alt="Home Page" />
        <PostFilter categories={categories} filterPosts={filterPosts} />
        <EventButton />


      </header>
      <hr className="hrStyle" />

      <CreatePost addNewPost={addNewPost} categories={categories} />
      <PostList posts={filteredPosts} />
      <footer>
        <p> Hobby Hut &copy; 2023</p>
      </footer>
    </div>
  );
};

export default App;