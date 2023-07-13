import Feed from 'components/modules/hangout/Feed';
import CreatePost from 'components/modules/hangout/CreatePost';
import Topics from 'components/modules/hangout/Topics';
import WhoToFollow from './WhoToFollow';
import Link from 'next/link';
import Icon from 'components/common/elements/Icon';

const Main = ({ user, topic }) => {
  // const url = `${process.env.BASEURL}/api/profile/social/following?userId=${user.userId}`;
  // const { data } = useSWR(url, fetcher);
  // const following =
  //   (data && data?.map(({ followUserId }) => followUserId).join(',')) || null;

  return (
    <>
      <div className="mx-auto flex max-w-screen-2xl lg:gap-10">
        <div className="hidden lg:block lg:w-3/12">
          <div className="sticky top-20">
            <Topics topic={topic} />
          </div>
        </div>
        <div className="mt-6 min-h-screen w-full lg:mt-8 lg:w-7/12 lg:max-w-2xl xl:w-6/12">
          {user && <CreatePost user={user} />}
          {!user && (
            <div className="mb-6 rounded-md px-4 lg:px-0">
              <Link href="/signup">
                <div className="box box-link flex justify-between bg-transparent text-base-300">
                  <span>Sign in to share something ...</span>
                  <Icon name="FiSend" />
                </div>
              </Link>
            </div>
          )}
          <Feed user={user} topic={topic} following={null} />
        </div>
        <div className="hidden w-3/12 xl:block">
          <div className="sticky top-20 space-y-8">
            <WhoToFollow user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
