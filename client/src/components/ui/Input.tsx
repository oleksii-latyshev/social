import React from 'react';

import Typography from './Typography';

interface InputProps {
  name: string;
  error?: string;
  optionals?: object;
  children: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ name, error, optionals, children, placeholder }) => {
  return (
    <label htmlFor={name} className=' cursor-pointer'>
      <Typography component='h2' variant='title-1' className='pl-2'>
        {children}
      </Typography>
      <input
        {...optionals}
        placeholder={placeholder}
        name={name}
        id={name}
        className='w-full cursor-pointer rounded border-2 border-transparent bg-input p-2 transition-all hover:border-primary focus:border-primary focus:outline-none active:border-primary'
      />
      {error && (
        <Typography
          component='span'
          variant='description'
          className='pl-2 font-bold text-red-700'
        >
          {error}
        </Typography>
      )}
    </label>
  );
};

export default Input;
