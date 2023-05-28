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
      <div className="mt-0 flex w-full justify-center lg:mt-12">
        <div className="w-full px-0 md:ml-6 lg:ml-20 lg:max-w-full xl:ml-52 xl:px-4 2xl:ml-56 2xl:px-0">
          <div className="relative mx-auto max-w-4xl">
            <div className="mx-4 space-y-6 md:mx-0">
              <div className="mb-4 w-full space-y-6 rounded-lg bg-base-700 px-4 py-20 text-center sm:px-6">
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
                <h3 className="text-lg font-bold text-slate-100">
                  Don&apos;t forget to come back...
                </h3>

                <button
                  className="btn-primary mt-10"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Sign me out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
