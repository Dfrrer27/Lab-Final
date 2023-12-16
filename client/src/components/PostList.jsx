// PostList.jsx

import { useState, useEffect } from 'react';

const PostList = ({ categoriaNombre }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = 'http://localhost:8000/canva/posts/';
        if (categoriaNombre) {
          url = `http://localhost:8000/canva/categoria/${categoriaNombre}/`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error al obtener los posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPosts();
  }, [categoriaNombre]);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id} className="card mb-4">
          <div className="card-body">
            <h2 className="card-title h4">{post.titulo}</h2>
            <p className="card-text">{post.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;