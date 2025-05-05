import CreatePostCard from './components/CreatePostCard'
import PostCard from './components/PostCard'
import styled from 'styled-components'

const AppWrapper = styled.div`
  padding: 2rem;
  font-family: "Inter", sans-serif;
`

const PostWrapper = styled.div`
  margin-top: 1rem;
`

export const App = () => {
  return (
    <AppWrapper>
      <CreatePostCard />
      <PostWrapper>
        <PostCard message="I'm happy because we just moved into a new apartment!" likes="0" time="30 seconds ago" />
        <PostCard message="It's my birthday!" likes="10" time="10 minutes ago" />
        <PostCard message="I'm happy because the sun is out :)" likes="23" time="15 minutes ago" />
      </PostWrapper>
    </AppWrapper>
  )
}

export default App 