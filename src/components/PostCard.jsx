import styled from 'styled-components'
import PostCardLikes from './PostCardLikes'
import PostCardTime from './PostCardTime'
import PostCardMessage from './PostCardMessage'

const MenuTriggerContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 20;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0;
`;

const DropdownMenu = styled.div`
  position: absolute;
  left: ${({ $menuAbove, $menuLeft }) => $menuAbove ? 'auto' : ($menuLeft ? 'auto' : '3rem')};
  right: ${({ $menuAbove, $menuLeft }) => $menuAbove ? 0 : ($menuLeft ? '3rem' : 'auto')};
  top: ${({ $menuAbove }) => $menuAbove ? 'auto' : 0};
  bottom: ${({ $menuAbove }) => $menuAbove ? '2.2rem' : 'auto'};
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  z-index: 10;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  padding: 0.25rem 0;
  max-width: 220px;
  white-space: nowrap;
`;

const DropdownMenuItem = styled.button`
  background: none;
  border: none;
  padding: 0.5rem 1rem;
  text-align: left;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: inherit;

  &:hover {
    background: #f3f4f6;
  }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  min-width: 300px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
  @media (max-width: 480px) {
    width: 90vw;
  }
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const CancelButton = styled.button`
  background: rgb(215,215,215);
  color: black;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const PostCardStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 700px;
  justify-self: center;
  background-color: white;
  color: black;
  border: 1px solid black;
  border-radius: 2px;
  padding: 1rem;
  margin: 2rem;
  box-shadow: 10px 10px 0px 0px rgba(0,0,0,1);
  position: relative;
`

const PostCardInfoStyled = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.25rem 0 0.5rem 0;
`

import { useState } from 'react';
import EditPostModal from './EditPostModal';

import { useEffect, useRef } from 'react';

const PostCard = ({ id, message, likes, time, userId, postUserId, onDelete, onEdit }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuLeft, setMenuLeft] = useState(false); 
  const [menuAbove, setMenuAbove] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const menuRef = useRef(null);
  const menuBtnRef = useRef(null);


  useEffect(() => {
    if (showMenu && menuBtnRef.current) {
      const btnRect = menuBtnRef.current.getBoundingClientRect();
      const menuWidth = 160;
      const isMobile = window.innerWidth <= 600;
      if (isMobile) {
        setMenuAbove(true);
        setMenuLeft(false);
      } else {
        setMenuAbove(false);
        const spaceRight = window.innerWidth - btnRect.right;
        setMenuLeft(spaceRight < menuWidth);
      }
    }
  }, [showMenu]);


  useEffect(() => {
    if (!showMenu) return;
    function handleClick(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        menuBtnRef.current &&
        !menuBtnRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showMenu]);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    onDelete(id);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };


  const handleEdit = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => setShowEditModal(false);

  const canEditOrDelete = userId === postUserId;

  return (
    <PostCardStyled>
      <PostCardMessage message={message} />
      <PostCardInfoStyled>
        <PostCardLikes likes={likes} postId={id} userId={userId} />
        <PostCardTime time={time} />
        {canEditOrDelete && (
  <MenuTriggerContainer>
    <MenuButton
      ref={menuBtnRef}
      aria-label="Show more options"
      title="More"
      onClick={e => {
        e.stopPropagation();
        setShowMenu((prev) => !prev);
      }}
    >
      &#x22EE;
    </MenuButton>
    {showMenu && (
      <DropdownMenu
        ref={menuRef}
        $menuAbove={menuAbove}
        $menuLeft={menuLeft}
        tabIndex={-1}
      >
        <DropdownMenuItem
          onClick={() => {
            setShowMenu(false);
            handleEdit();
          }}
        >
          <span role="img" aria-label="Edit">✏️</span> Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setShowMenu(false);
            handleDelete();
          }}
        >
          <span role="img" aria-label="Delete">🗑️</span> Delete
        </DropdownMenuItem>
      </DropdownMenu>
    )}
  </MenuTriggerContainer>
)}
      </PostCardInfoStyled>
      {showEditModal && (
  <ModalBackdrop>
    <ModalContent>
      <ModalTitle>Edit Post</ModalTitle>
      <EditPostModal
        currentMessage={message}
        postId={id}
        onEdit={onEdit}
        onClose={closeEditModal}
      />
    </ModalContent>
  </ModalBackdrop>
)}
      {showDeleteModal && (
        <ModalBackdrop>
          <ModalContent>
            <ModalTitle>Delete Post</ModalTitle>
            <p>Are you sure you want to delete this post?</p>
            <ButtonRow>
  <CancelButton onClick={cancelDelete}>Cancel</CancelButton>
  <DeleteButton onClick={confirmDelete}>Delete</DeleteButton>
</ButtonRow> 
          </ModalContent>
        </ModalBackdrop>
      )}
    </PostCardStyled>
  );
}

export default PostCard