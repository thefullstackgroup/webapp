import Link from 'next/link';
import Footer from 'components/common/layout/Footer';
import { IoLogInOutline } from 'react-icons/io5';
import Image from 'next/future/image';
import { useRouter } from 'next/router';

const LayoutLoggedOut = ({ children, setShowSignupModal }) => {
  const router = useRouter();
  const navSection = router.route.split('/');

  return (
    <>
      <div className="no-scrollbar h-full bg-black/80">
        <div className="fixed top-0 z-30 hidden w-full bg-black/90 px-8 py-3 md:fixed lg:flex">
          <div className="mx-auto hidden w-full max-w-screen-xl justify-between  lg:flex">
            <div className="flex items-center space-x-10 text-sm font-medium">
              <Link href="/" passHref>
                <div className="flex cursor-pointer items-center space-x-4">
                  <span className="h-10 w-10 py-1">
                    <Image
                      src="/assets/icons/thefullstack.webp"
                      className={
                        'object-contain duration-300 hover:opacity-100 ' +
                        (navSection[1] === '' ? 'opacity-100' : 'opacity-30')
                      }
                      alt="The Full Stack"
                      width={200}
                      height={200}
                    />
                  </span>
                </div>
              </Link>
              <Link href="/for/developers">
                <button
                  className={
                    'duration-300 ' +
                    (navSection[2] === 'developers'
                      ? 'text-white'
                      : 'text-base-400 hover:text-white')
                  }
                >
                  For Developers
                </button>
              </Link>
              <Link href="/for/teams">
                <button
                  className={
                    'duration-300 ' +
                    (navSection[2] === 'teams'
                      ? 'text-white'
                      : 'text-base-400 hover:text-white')
                  }
                >
                  For Teams
                </button>
              </Link>
              <a
                href="https://cdn.forms-content.sg-form.com/9d844234-926d-11ed-b182-82896c15a735"
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-base-400 duration-300 hover:text-white">
                  Newsletter
                </span>
              </a>
              <Link href="/about/our-story">
                <button
                  className={
                    'duration-300 ' +
                    (navSection[2] === 'our-story'
                      ? 'text-white'
                      : 'text-base-400 hover:text-white')
                  }
                >
                  About
                </button>
              </Link>
            </div>
            <div className="flex items-center space-x-10 text-sm font-medium">
              <Link href="/login">
                <button className="text-base-400 duration-300 hover:text-white">
                  Login
                </button>
              </Link>

              <button
                className="btn-primary bg-base-300 py-1 text-sm text-base-800 duration-300 hover:bg-white"
                onClick={() => setShowSignupModal(true)}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>

        <div className="absolute z-30 flex w-full justify-between bg-transparent py-4 pl-4 lg:hidden">
          <div className="">
            <Link href="/" passHref>
              <div className="flex items-center justify-center">
                <span className="w-10">
                  <img
                    src="/assets/icons/thefullstack.webp"
                    className="object-contain"
                    alt={process.env.brandName}
                  />
                </span>
              </div>
            </Link>
          </div>
          <Link href="/login">
            <button className="btn-with-icon text-sm font-medium text-base-300">
              <IoLogInOutline className="h-5 w-5" />
              <span>Sign in</span>
            </button>
          </Link>
        </div>

        {children}

        <Footer />
      </div>
    </>
  );
};

export default LayoutLoggedOut;
