import React from 'react';
import '../App.scss';
import Avatar from '@mui/material/Avatar';
import PostCard from '../components/PostCard/PostCard';
import RightPanel from '../components/Right-Panel/RightPanel';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isAuthenticated } from '../redux/slices/user.slice';
import ErrorToLogin from '../components/ErrorToLogin';
import axios from '.././axios';

type UserType = {
  avatarUrl?: string;
  userName: string;
};

interface Post {
  _id: string;
  imageUrl: string;
  desc: string;
  tags: string[];
  likes: string[];
  saves: string[];
  viewers: number;
  createdAt: string;
  user: UserType;
}

export type UserTypeForResponese = {
  _id: string;
  userName: string;
  avatarUrl: string;
};

const Home: React.FC = () => {
  const isAuthenticatedUser = useSelector(isAuthenticated);
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [yourSubscribed, setYourSubscribed] = React.useState<UserTypeForResponese[]>([]);
  const { currentUser } = useSelector((state: any) => state.user);

  React.useEffect(() => {
    const fetchYourSubedUsers = async () => {
      if (currentUser._id) {
        const res = await axios.get(`user/subscribed/list/${currentUser?._id}`);
        setYourSubscribed(res.data);
      }
    };
    fetchYourSubedUsers();
  }, []);

  React.useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/post/getAll');
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  if (isAuthenticatedUser) {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ position: 'absolute' }}>
            <RightPanel />
          </div>
        </div>
        <div className="main">
          <div className="high-section">
            <div className="accaunts">
              {/* 9 avatars */}
              {yourSubscribed.map((obj) => (
                <Link key={obj._id} to={`/profile/${obj?._id}`}>
                  <Avatar
                    sx={{ width: '56px', height: '56px', cursor: 'pointer' }}
                    alt={obj?.userName}
                    src={obj?.avatarUrl}
                  />
                </Link>
              ))}
            </div>
          </div>
          <div className="posts-section">
            {posts.map((obj: any) => (
              <PostCard
                key={obj._id}
                id={obj._id}
                imageUrl={obj.imageUrl}
                desc={obj.desc}
                tags={obj.tags}
                likes={obj.likes}
                saves={obj.saves}
                viewers={obj.viewers}
                createdAt={obj.createdAt}
                user={obj.user}
                checkMark={obj.checkMark}
              />
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return <ErrorToLogin />;
  }
};

export default Home;
