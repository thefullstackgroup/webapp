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
        <div className="mt-8 flex flex-col items-center w-full px-2 md:px-8">
          <div className="py-10 md:py-36 text-zinc-400 flex flex-col items-center w-full justify-evenly">
            <span>Nothing posted yet.</span>
            {profile?.userId === myProfile.userId && (
              <div className="flex justify-center mt-4">
                <Link href="/hangout">
                  <button className="btn-secondary">Post to community</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {posts?.length > 0 && (
        <div className="w-full md:w-9/12 mx-auto">
          <div className="mt-8 flex flex-col items-center max-w-3xl md:rounded-lg overflow-hidden px-0 md:px-0">
            {posts?.map((post, index) => (
              <div
                className="relative w-full overflow-hidden border-b border-tfsdark-800"
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
