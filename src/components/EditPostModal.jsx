import { useState } from 'react';
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 1rem;
`;

const StyledTextarea = styled.textarea`
  resize: none;
  padding: 0.5rem;
  font-family: "Inter", sans-serif;
  font-size: 1rem;
  min-height: 4rem;
`;

const ErrorText = styled.div`
  color: red;
  font-size: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const SaveButton = styled.button`
  background:rgb(255, 220, 19);
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
`;

const CancelButton = styled.button`
  background:rgb(215, 215, 215);
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: ${({ $loading }) => ($loading ? 'not-allowed' : 'pointer')};
`

const EditPostModal = ({ currentMessage, postId, onEdit, onClose }) => {
  const [message, setMessage] = useState(currentMessage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    if (!message.trim() || message === currentMessage) return;
    setLoading(true);
    setError('');
    try {
      await onEdit(postId, message, onClose);
    } catch (err) {
      setError('Failed to update post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledForm onSubmit={handleSave}>
      <StyledTextarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        minLength={5}
        maxLength={140}
        rows={4}
        disabled={loading}
      />
      {error && <ErrorText>{error}</ErrorText>}
      <ButtonRow>
        <CancelButton type="button" onClick={onClose} disabled={loading}>Cancel</CancelButton>
        <SaveButton
          type="submit"
          disabled={loading || !message.trim() || message === currentMessage}
          $loading={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </SaveButton>
      </ButtonRow>
    </StyledForm>
  );
};

export default EditPostModal;
