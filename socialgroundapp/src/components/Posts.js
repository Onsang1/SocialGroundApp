import Post from './Post';
import React from 'react';


const Posts = ({posts}) => {

  return (
    <div className="posts">
      {posts.map(post => (
        <article className="post-box" key={post.id} >
          <Post post = {post}/>
        </article>
      ))}
    </div>
  );

}
 
export default Posts;