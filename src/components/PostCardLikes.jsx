import styled from 'styled-components'

const HeartStyled = styled.span`
  background-color: #EAEAEA;
  border: none;
  border-radius: 50%;
  padding: 0.625rem;
  text-align: center;
  text-decoration: none;
  font-size: 1rem;
`

const LikesStyled = styled.span`
  color: #B1B1B1;
  font-size: 0.75rem;
  margin-left: 0.25rem;
`

const PostCardLikes = ({ likes }) => {
  return (
    <div>
      <HeartStyled>❤️</HeartStyled>
      <LikesStyled>x {likes}</LikesStyled>
    </div>
  )
}

export default PostCardLikes