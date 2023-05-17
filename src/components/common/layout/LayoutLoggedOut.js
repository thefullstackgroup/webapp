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
      <div className="h-full bg-black/80 no-scrollbar">
        <div className="z-30 w-full hidden lg:flex fixed md:fixed top-0 px-8 py-3 bg-black/90">
          <div className="w-full max-w-screen-xl mx-auto hidden lg:flex  justify-between">
            <div className="flex items-center space-x-10 text-sm font-medium">
              <Link href="/" passHref>
                <div className="flex items-center cursor-pointer space-x-4">
                  <span className="w-10 h-10 py-1">
                    <Image
                      src="/assets/icons/thefullstack.webp"
                      className={
                        'object-contain hover:opacity-100 duration-300 ' +
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
                      : 'text-slate-400 hover:text-white')
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
                      : 'text-slate-400 hover:text-white')
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
                <span className="text-slate-400 hover:text-white duration-300">
                  Newsletter
                </span>
              </a>
              <Link href="/about/our-story">
                <button
                  className={
                    'duration-300 ' +
                    (navSection[2] === 'our-story'
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white')
                  }
                >
                  About
                </button>
              </Link>
            </div>
            <div className="flex items-center space-x-10 text-sm font-medium">
              <Link href="/login">
                <button className="text-slate-400 hover:text-white duration-300">
                  Login
                </button>
              </Link>

              <button
                className="btn-primary text-sm py-1 bg-slate-300 hover:bg-white text-tfsdark-800 duration-300"
                onClick={() => setShowSignupModal(true)}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>

        <div className="lg:hidden pl-4 py-4 absolute flex justify-between z-30 bg-transparent w-full">
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
            <button className="btn-with-icon text-slate-300 font-medium text-sm">
              <IoLogInOutline className="w-5 h-5" />
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
