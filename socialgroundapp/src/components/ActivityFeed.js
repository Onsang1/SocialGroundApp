import React from "react";
import "../style/Feed.css";
import Navbar from "./Navbar";
import Posts from "./Posts";
import useFetch from "../fetcher/useFetch";



function Feed() {

  const { error, isLoading, data: posts } = useFetch('http://localhost:8000/posts')

  return (

    <div className = "Feed">
      <Navbar/>
      <section>

          { error && <div>{ error }</div> }
          { isLoading && <div>Loading...</div> }
          { posts && <Posts posts={posts} /> }
      </section>
    </div >
  
    );
  }


  export default Feed;