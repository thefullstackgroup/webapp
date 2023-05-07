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
      <div className="mt-0 lg:mt-12 w-full flex justify-center">
        <div className="w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 md:ml-6 lg:ml-20 xl:ml-52 2xl:ml-56">
          <div className="relative max-w-4xl mx-auto">
            <div className="mx-4 md:mx-0 space-y-6">
              <div className="w-full rounded-lg bg-tfsdark-700 mb-4 px-4 sm:px-6 py-20 text-center space-y-6">
                <h2 className="text-xl sm:text-3xl font-bold tracking-tight">
                  We will miss you!
                </h2>
                <Image
                  src="/assets/profile/user/user-not-exist.png"
                  alt="User not found"
                  className="w-28 mx-auto"
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
