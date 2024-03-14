import React from 'react';

interface propsTypes {
    id: string;
    imageUrl: string;
    likes: string[];
    comments: string[];
}


const RandomPostsMobile: React.FC<propsTypes> = ({ id, imageUrl }) => {
    return (
        <div className='RandomPostsMobile'>
            <img src={imageUrl} alt={`post with id > ${id}`} />
        </div>
    )
}

export default RandomPostsMobile