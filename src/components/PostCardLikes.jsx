import styled from 'styled-components'
import { useState } from 'react'

const HeartStyled = styled.span`
  background-color: ${({ liked }) => liked ? '#FFADAD' : '#EAEAEA'};
  border: none;
  border-radius: 50%;
  padding: 0.625rem;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
  cursor: pointer;
`

const LikesStyled = styled.span`
  color: #B1B1B1;
  font-size: 0.75rem;
  margin-left: 0.25rem;
`

const PostCardLikes = ({ likes: initialLikes, postId, userId }) => {
  const [likes, setLikes] = useState(initialLikes);

  // Determine if the current user has liked this post
  const liked = likes.includes(userId);

  const handleLike = async () => {
    try {
      const url = `https://js-project-api-4xto.onrender.com/thoughts/${postId}/likes`;
      const token = localStorage.getItem('token');
      const res = await fetch(url, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error('Failed to like/unlike post');
      }
      const data = await res.json();
      // Update likes from backend response
      setLikes(data.response.likes);
    } catch (err) {
      console.error('Error liking/unliking post:', err);
    }
  };

  return (
    <div>
      <HeartStyled liked={liked} onClick={handleLike}>❤️</HeartStyled>
      <LikesStyled>x {likes.length}</LikesStyled>
    </div>
  );
}


export default PostCardLikes