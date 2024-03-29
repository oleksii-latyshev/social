import React, { ReactNode, useEffect, useRef } from 'react';

import Typography from '@/components/ui/Typography';
import { cn } from '@/utils/cn';

interface InputProps {
  id?: string;
  name: string;
  error?: string;
  value?: string;
  optionals?: object;
  children?: ReactNode;
  placeholder?: string;
  className?: string;
  defaultValue?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  focus?: boolean;
  required?: boolean;
  type?: string;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  error,
  optionals,
  children,
  placeholder,
  value,
  className,
  defaultValue,
  onChange,
  focus = false,
  required = false,
  type = 'text',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focus && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focus]);

  return (
    <label htmlFor={id ?? name} className={cn('w-full cursor-pointer', className)}>
      <Typography component='h2' variant='title-1' className='pl-2'>
        {children}
        {required && <span className='pl-1 font-bold text-red-700'>*</span>}
      </Typography>
      <input
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        defaultValue={defaultValue}
        name={name}
        id={id ?? name}
        onChange={onChange}
        type={type}
        {...optionals}
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
