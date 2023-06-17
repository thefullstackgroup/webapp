import Feed from 'components/modules/hangout/Feed';
import CreatePost from 'components/modules/hangout/CreatePost';
import Topics from 'components/modules/hangout/Topics';
import WhoToFollow from './WhoToFollow';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import Link from 'next/link';

const Main = ({ user, topic }) => {
  // const url = `${process.env.BASEURL}/api/profile/social/following?userId=${user.userId}`;
  // const { data } = useSWR(url, fetcher);
  // const following =
  //   (data && data?.map(({ followUserId }) => followUserId).join(',')) || null;

  return (
    <>
      <div className="mx-auto flex max-w-screen-2xl gap-10">
        <div className="w-3/12">
          <div className="sticky top-20">
            <Topics topic={topic} />
          </div>
        </div>
        <div className="mt-8 min-h-screen w-6/12 max-w-2xl">
          {user && <CreatePost user={user} />}
          {!user && (
            <div className="mb-6 rounded-md">
              <Link href="/signup">
                <input
                  type="text"
                  className="text-input"
                  disabled
                  placeholder="Sign in to share something ..."
                />
              </Link>
            </div>
          )}
          <Feed user={user} topic={topic} following={null} />
        </div>
        <div className="w-3/12">
          <div className="sticky top-20 space-y-8">
            <WhoToFollow user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
