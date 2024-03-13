import React from 'react';
import './mobile.scss'
import RandomPosts from '../../components/RandomPosts/RandomPosts';

const ExploreMobile: React.FC = () => {


    return (
        <div className='ExploreMobile-Main'>
            <h1>Публикации</h1>

            <div className='posts-mobile-wrapper'>
                <RandomPosts />
            </div>
        </div>
    )
}

export default ExploreMobile