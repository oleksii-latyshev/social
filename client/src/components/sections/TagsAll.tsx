import { FC, useEffect, useState } from 'react';

import Alert from '@/components/ui/Alert';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Typography from '@/components/ui/Typography';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useInputDebounce } from '@/hooks/useInputDebounce';
import { useGetAllTagsQuery } from '@/services/tags.service';
import { addTag } from '@/store/slices/options.slice';
import { Tag } from '@/types/tag.types';

import Pagination from './Pagination';
import Tags from './Tags';

const TagsAll: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [orderReq, setOrderReq] = useState<'asc' | 'desc'>('asc');

  const [localText, onChangeInput, setLocalText] = useInputDebounce({
    callback: setSearchName,
    reqWhenLocalEmpty: true,
  });

  const dispatch = useAppDispatch();
  const { tags } = useAppSelector((state) => state.options);
  const [filteredTags, setFilteredTags] = useState<typeof tags>([]);

  const { data, isSuccess, isError } = useGetAllTagsQuery({
    page: currentPage,
    name: searchName,
    order: orderReq,
  });

  useEffect(() => {
    const filter = data?.tags?.length
      ? data.tags.filter((tag) => !tags.some((followedTag) => followedTag.id === tag.id))
      : [];
    setFilteredTags(filter);
  }, [data, tags]);

  const onClickAllTag = (tag: Tag) => {
    setSearchName('');
    setLocalText('');
    dispatch(addTag(tag));
  };
  const onClickSortChanger = () => {
    setOrderReq((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div>
      {isError && <Alert type='error'>error getting all tags</Alert>}
      <div className='flex justify-between gap-2 px-2'>
        <Typography component='h2' variant='title-2' className='text-primary'>
          all tags
        </Typography>
        <button
          onClick={onClickSortChanger}
          className='flex items-center justify-center font-bold text-primary hover:opacity-80'
        >
          {orderReq === 'asc' ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='3'
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='3'
              stroke='currentColor'
              className='h-4 w-4'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3'
              />
            </svg>
          )}
          name
        </button>
      </div>

      <Card className='flex flex-col gap-2'>
        <Input
          name='name'
          id='tags-name'
          placeholder='write name tag..'
          value={localText}
          onChange={onChangeInput}
        />
        {isSuccess && (
          <>
            <Tags
              onClick={onClickAllTag}
              data={filteredTags}
              emptyText='there are no tags in the database'
              className='p-0'
              classNameTag='flex-1'
            />
            {data && data.totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={data?.totalPages || 1}
              />
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default TagsAll;
