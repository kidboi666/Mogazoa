import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IAuthForm } from '@/pages/signup';
import castArray from '@/utils/castArray';
import signUpGoogle from '@/utils/signUpGoogle';

import { Button, NicknameInput } from '@/components/shared';
import OAuthSignUp, { oAuthSchema } from '../..';

const GoogleAuth = () => {
  const router = useRouter();
  const { errorCode, errorMessage } = router.query;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Pick<IAuthForm, 'nickname'>>({
    resolver: zodResolver(oAuthSchema),
    mode: 'onBlur',
  });

  const handleSubmitSignUp = (data: Pick<IAuthForm, 'nickname'>) => {
    signUpGoogle(data.nickname);
  };

  useEffect(() => {
    if (errorCode && errorMessage) {
      setError('nickname', {
        type: 'validateError',
        message: castArray(errorMessage),
      });
    }
  }, [errorCode, errorMessage, setError]);

  return (
    <OAuthSignUp>
      <form
        onSubmit={handleSubmit(handleSubmitSignUp)}
        className="flex w-full flex-col gap-[40px] md:w-[440px] xl:w-[640px]"
      >
        <NicknameInput
          register={register('nickname')}
          error={errors.nickname}
          placeholder="닉네임을 입력해 주세요"
        />
        <Button text="가입하기" type="submit" className="mt-[20px]" />
      </form>
    </OAuthSignUp>
  );
};

export default GoogleAuth;
