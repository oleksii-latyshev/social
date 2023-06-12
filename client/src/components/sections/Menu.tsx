import React from 'react';
import { NavLink } from 'react-router-dom';

import friendsIcon from '@/assets/icons/friends.svg';
import homeIcon from '@/assets/icons/home.svg';
import messageIcon from '@/assets/icons/message.svg';
import Typography from '@/components/ui/Typography';

const links = [
  { name: 'Home', img: homeIcon, link: '/' },
  { name: 'Messages', img: messageIcon, link: '/messages' },
  { name: 'Friends', img: friendsIcon, link: '/friends' },
];

const Menu: React.FC = () => {
  const menuComponents = links.map(({ name, img, link }) => {
    return (
      <li>
        <NavLink
          to={link}
          className={({ isActive }) =>
            `flex w-full flex-row items-center gap-2 border-l-4 p-2 ${
              isActive ? 'border-l-activity text-activity' : 'border-l-transparent'
            }`
          }
        >
          <img src={img} alt={name} className='h-12' />
          <Typography component='span' variant='title-2'>
            {name}
          </Typography>
        </NavLink>
      </li>
    );
  });

  return (
    <nav className='rounded bg-light-bg-content p-4'>
      <ul>{menuComponents}</ul>
    </nav>
  );
};

export default Menu;