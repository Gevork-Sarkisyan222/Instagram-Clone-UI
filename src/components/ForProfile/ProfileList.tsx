import * as React from 'react';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Stack from '@mui/joy/Stack';
import './forProfile.scss';
import ButtonText from '@mui/material/Button';
import CreatePostModal from '@mui/material/Modal';
import PostModal from '.././PostModal/PostModal';

// cards
import LikeCard from './LikeCard';
import SaveCard from './SaveCard';
import { useSelector } from 'react-redux';
import axios from '../../axios';
import CreatedCard from './CreatedCard';

type User = {
  _id: string;
  userName: string;
  avatarUrl?: string;
  checkMark: boolean
};

export interface ArraysTypes {
  _id: string;
  user: User;
  desc: string;
  imageUrl: string;
  createdAt: string;
}

export interface CreatedPostType {
  id: string;
  imageUrl: string;
  likes: string[];
  commetns: string[];
  desc: string;
  tags: string;
}

function ProfileList() {
  const { currentUser } = useSelector((state: any) => state.user);
  const [type, setType] = React.useState<string | undefined>('posts');

  // for post modal
  const [openPostModal, setOpenPostModal] = React.useState(false);
  const handleOpenPostModal = () => setOpenPostModal(true);
  const handleClosePostModal = () => setOpenPostModal(false);

  const [likedPosts, setLikedPosts] = React.useState<ArraysTypes[]>([]);
  const [savedPosts, setSavedPosts] = React.useState<ArraysTypes[]>([]);

  React.useEffect(() => {
    const fetchLikedPosts = async () => {
      const res = await axios.get(`/post/get/users/liked/posts/${currentUser._id}`);
      setLikedPosts(res.data);
    };
    fetchLikedPosts();
  }, []);

  React.useEffect(() => {
    const fetchSavedPosts = async () => {
      const res = await axios.get(`/post/get/users/saved/posts/${currentUser._id}`);
      setSavedPosts(res.data);
    };
    fetchSavedPosts();
  }, []);

  console.log('saved posts', savedPosts)

  // created posts
  const [createdPosts, setCreatedPosts] = React.useState<CreatedPostType[]>([]);
  console.log('created Posts', createdPosts);

  React.useEffect(() => {
    const fetchCreatedPosts = async () => {
      const res = await axios.get(`/post/get/users/created/posts/${currentUser._id}`);
      setCreatedPosts(res.data);
    };
    fetchCreatedPosts();
  });

  return (
    <>
      <CreatePostModal
        open={openPostModal}
        onClose={handleClosePostModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <PostModal handleClosePostModal={handleClosePostModal} />
      </CreatePostModal>
      <Stack spacing={2}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup
            value={type}
            onChange={(event, newValue) => setType(newValue || undefined)}>
            <Button value="posts">ПУБЛИКАЦИИ</Button>
            <Button value="liked">ЛАЙКНУТЫЕ</Button>
            <Button value="saved">СОХРАНЕННОЕ</Button>
          </ToggleButtonGroup>
        </div>

        {type === 'posts' && (
          <List marker={'posts'}>
            <List marker="circle">
              {createdPosts.length === 0 ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                  }}>
                  <h1 className="share-text">Поделиться фото</h1>
                  <p>Фото, которыми вы делитесь, будут показываться в вашем профиле.</p>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <ButtonText
                      onClick={handleOpenPostModal}
                      variant="text"
                      sx={{ width: '275px' }}>
                      <span>Поделись своим первым фото</span>
                    </ButtonText>
                  </div>
                </div>
              ) : (
                <div className="wrapper-createdCards">
                  {createdPosts.map((obj: any) => (
                    <CreatedCard
                      key={obj._id}
                      id={obj._id}
                      imageUrl={obj.imageUrl}
                      likes={obj.likes}
                      comments={obj.comments}
                      desc={obj.desc}
                      tags={obj.tags}
                    />
                  ))}
                </div>
              )}
            </List>
          </List>
        )}

        {type === 'liked' && (
          <List marker={'liked'}>
            <List marker="circle">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  textAlign: 'center',
                }}>
                <div>
                  <h1>Лайкнутые посты</h1>
                  <p>Вот ваша подборка</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div
                      style={{
                        display: 'flex',
                        gap: '67px',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                      }}>
                      {likedPosts.length === 0 ? (
                        <div>
                          <h1>которая пустая</h1>
                        </div>
                      ) : (
                        likedPosts.map((obj) => (
                          <LikeCard
                            key={obj._id}
                            id={obj._id}
                            user={obj.user}
                            imageUrl={obj.imageUrl}
                            createdAt={obj.createdAt}
                            desc={obj.desc}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </List>
          </List>
        )}

        {type === 'saved' && (
          <List marker={'saved'}>
            <List marker="circle">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  textAlign: 'center',
                }}>
                <div>
                  <h1>Сохраненные посты</h1>
                  <p>Вот ваша подборка</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div
                      style={{
                        display: 'flex',
                        gap: '67px',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                      }}>
                      {likedPosts.length === 0 ? (
                        <div>
                          <h1>которая пустая</h1>
                        </div>
                      ) : (
                        savedPosts.map((obj) => (
                          <SaveCard
                            key={obj._id}
                            id={obj._id}
                            user={obj.user}
                            imageUrl={obj.imageUrl}
                            createdAt={obj.createdAt}
                            desc={obj.desc}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </List>
          </List>
        )}
      </Stack>
    </>
  );
}

export default ProfileList;
