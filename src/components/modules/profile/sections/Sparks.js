import Link from 'next/link';
import PostCard from 'components/common/cards/PostCard';
import useSWR from 'swr';
import fetcher from 'utils/fetcher';

const types =
  'SPARK,POST,SHOWSTARTUP,LEARNING,ADVICE,MEME,VENT,NEWS,POLL,FRAMEWORKS,UTILITIES,TUTORIALS,CAREER_ADVICE,WORKING_REMOTELY,DESK_SETUP,DESIGN_TIPS,GOT_THE_JOB,PROJECT_IDEAS,COLLABS,WORKFLOWS';

const Sparks = ({ profile, myProfile }) => {
  const url = `${process.env.BASEURL}/api/profile/posts/get?userId=${profile.displayName}&projectType=${types}&page=0&size=100`;
  const { data } = useSWR(url, fetcher);
  const posts = data ? data.content : null;

  return (
    <>
      {!posts?.length > 0 && (
        <div className="mt-8 flex w-full flex-col items-center px-2 md:px-8">
          <div className="flex w-full flex-col items-center justify-evenly py-10 text-base-300 md:py-36">
            <span>Nothing posted yet.</span>
            {profile?.userId === myProfile?.userId && (
              <div className="mt-4 flex justify-center">
                <Link href="/hangout">
                  <button className="btn btn-primary">Post to community</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {posts?.length > 0 && (
        <div className="mx-auto w-full md:w-8/12">
          <div className="mt-8 flex max-w-3xl flex-col items-center space-y-6 overflow-hidden px-0 md:rounded-lg md:px-0">
            {posts?.map((post, index) => (
              <div
                className="relative w-full overflow-hidden border-b border-base-800"
                key={index}
              >
                <PostCard project={post} user={myProfile} seperator={true} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Sparks;
