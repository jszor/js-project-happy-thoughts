import { useState, useEffect } from 'react'
import CreatePostCard from '../components/CreatePostCard'
import PostCard from '../components/PostCard'
import styled from 'styled-components'

const AppWrapper = styled.div`
  padding: 2rem;
  font-family: "Inter", sans-serif;
  background: linear-gradient(135deg,rgb(227, 251, 253) 0%,rgb(166, 198, 254) 100%);
`

const PostWrapper = styled.div`
  margin-top: 1rem;
`

const LoadingStyled = styled.p`
  text-align: center;
  margin: 3rem;
`

const TitleStyled = styled.h1`
  text-align: center;
  margin: 1rem 0 3rem 0;
`

export const App = () => {

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const url = 'https://js-project-api-4xto.onrender.com/thoughts';
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await res.json();
      setPosts(
        data.response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
        console.error('Error fetching posts:', err)
    } finally {
        setLoading(false);
    }
  }

  useEffect(()=> {
    fetchPosts();
  }, [])

  // Delete post handler
  const handleDeletePost = async (postId) => {
    try {
      const url = `https://js-project-api-4xto.onrender.com/thoughts/${postId}`;
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error('Failed to delete post');
      }
      setPosts(posts => posts.filter(post => post._id !== postId));
    } catch (err) {
      alert('Error deleting post: ' + err.message);
    }
  };

  // Edit post handler
  const handleEditPost = async (postId, newMessage, onSuccess) => {
    try {
      const url = `https://js-project-api-4xto.onrender.com/thoughts/${postId}`;
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ updatedMessage: newMessage })
      });
      if (!res.ok) {
        throw new Error('Failed to edit post');
      }
      const data = await res.json();
      setPosts(posts => posts.map(post => post._id === postId ? { ...post, message: data.response.message } : post));
      if (onSuccess) onSuccess();
    } catch (err) {
      alert('Error editing post: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message.trim() === '') return

    try {
      const url = 'https://js-project-api-4xto.onrender.com/thoughts';
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
         },
        body: JSON.stringify({ message })
      });

      if (!res.ok) {
        throw new Error('Failed to post message')
      }

      const result = await res.json()
      
      setPosts([result.response, ...posts]);
      setMessage('');

    } catch (err) {
      console.error('Error posting message:', err);
    }
  }

  return (
    <AppWrapper>
      <TitleStyled>Happy Thoughts</TitleStyled>
      <CreatePostCard
      message={message} 
      setMessage={setMessage} 
      onSubmit={handleSubmit} 
      />
      <PostWrapper>
        {loading ? (
          <LoadingStyled>Loading happy thoughts...</LoadingStyled>
        ) : (
          posts.map(post => (
            <PostCard
              key={post._id}
              id={post._id}
              message={post.message}
              likes={post.likes}
              time={new Date(post.createdAt).toLocaleString()}
              userId={localStorage.getItem('userId')}
              postUserId={post.userId}
              onDelete={handleDeletePost}
              onEdit={handleEditPost}
            />
          ))
        )}
      </PostWrapper>
    </AppWrapper>
  )
}

export default App