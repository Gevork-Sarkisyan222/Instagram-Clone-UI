import React from 'react';
import './Explore.scss';
import RandomPosts from '../../components/RandomPosts/RandomPosts';
import { useSelector, useDispatch } from 'react-redux';
import FullPost from '../../components/FullPost/FullPost';
import { setOpenFullPost } from '../../redux/slices/openFullPost';
import { isAuthenticated } from '../../redux/slices/user.slice';
import ErrorToLogin from '../../components/ErrorToLogin';

function Explore() {
  const { openFullPost } = useSelector((state: any) => state.openFullPost);
  const isAuthenticatedUser = useSelector(isAuthenticated);

  if (isAuthenticatedUser) {
    return (
      <>
        {openFullPost && <FullPost />}
        <div className="Explore-Wrapper">
          <RandomPosts />
        </div>
      </>
    );
  } else {
    return <ErrorToLogin />;
  }
}

export default Explore;
