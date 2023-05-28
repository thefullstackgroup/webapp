import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { categories } from 'components/modules/static/shared/constants';
import dynamic from 'next/dynamic';

const HeroSection = dynamic(() =>
  import('components/modules/static/HeroSection')
);
const ProjectShowcase = dynamic(() =>
  import('components/modules/static/ProjectShowcase')
);
const Testimonials = dynamic(() =>
  import('components/modules/static/shared/TestimonialsSection')
);
const NewsletterSection = dynamic(() =>
  import('components/modules/static/shared/NewsletterSection')
);
const FeaturedProjects = dynamic(() =>
  import('components/modules/static/FeaturedProjects')
);

const Main = ({ setShowSignupModal, sendSlackSignUpMessage }) => {
  const router = useRouter();

  let selectedTab = categories.find(
    (category) => category.slug === router.query.tab
  );

  const [selectedCategory, setSelectedCategory] = useState(
    selectedTab || {
      title: 'Most Popular',
      filter: 'popular',
      sort: 'mostpopular',
    }
  );

  return (
    <div className="">
      <div className="fixed top-0 left-0 mx-auto mt-16 flex min-h-screen w-full justify-between bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-base-900"></div>
      <main className="mx-auto max-w-full overflow-hidden bg-base-900">
        {/* <HeroSection
          sendSlackSignUpMessage={sendSlackSignUpMessage}
          setShowSignupModal={setShowSignupModal}
        /> */}

        <div className="relative mx-auto mt-10 min-h-screen max-w-screen-2xl space-y-10 sm:pt-44 md:space-y-20">
          <h3 className="px-4 text-center font-intertight text-4xl font-bold md:text-7xl">
            Build{' '}
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-transparent">
              #awesome
            </span>{' '}
            things
          </h3>

          <FeaturedProjects />

          <div>
            <div className="mb-20 space-y-4">
              <h3 className="mt-32 px-4 text-center font-intertight text-5xl font-bold md:text-7xl">
                Build with a{' '}
                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                  #community
                </span>
              </h3>

              <div className="mb-20 flex flex-col items-center justify-center font-intertight text-xl text-slate-400 md:flex-row md:space-x-10 md:text-2xl">
                <div className="flex items-center space-x-2">
                  <span>Over 5000+ projects showcased</span>
                </div>
              </div>
            </div>

            <div className="no-scrollbar mb-4 flex w-auto gap-2 overflow-hidden overflow-x-scroll px-4 md:mb-10 xl:px-0">
              {categories.map((category, index) => (
                <button
                  className={
                    `whitespace-nowrap rounded-lg px-3 py-1.5 text-base font-medium sm:px-4 sm:py-2 ` +
                    (category.filter === selectedCategory?.filter
                      ? `bg-base-600/50 text-white`
                      : `text-slate-400 hover:text-white`)
                  }
                  key={index}
                  onClick={() => {
                    setSelectedCategory(category);
                    router.push(`?tab=${category.slug}`, undefined, {
                      shallow: true,
                    });
                  }}
                >
                  {category.title}
                </button>
              ))}
            </div>
            <ProjectShowcase category={selectedCategory} />
            <div className="absolute -top-20 left-0 hidden h-48 w-full bg-gradient-to-b from-black via-black to-transparent md:block"></div>
            <div className="absolute bottom-0 left-0 hidden h-40 w-full bg-gradient-to-t from-black via-black to-transparent md:block"></div>
          </div>
        </div>

        <div className="relative mx-auto max-w-screen-xl px-4 pt-10 md:pb-10">
          <div className="relative z-10 mx-auto flex flex-col justify-center space-y-6">
            <button
              className="btn-primary mx-auto w-full whitespace-nowrap rounded-lg py-2 px-3 text-lg md:w-min md:py-3 md:px-6 md:text-xl"
              onClick={() => {
                setShowSignupModal(true);
                sendSlackSignUpMessage('SIGN UP TO CONTINUE');
              }}
            >
              Submit your project
            </button>

            <Link href="/for/developers">
              <button className="btn-ghost rounded-lg py-2 px-3 text-lg md:py-3 md:px-6 md:text-xl">
                Find out more &rarr;
              </button>
            </Link>
          </div>
          <div className="absolute top-0 left-0 h-96 w-full bg-gradient-to-b from-black via-black to-transparent"></div>
        </div>

        <div className="relative">
          <Testimonials />

          <div className="relative mx-auto mt-10 max-w-3xl px-3">
            <h4 className="font-modernist text-tfssecondary-500 mb-4 text-center text-sm font-semibold uppercase tracking-widest md:text-lg">
              Subscribe to our Newsletter
            </h4>
            <NewsletterSection />
          </div>

          <div className="w-full">
            <div className="mx-auto max-w-screen-xl py-20 px-8 md:py-40 md:px-20 2xl:px-0">
              <div className="text-center">
                <h4 className="font-modernist text-tfssecondary-500 mb-4 text-sm font-semibold uppercase tracking-widest md:text-lg">
                  Created by developers
                </h4>
                <h3 className="font-intertight text-4xl font-semibold text-white md:text-5xl">
                  Connect with developers sharing their work
                </h3>
                <div className="mt-20">
                  <Link href="/about/our-story">
                    <a
                      href="#"
                      className="font-modernist text-tfssecondary-500 text-base font-semibold uppercase tracking-widest"
                    >
                      See our story &rarr;
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="my-20 flex flex-col items-center justify-center space-y-4 px-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <button
                className="btn-primary w-full rounded-lg py-3 text-lg md:w-auto"
                onClick={() => {
                  setShowSignupModal(true);
                  sendSlackSignUpMessage('BOTTOM GETTING STARTED');
                }}
              >
                Get started - it&apos;s free!
              </button>
              <Link href="/greatest-developer-portfolio-ever" passHref>
                <a
                  className="btn-seondary w-full rounded-lg bg-slate-400/20 py-3 px-6 text-center text-lg md:w-auto"
                  target="_blank"
                >
                  Need project ideas?
                </a>
              </Link>
            </div>
          </div>

          <div className="">
            <div className="relative pt-4 pb-20">
              <div className="relative px-4 text-center md:px-8 lg:mx-auto lg:max-w-6xl 2xl:px-0">
                <p className="relative mt-10 mb-32 w-full text-center font-intertight text-4xl font-semibold tracking-tight text-slate-300 lg:my-20 lg:pb-10 xl:text-5xl">
                  Join{' '}
                  <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                    thousands of developers
                  </span>{' '}
                  who have discovered a place to show off and grow their
                  network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
