import Image from 'next/future/image';

const NotFound = () => {
  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="flex flex-col justify-center m-auto max-w-2xl px-4 text-center">
          <Image
            src="/assets/profile/user/user-not-exist.png"
            alt="User not found"
            className="mt-10 sm:mt-20 w-40 mx-auto"
            width={200}
            height={200}
          />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-10 mb-10">
            404 user not found
          </h2>
          <p className="text-lg sm:text-2xl text-slate-200">
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
