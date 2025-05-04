import CreatePostCard from './components/CreatePostCard'
import styled from 'styled-components'

const AppWrapper = styled.div`
  padding: 2rem;
  font-family: "Inter", sans-serif;
`

export const App = () => {
  return (
    <AppWrapper>
      <CreatePostCard />
    </AppWrapper>
  )
}

export default App 