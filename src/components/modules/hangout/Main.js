import Feed from 'components/modules/hangout/Feed';
import CreatePost from 'components/modules/hangout/CreatePost';
import Topics from 'components/modules/hangout/Topics';
import WhoToFollow from './WhoToFollow';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';
import Activity from './Activity';
import TrendingProjects from './TrendingProjects';

const Main = ({ user, topic }) => {
  const url = `${process.env.BASEURL}/api/profile/social/following?userId=${user.userId}`;
  const { data } = useSWR(url, fetcher);
  const following =
    (data && data?.map(({ followUserId }) => followUserId).join(',')) || null;

  return (
    <>
      <div className="mx-auto flex max-w-screen-2xl gap-10">
        <div className="w-3/12">
          <Topics topic={topic} />
        </div>
        <div className="mt-8 min-h-screen w-6/12 max-w-2xl">
          <CreatePost user={user} />
          <Feed user={user} topic={topic} following={null} />
        </div>
        <div className="w-3/12">
          <div className="sticky top-20 ">
            {/* <TrendingProjects user={user} /> */}
            <WhoToFollow user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
