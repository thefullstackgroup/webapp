import Feed from 'components/modules/hangout/Feed';
import CreatePost from 'components/modules/hangout/CreatePost';
import Topics from 'components/modules/hangout/Topics';
import WhoToFollow from './WhoToFollow';
import Link from 'next/link';
import Icon from 'components/common/elements/Icon';
import { topics } from './constants';
import Image from 'next/future/image';

const Main = ({ user, topic }) => {
  // const url = `${process.env.BASEURL}/api/profile/social/following?userId=${user.userId}`;
  // const { data } = useSWR(url, fetcher);
  // const following =
  //   (data && data?.map(({ followUserId }) => followUserId).join(',')) || null;

  const feedTitle = topics.filter(function (item) {
    return item.slug === topic;
  });

  return (
    <>
      <div className="mx-auto flex max-w-screen-2xl lg:gap-10">
        <div className="hidden lg:block lg:w-3/12">
          <div className="sticky top-28">
            <Topics topic={topic} />
          </div>
        </div>
        <div className="mt-0 min-h-screen w-full lg:mt-8 lg:w-7/12 lg:max-w-2xl xl:w-6/12">
          {user && <CreatePost user={user} />}
          {!user && (
            <div className="mt-4 mb-6 rounded-md px-4 lg:px-0">
              <Link href="/signup">
                <div className="box box-link flex justify-between bg-transparent text-base-300">
                  <span>Sign in to share something ...</span>
                  <Icon name="FiSend" />
                </div>
              </Link>
            </div>
          )}
          {feedTitle.length > 0 && (
            <div className="mb-2 flex items-center space-x-2 px-4 lg:px-0">
              <Icon name={`${feedTitle[0]?.icon}`} />
              <h3>{feedTitle[0]?.label}</h3>
            </div>
          )}
          <Feed user={user} topic={topic} following={null} />
        </div>
        <div className="hidden w-3/12 xl:block">
          <div className="sticky top-28 space-y-8">
            <div className="pl-6 pt-4">
              <div className="pl-7">
                <Link href="/hackathon/competition">
                  <div className="relative h-auto w-full cursor-pointer rounded-lg border border-transparent duration-200 dark:hover:border-white">
                    <div className="h-52 w-full overflow-hidden bg-black sm:rounded-lg">
                      <Image
                        src={
                          'https://images.unsplash.com/photo-1629429407759-01cd3d7cfb38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
                        }
                        alt="The Full Stack Hackathon"
                        width="800"
                        height="800"
                        className="h-full w-full object-cover opacity-70"
                        layout="fill"
                      />
                    </div>
                    <div className="absolute top-4 flex w-full flex-col space-y-2 text-center sm:py-8">
                      <span className="font-manrope text-3xl font-bold uppercase tracking-tight text-white">
                        Hackathon #1
                      </span>
                      <span className="font-mono text-base font-medium text-white">
                        September 17th - October 15th
                      </span>
                      <button className="btn btn-sm mx-auto w-min whitespace-nowrap border border-white text-white dark:border-white">
                        Find out more
                      </button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <WhoToFollow user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
