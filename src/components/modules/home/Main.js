import { IoLogoGithub } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import ProjectGallery from 'components/modules/explore/ProjectGallery';
import Discover from 'components/modules/explore/Discover';
import Icon from 'components/common/elements/Icon';
import DividerShowMore from 'components/common/elements/DividerShowMore';
import { CategoriesFilter } from '../explore/constants';
import Link from 'next/link';

const Main = ({ user }) => {
  return (
    <div className="min-h-screen space-y-4 pt-6">
      {!user && (
        <div className="rounded-2xl bg-base-200/80 dark:bg-base-800">
          <div className="mx-auto max-w-3xl py-14 text-center">
            <div className="relative space-y-6">
              <h2 className="text-5xl font-bold tracking-tight">
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
                <button className="btn btn-secondary btn-with-icon rounded-full py-2">
                  <IoLogoGithub className="h-5 w-5" />
                  <span>Continue with GitHub</span>
                </button>
                <button className="btn btn-secondary btn-with-icon rounded-full py-2">
                  <FcGoogle />
                  <span>Continue with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="pt-4 pb-10">
        <Discover user={user} sort="newest" range={90} />
      </div>

      <div className="space-y-4">
        <h3 className="flex items-center space-x-2">
          <Icon name={'FiStar'} className="h-6 w-6" />
          <span>Popular projects this month</span>
        </h3>
        <ProjectGallery
          sort={'mostpopular'}
          range={90}
          count={4}
          cols={4}
          feature={true}
        />
      </div>

      <DividerShowMore
        label="Browse popular projects"
        href="/explore/popular"
      />

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
            term: 'opensource',
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

      <div className="space-y-4">
        <h3 className="flex items-center space-x-2">
          <span>Browse by category</span>
        </h3>
        <div className="no-scrollbar mt-6 grid grid-cols-6 gap-4 overflow-hidden overflow-x-scroll px-4 md:px-0">
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

      {/* <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold tracking-tight">
            Explore showcase
          </h3>
          <Filters
            range={range}
            setRange={setRange}
            sort={sort}
            setSort={setSort}
          />
        </div>
        <ProjectGallery sort={sort.orderBy} range={range.days} stack={stack} />
      </div> */}
    </div>
  );
};

export default Main;
