import useSWR from 'swr';
import Moment from 'moment';
import fetcher from 'utils/fetcher';

const fileExtentions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

const Card = ({ post }) => {
  const openLink = () => {
    window.open(post.contentURI, '_blank');
  };

  const isValidImage = () => {
    const imageSource = post.contentImageURI?.split('.').pop();
    if (fileExtentions.includes(imageSource)) return true;
    return false;
  };

  return (
    <div className="flex items-start">
      <div className="hidden md:block h-40 w-2/12 relative">
        <div className="text-sm text-slate-300 bg-tfsdark-900/30 p-2 w-20 text-center">
          {Moment(post.publishedAt).format('MMM Do')}
        </div>
        <div className="border-r border-dashed border-tfsdark-600 w-10 h-full">
          <span></span>
        </div>
      </div>
      <button
        className="flex flex-col-reverse md:flex-row items-start md:space-x-4 text-left md:bg-tfsdark-700/60 w-full md:rounded-md p-4 mb-6 border-2 border-transparent sm:hover:border-primary-500 duration-200 sm:hover:shadow-lg sm:hover:shadow-purple-900"
        onClick={openLink}
      >
        <div className="w-full space-y-2">
          <div>
            <h4 className="text-xl font-semibold">{post.contentTitle}</h4>
            <p className="text-slate-500 text-xs">
              Published on
              {post.contentSource === 'DEV_TO' && 'DEV '}{' '}
              {post.contentSource === 'HASH_NODE' && 'Hashnode '}{' '}
              {post.contentSource === 'MEDIUM' && 'Medium '} on{' '}
              {Moment(post.publishedAt).format('MMM Do')}
            </p>
          </div>
          <p className="text-slate-400 text-base">{post.contentDescription}</p>
        </div>
        {isValidImage(post.contentImageURI) && (
          <div className="w-full md:w-56 mb-4 md:mb-0">
            <div className="w-full h-40 md:h-32 rounded-md overflow-hidden">
              <img
                src={post.contentImageURI}
                className="h-full w-full object-cover"
                alt={post.contentTitle}
                title={post.contentTitle}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

const Articles = ({ profile, source }) => {
  const url = `${process.env.BASEURL}/api/profile/sng/getByUser?displayName=${profile.displayName}&source=${source}`;
  const { data } = useSWR(url, fetcher);
  const posts = data ? data.content : null;

  return (
    <>
      {!posts ||
        (!posts.length > 0 && (
          <div className="mt-8 flex flex-col items-center w-full px-2 md:px-8">
            <div className="py-10 md:py-36 text-zinc-400 flex flex-col items-center w-full justify-evenly">
              <span>No posts.</span>
            </div>
          </div>
        ))}
      {posts && (
        <div className="w-full xl:w-full">
          <div className="mt-8 gap-8 w-full items-start md:rounded-lg overflow-hidden">
            {posts?.map((post, index) => (
              <Card post={post} key={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Articles;
