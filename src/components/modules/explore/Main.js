import firebase from 'firebase/app';
import 'firebase/auth';
import { IoLogoGithub } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import ProjectGallery from 'components/modules/explore/ProjectGallery';
import Discover from 'components/modules/home/Discover';
import Icon from 'components/common/elements/Icon';
import DividerShowMore from 'components/common/elements/DividerShowMore';
import { CategoriesFilter } from './constants';
import Link from 'next/link';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import Highlight from '../home/Highlight';

export const Greeting = ({ name }) => {
  const myDate = new Date();
  const hours = myDate.getHours();
  const firstName = name.split(' ');
  let greet = '';

  if (hours < 12) greet = 'Good morning';
  else if (hours >= 12 && hours <= 17) greet = 'Good afternoon';
  else if (hours >= 17 && hours <= 24) greet = 'Good evening';

  return (
    <h4 className="hidden text-2xl font-semibold tracking-tight md:block">
      {greet}, <span className="capitlize">{firstName[0]}</span> 👋
    </h4>
  );
};

const Main = ({ user }) => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const gitHubProvider = new firebase.auth.GithubAuthProvider();

  const viewsURL = `${process.env.BASEURL}/api/stats/profile/getStats`;
  const { data: views } = useSWR(viewsURL, fetcher);
  const numberOfViews = views ? views.totalUniqueProfileViewCount : 0;
  const numberOfReactions = views ? views.totalNumberOfReactions : 0;
  const viewsLastWeekURL = `${process.env.BASEURL}/api/stats/profile/getStats?range=7`;
  const { data: viewsLastWeek } = useSWR(viewsLastWeekURL, fetcher);

  const numberOfViewsLastWeek = viewsLastWeek
    ? viewsLastWeek.totalUniqueProfileViewCount
    : 0;
  const numberOfReactionsLastWeek = viewsLastWeek
    ? viewsLastWeek.totalNumberOfReactions
    : 0;

  const viewsDiff = (numberOfViewsLastWeek / numberOfViews) * 100;
  const reactionsDiff = (numberOfReactionsLastWeek / numberOfReactions) * 100;

  const signInWithGoogle = async () => {
    try {
      const res = await firebase.auth().signInWithPopup(googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGitHub = async () => {
    try {
      const res = await firebase.auth().signInWithPopup(gitHubProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen space-y-4 px-8 pt-6">
      {!user && (
        <div className="rounded-lg bg-transparent dark:bg-transparent">
          <div className="mx-auto max-w-4xl py-14 text-center">
            <div className="relative space-y-6">
              <h2 className="text-6xl font-bold tracking-tighter">
                <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-transparent">
                  Discover and connect
                </span>{' '}
                with developers sharing projects.
              </h2>
              <h4 className="mx-auto max-w-2xl text-xl font-normal tracking-tight text-base-400 dark:text-base-400">
                The Full Stack is an open source platform for developers to
                share projects with a supportive dev community and grow a
                network of value.
              </h4>
              <div className="flex items-center justify-center space-x-4">
                <button
                  className="btn btn-secondary btn-with-icon rounded-full py-2"
                  onClick={signInWithGitHub}
                >
                  <IoLogoGithub className="h-5 w-5" />
                  <span>Continue with GitHub</span>
                </button>
                <button
                  className="btn btn-secondary btn-with-icon rounded-full py-2"
                  onClick={signInWithGoogle}
                >
                  <FcGoogle />
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {user && (
        <div className="flex items-center justify-between">
          <div>
            <Greeting name={user?.name} />
          </div>
          <div className="flex items-end space-x-6">
            <div className="flex w-full space-x-2 whitespace-nowrap">
              <span className="text-sm">Views:</span>

              <div className="text-sm font-medium">
                {numberOfViews}

                {viewsDiff > 0 && (
                  <span className="pl-1 text-xs text-green-500">
                    +{viewsDiff.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
            <div className="flex w-full  space-x-2 whitespace-nowrap">
              <span className="text-sm">Reactions:</span>

              <div className="text-sm font-medium">
                {numberOfReactions}
                {reactionsDiff > 0 && (
                  <span className="pl-1 text-xs text-green-500">
                    +{reactionsDiff.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="pt-4 pb-10">
        <Highlight />
      </div>

      <div className="pb-10">
        <Discover user={user} sort="newest" range={90} />
      </div>

      <div className="space-y-4">
        <h3 className="flex items-center space-x-2">
          <Icon name={'FiStar'} className="h-6 w-6" />
          <span>Popular projects upvoted</span>
        </h3>
        <ProjectGallery
          sort={'mostpopular'}
          range={365}
          count={5}
          cols={5}
          feature={true}
        />
      </div>

      <DividerShowMore
        label="Browse popular projects"
        href="/explore/popular"
      />

      <div className="space-y-4">
        <h3 className="flex items-center space-x-2">
          <Icon name={'FiClock'} className="h-6 w-6" />
          <span>Recently added</span>
        </h3>

        <ProjectGallery sort={'newest'} range={30} count={5} cols={5} />
      </div>

      <DividerShowMore label="Show new projects" href="/explore/new" />

      <div className="space-y-4">
        <h3 className="flex items-center space-x-2">
          <Icon name={'FiTool'} className="h-6 w-6" />
          <span>Projects open to collaboration</span>
        </h3>

        <ProjectGallery
          sort={'mostpopular'}
          category={{
            label: 'Open to Collaboration',
            slug: 'opentocollab',
            term: 'opentocollab',
            title: 'Projects open to collaboration',
            desc: 'Discover and connect to developers actively looking for collaborators',
          }}
          range={90}
          count={5}
          cols={5}
        />
      </div>

      <DividerShowMore
        label="Show more projects"
        href="/explore/popular/opentocollab"
      />

      <div className="space-y-4">
        <h3 className="flex items-center space-x-2">
          <Icon name={'IoDesktopOutline'} pack={'Io'} className="h-6 w-6" />
          <span>Awesome apps you&apos;ll like</span>
        </h3>
        <ProjectGallery
          sort={'mostpopular'}
          category={{
            label: 'Apps',
            slug: 'apps',
            term: 'apps',
            title: 'Full stack apps projects',
            desc: 'Cool apps built by the community',
          }}
          range={90}
          count={5}
          cols={5}
        />
      </div>

      <DividerShowMore label="Show more apps" href="/explore/popular/apps" />

      <div className="space-y-4">
        <h3 className="flex items-center space-x-2">
          <Icon
            name={'IoGameControllerOutline'}
            pack={'Io'}
            className="h-7 w-7"
          />
          <span>Games projects you&apos;ll like</span>
        </h3>
        <ProjectGallery
          sort={'mostpopular'}
          category={{
            label: 'Games',
            slug: 'games',
            term: 'games',
            title: 'Games',
            desc: '',
          }}
          range={365}
          count={5}
          cols={5}
        />
      </div>

      <DividerShowMore label="Show more games" href="/explore/popular/games" />

      <div className="space-y-4">
        <h3 className="flex items-center space-x-2">
          <Icon name={'FiTool'} className="h-6 w-6" />
          <span>Dev tool projects</span>
        </h3>

        <ProjectGallery
          sort={'mostpopular'}
          category={{
            label: 'Tools',
            slug: 'tools',
            term: 'tools',
            title: '',
            desc: '',
          }}
          range={90}
          count={5}
          cols={5}
        />
      </div>

      <DividerShowMore label="Show more tools" href="/explore/popular/tools" />

      <div className="space-y-4">
        <h3 className="flex items-center space-x-2">
          <Icon name={'FiGitPullRequest'} className="h-6 w-6" />
          <span>Open source projects</span>
        </h3>

        <ProjectGallery
          sort={'mostpopular'}
          category={{
            label: 'Open Source',
            slug: 'opensource',
            term: 'open source',
            title: '',
            desc: '',
          }}
          range={365}
          count={5}
          cols={5}
        />
      </div>

      <DividerShowMore
        label="Show more open source"
        href="/explore/popular/opensource"
      />

      <div className="space-y-4 pb-20">
        <h3 className="flex items-center space-x-2">
          <span>Browse by category</span>
        </h3>
        <div className="no-scrollbar mt-6 grid grid-cols-6 gap-4 px-4 md:px-0">
          {CategoriesFilter.map(
            (item, index) =>
              item.slug !== 'datascience' && (
                <Link href={`/explore/popular/${item.slug}`} key={index}>
                  <div className="group flex h-32 w-full cursor-pointer flex-col justify-between rounded-lg border border-transparent bg-base-200/50 p-4 text-left duration-200 hover:border-base-700 hover:bg-base-50 dark:border-base-700 dark:bg-base-900 dark:hover:border-base-100 dark:hover:bg-base-900">
                    <div className="flex flex-col">
                      <span className="text-base font-medium text-base-700 group-hover:text-base-700 dark:text-base-200 dark:group-hover:text-base-100">
                        {item.label}
                      </span>
                      <span className="text-sm text-base-300 dark:text-base-400">
                        {item.desc}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <Icon
                        name={'FiChevronRight'}
                        className="text-base-300 dark:text-base-400"
                      />
                    </div>
                  </div>
                </Link>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
