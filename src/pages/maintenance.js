import Meta from 'components/common/partials/Metadata';
import { useTheme } from 'next-themes';
import Image from 'next/future/image';

const Maintenance = ({ user }) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  return (
    <>
      <Meta
        title="The Full Stack - Discover and connect with developers sharing projects"
        description="A open source platform for developers to share projects and grow a developer network around the globe."
        keywords="developer, social network, developers, software engineering, full stack, software engineering network, tech community, tech companies, best tech companies, developer portfolio, developer network, professional network, professional community"
      />

      <div className="min-h-screen space-y-8 bg-white px-4 pt-6 dark:bg-base-900 lg:pt-0">
        {!user && (
          <div className="rounded-lg bg-transparent dark:bg-transparent">
            <div className="mx-auto max-w-4xl space-y-8 py-10 text-center lg:space-y-20 lg:py-14">
              <div className="mx-auto h-16 w-16 cursor-pointer overflow-hidden">
                <Image
                  src={
                    currentTheme === 'dark'
                      ? '/assets/icons/thefullstack-dark.webp'
                      : '/assets/icons/thefullstack-light.webp'
                  }
                  className="object-contain"
                  alt="The Full Stack"
                  width={200}
                  height={200}
                />
              </div>
              <div className="relative space-y-10">
                <h1 className="font-manrope text-6xl font-extrabold tracking-tighter text-base-800 dark:text-base-200 xl:text-8xl">
                  Unleash your{' '}
                  <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                    Developer
                  </span>{' '}
                  projects.
                </h1>
                <h2 className="mx-auto max-w-2xl text-base font-light tracking-tight text-base-500 dark:text-base-400 xl:text-2xl">
                  The Full Stack is an open source platform for developers to
                  share projects and grow your developer network.
                </h2>
              </div>
              <div className="border-t border-base-200 dark:border-base-700"></div>
              <div className="space-y-4">
                <p className="mx-auto max-w-2xl text-base font-light tracking-tight text-black dark:text-white xl:text-2xl">
                  Sorry, we have to do some maintenance updates and need to take
                  the site offline temporarily. Will be back online ASAP.
                </p>
                <p className="text-2xl">✌️</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Maintenance;
