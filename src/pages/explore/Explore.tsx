import React from 'react';
import './Explore.scss';
import RandomPosts from '../../components/RandomPosts/RandomPosts';
import { useSelector, useDispatch } from 'react-redux';
import FullPost from '../../components/FullPost/FullPost';
import { setOpenFullPost } from '../../redux/slices/openFullPost';
import { isAuthenticated } from '../../redux/slices/user.slice';
import ErrorToLogin from '../../components/ErrorToLogin';
import { useMediaQuery } from '@mui/material'
import ExploreMobile from '../mobile/ExploreMobile';


function Explore() {
  const { openFullPost } = useSelector((state: any) => state.openFullPost);
  const isAuthenticatedUser = useSelector(isAuthenticated);
  const isMobileScreen = useMediaQuery('(max-width:600px)');


  if (isAuthenticatedUser) {
    return isMobileScreen ? (<ExploreMobile />) : (
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
