import React from 'react';
import { Link } from 'react-router-dom';

import Card from '@/components/ui/Card';
import Thumbnail from '@/components/ui/Thumbnail';
import Time from '@/components/ui/Time';
import Typography from '@/components/ui/Typography';
import { ResponsePost } from '@/types/post.types';

import PostItemMenu from './PostItemMenu';

const PostItem: React.FC<ResponsePost> = ({
  id,
  createdAt,
  img,
  text,
  updatedAt,
  userId,
  viewsCount,
  user,
  tags,
  likedBy,
}) => {
  return (
    <li>
      <Card className='flex flex-col gap-2 '>
        <Link to={`/${user.login}`} className='flex gap-2 hover:opacity-80'>
          <div className='w-20'>
            <Thumbnail imgURL={user.img} alt={user.login} />
          </div>
          <div className='flex flex-col justify-center'>
            <Typography component='h3' variant='title-1'>
              {user.name}
            </Typography>
            {createdAt && <Time time={new Date(createdAt)}>created at:</Time>}
            {updatedAt && <Time time={new Date(updatedAt)}>updated at:</Time>}
          </div>
        </Link>
        {img && (
          <div className='h-96 cursor-pointer bg-black'>
            <img src={img} alt={user.login} className='mx-auto h-full object-cover' />
          </div>
        )}
        <Typography component='p' variant='text'>
          {text}
        </Typography>
        <PostItemMenu id={id} likedBy={likedBy} />
      </Card>
    </li>
  );
};

export default PostItem;
