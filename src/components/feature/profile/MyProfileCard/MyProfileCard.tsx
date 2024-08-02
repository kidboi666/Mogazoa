import Image from 'next/image';
import useModal from '@/store/use-modal-store';
import { UserType } from '@/types/user/user-type';
import logout from '@/lib/auth/logout';
import { Button } from '@/components/shared';

const MyProfileCard = ({ user }: { user: UserType }) => {
  const { onOpen } = useModal();

  return (
    <div className="xl: flex flex-col items-center gap-[30px] rounded-[12px] border border-var-black3 bg-var-black2 px-[20px] py-[30px] text-[14px] text-var-white md:px-[30px] xl:gap-[40px] xl:px-[20px] xl:pt-[40px]">
      {user?.image ? (
        <Image
          src={user?.image}
          alt="프로필 이미지"
          width={120}
          height={120}
          className="rounded-[50%] border border-var-gray1"
        />
      ) : (
        <Image
          src="/images/user-no-image.svg"
          alt="프로필 이미지"
          width={120}
          height={120}
          className="rounded-[50%] border border-var-gray1"
        />
      )}
      <h1 className="text-[20px] font-semibold">{user?.nickname}</h1>
      <p className="text-var-gray1">{user?.description}</p>
      <div className="flex w-full">
        <div
          className="flex flex-1 cursor-pointer flex-col items-center border-r border-var-black3"
          onClick={() => onOpen('follow')}
        >
          <span className="text-[18px]">{user?.followersCount}</span>
          <span>팔로워</span>
        </div>
        <div
          className="flex flex-1 cursor-pointer flex-col items-center"
          onClick={() => onOpen('following')}
        >
          <span className="text-[18px]">{user?.followeesCount}</span>
          <span>팔로잉</span>
        </div>
      </div>
      <div className="w-full space-y-5">
        <Button text="프로필 편집" onClick={() => onOpen('profileEdit')} />
        <Button text="로그아웃" variant="tertiary" onClick={() => logout()} />
      </div>
    </div>
  );
};

export default MyProfileCard;