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

const PostCardLikes = ({ likes }) => {

  const [liked, setLiked] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
  }
  return (
    <div>
      <HeartStyled liked={liked} onClick={handleLike}>❤️</HeartStyled>
      <LikesStyled>x {likes}</LikesStyled>
    </div>
  )
}

export default PostCardLikes