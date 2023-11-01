import { forwardRef } from 'react';

import Alert from '@/components/ui/Alert';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Overlay from '@/components/ui/Overlay';
import { useInputDebounce } from '@/hooks/useInputDebounce';
import { useSearchUserByLoginMutation } from '@/services/users.service';

import Users from './Users';
import UserSkeletons from './UserSkeletons';

interface ISearchPopupProps {
  onClickUser?: any;
}

const SearchPopup = forwardRef<HTMLDivElement, ISearchPopupProps>(({ onClickUser }, ref) => {
  const [searchUsers, { data, isSuccess, isLoading, isError }] =
    useSearchUserByLoginMutation();

  const [localText, onChangeInput] = useInputDebounce({
    callback: (login) => searchUsers({ login }),
  });

  const loadingOrErrorElements = (isError || isLoading) && <UserSkeletons count={3} />;
  const successElements = localText.length > 0 && isSuccess && data && (
    <Card className='max-h-[300px] overflow-auto'>
      <Users users={data.users} onClickUser={onClickUser} />
    </Card>
  );

  return (
    <>
      <Overlay ref={ref} />
      <div className='fixed left-1/2 top-1/3 flex w-[90vw] -translate-x-1/2 flex-col gap-2 sm:w-[500px]'>
        <Card>
          <Input
            name='text'
            id='search-text'
            placeholder='write user login here..'
            value={localText}
            onChange={onChangeInput}
            focus
          />
        </Card>
        {isError && <Alert type='error'>user search error</Alert>}
        {loadingOrErrorElements}
        {successElements}
      </div>
    </>
  );
});

export default SearchPopup;