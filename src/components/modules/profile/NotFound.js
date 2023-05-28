import Image from 'next/future/image';

const NotFound = () => {
  return (
    <div>
      <div className="flex w-full justify-center">
        <div className="m-auto flex max-w-2xl flex-col justify-center px-4 text-center">
          <Image
            src="/assets/profile/user/user-not-exist.png"
            alt="User not found"
            className="mx-auto mt-10 w-40 sm:mt-20"
            width={200}
            height={200}
          />
          <h2 className="mt-10 mb-10 text-3xl font-bold tracking-tight md:text-5xl">
            404 user not found
          </h2>
          <p className="text-lg text-base-200 sm:text-2xl">
            We{"'"}re sorry, this user has either moved or does not exist. But
            never fear! Maybe some day we <span className="italic">will</span>{' '}
            find this person once again! So let&apos;s stay positive and hope
            that your paths will cross once more. Good luck! 🤞
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
