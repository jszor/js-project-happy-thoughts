import styled from 'styled-components'
import PostCardLikes from './PostCardLikes'
import PostCardTime from './PostCardTime'
import PostCardMessage from './PostCardMessage'

const PostCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 2px;
  padding: 1rem;
  box-shadow: 10px 10px 0px 0px rgba(0,0,0,1);
`

const PostCardInfoStyled = styled.div`
  display: flex;
  justify-content: space-between;
`

const PostCard = ({ message, likes, time }) => {
  return (
    <PostCardStyled>
      <PostCardMessage message={message} />
      <PostCardInfoStyled>
        <PostCardLikes likes={likes} /> 
        <PostCardTime time={time} />
      </PostCardInfoStyled>
    </PostCardStyled>
  )
}

export default PostCard