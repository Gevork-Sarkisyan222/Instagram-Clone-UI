import React from 'react';
import './RandomPosts.scss';
import RandomCard from './RandomCard';
import axios from '../../axios';

interface PostType {
  id: string;
  imageUrl: string;
  likes: string[];
  comments: string[];
}

const RandomPosts: React.FC = () => {
  const [posts, setPosts] = React.useState<PostType[]>([]);

  React.useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/post/getAll');
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="RandomPosts-Wrapper">
      {posts.map((obj: any) => (
        <RandomCard
          key={obj._id}
          id={obj._id}
          imageUrl={obj.imageUrl}
          likes={obj.likes}
          comments={obj.comments}
        />
      ))}
    </div>
  );
};

export default RandomPosts;
