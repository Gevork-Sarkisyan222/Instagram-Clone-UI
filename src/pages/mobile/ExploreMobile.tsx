import React from 'react';
import './mobile.scss'
import RandomPosts from '../../components/RandomPosts/RandomPosts'
import RandomPostsMobile from './RandomPostsMobile';
import axios from '../../axios'

interface PostType {
    id: string;
    imageUrl: string;
    likes: string[];
    desc: string;
    tags: string
}


const ExploreMobile: React.FC = () => {
    const [posts, setPosts] = React.useState<PostType[]>([]);

    React.useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/post/getAll');
            setPosts(res.data);
        };
        fetchPosts();
    }, []);


    return (
        <div className='ExploreMobile-Main'>
            <h1>Публикации</h1>

            <div className='posts-mobile-wrapper'>
                {posts.map((obj: any) => (
                    <RandomPostsMobile
                        key={obj._id}
                        id={obj._id}
                        imageUrl={obj.imageUrl}
                        likes={obj.likes}
                        desc={obj.desc}
                        tags={obj.tags}
                        createdAt={obj.createdAt}
                        user={obj.user}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExploreMobile