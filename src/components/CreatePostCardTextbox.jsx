import styled from 'styled-components'

const TextareaStyled = styled.textarea`
  resize: none;
  margin: 1rem 0 1rem 0;
  padding: 1rem;
`

const CreatePostCardTextbox = () => {
  return (
    <>
      <label for="happy-thoughts">
        What's making you happy right now?
      </label>
      <TextareaStyled 
        name="happy-thought" 
        id="happy-thoughts"
        placeholder="Your thoughts here..."
        rows="3"
      ></TextareaStyled>
    </>
  )
}

export default CreatePostCardTextbox