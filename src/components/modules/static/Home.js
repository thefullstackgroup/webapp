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
      <div className="fixed top-0 left-0 w-full mx-auto min-h-screen mt-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-tfsdark-900 flex justify-between"></div>
      <main className="mx-auto max-w-full overflow-hidden bg-tfsdark-900">
        {/* <HeroSection
          sendSlackSignUpMessage={sendSlackSignUpMessage}
          setShowSignupModal={setShowSignupModal}
        /> */}

        <div className="relative mt-10 sm:pt-44 max-w-screen-2xl mx-auto min-h-screen space-y-10 md:space-y-20">
          <h3 className="text-4xl md:text-7xl font-bold font-intertight text-center px-4">
            Build{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600">
              #awesome
            </span>{' '}
            things
          </h3>

          <FeaturedProjects />

          <div>
            <div className="space-y-4 mb-20">
              <h3 className="text-5xl md:text-7xl font-bold font-intertight text-center px-4 mt-32">
                Build with a{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600">
                  #community
                </span>
              </h3>

              <div className="flex flex-col md:flex-row items-center md:space-x-10 text-xl md:text-2xl text-slate-400 font-intertight mb-20 justify-center">
                <div className="flex items-center space-x-2">
                  <span>Over 5000+ projects showcased</span>
                </div>
              </div>
            </div>

            <div className="mb-4 md:mb-10 flex overflow-hidden overflow-x-scroll no-scrollbar w-auto gap-2 px-4 xl:px-0">
              {categories.map((category, index) => (
                <button
                  className={
                    `text-base px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg whitespace-nowrap font-medium ` +
                    (category.filter === selectedCategory?.filter
                      ? `bg-tfsdark-600/50 text-white`
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
            <div className="absolute hidden md:block -top-20 left-0 h-48 w-full bg-gradient-to-b from-black via-black to-transparent"></div>
            <div className="absolute hidden md:block bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black via-black to-transparent"></div>
          </div>
        </div>

        <div className="relative md:pb-10 max-w-screen-xl mx-auto px-4 pt-10">
          <div className="relative z-10 mx-auto flex flex-col justify-center space-y-6">
            <button
              className="btn-primary w-full md:w-min mx-auto whitespace-nowrap text-lg md:text-xl py-2 px-3 md:py-3 md:px-6 rounded-lg"
              onClick={() => {
                setShowSignupModal(true);
                sendSlackSignUpMessage('SIGN UP TO CONTINUE');
              }}
            >
              Submit your project
            </button>

            <Link href="/for/developers">
              <button className="btn-ghost text-lg md:text-xl py-2 px-3 md:py-3 md:px-6 rounded-lg">
                Find out more &rarr;
              </button>
            </Link>
          </div>
          <div className="absolute top-0 left-0 h-96 w-full bg-gradient-to-b from-black via-black to-transparent"></div>
        </div>

        <div className="relative">
          <Testimonials />

          <div className="mt-10 relative max-w-3xl mx-auto px-3">
            <h4 className="text-center font-modernist text-sm md:text-lg font-semibold tracking-widest uppercase text-tfssecondary-500 mb-4">
              Subscribe to our Newsletter
            </h4>
            <NewsletterSection />
          </div>

          <div className="w-full">
            <div className="py-20 md:py-40 max-w-screen-xl mx-auto px-8 md:px-20 2xl:px-0">
              <div className="text-center">
                <h4 className="font-modernist text-sm md:text-lg font-semibold tracking-widest uppercase text-tfssecondary-500 mb-4">
                  Created by developers
                </h4>
                <h3 className="font-intertight text-4xl md:text-5xl font-semibold text-white">
                  Connect with developers sharing their work
                </h3>
                <div className="mt-20">
                  <Link href="/about/our-story">
                    <a
                      href="#"
                      className="font-modernist text-base font-semibold tracking-widest uppercase text-tfssecondary-500"
                    >
                      See our story &rarr;
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row justify-center my-20 space-y-4 sm:space-y-0 sm:space-x-6 items-center px-4">
              <button
                className="btn-primary w-full md:w-auto rounded-lg py-3 text-lg"
                onClick={() => {
                  setShowSignupModal(true);
                  sendSlackSignUpMessage('BOTTOM GETTING STARTED');
                }}
              >
                Get started - it&apos;s free!
              </button>
              <Link href="/greatest-developer-portfolio-ever" passHref>
                <a
                  className="btn-seondary w-full md:w-auto bg-slate-400/20 text-lg text-center py-3 px-6 rounded-lg"
                  target="_blank"
                >
                  Need project ideas?
                </a>
              </Link>
            </div>
          </div>

          <div className="">
            <div className="relative pt-4 pb-20">
              <div className="relative lg:max-w-6xl lg:mx-auto px-4 md:px-8 2xl:px-0 text-center">
                <p className="font-intertight text-center text-slate-300 relative tracking-tight font-semibold text-4xl xl:text-5xl mt-10 mb-32 lg:my-20 lg:pb-10 w-full">
                  Join{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600">
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
