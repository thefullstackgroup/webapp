import { useAuthUser } from 'next-firebase-auth';
import { useRouter } from 'next/router';
import Image from 'next/future/image';

const Page = () => {
  const AuthUser = useAuthUser();
  const router = useRouter();

  const handleLogout = async () => {
    AuthUser.signOut();
    router.push('/');
  };

  return (
    <>
      <div className="mt-40 h-[60vh] w-full space-y-6 rounded-lg text-center">
        <h2 className="text-xl font-bold tracking-tight sm:text-3xl">
          We will miss you!
        </h2>
        <Image
          src="/assets/profile/user/user-not-exist.png"
          alt="User not found"
          className="mx-auto w-28"
          width={200}
          height={200}
        />
        <h3 className="text-lg font-bold ">
          Don&apos;t forget to come back...
        </h3>

        <button
          className="btn btn-primary mt-10"
          onClick={() => {
            handleLogout();
          }}
        >
          Sign me out
        </button>
      </div>
    </>
  );
};

export default Page;
