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
    <div className="box box-link w-full rounded-none border-l-0 border-r-0 lg:rounded-md lg:border">
      <button
        className="flex w-full flex-col-reverse items-start gap-4 text-left lg:flex-row lg:gap-6"
        onClick={openLink}
      >
        <div className="w-full space-y-2 lg:w-8/12">
          <div>
            <h4 className="text-xl font-semibold">{post.contentTitle}</h4>
            <p className="text-xs text-base-300 dark:text-base-400">
              Published on
              {post.contentSource === 'DEV_TO' && 'DEV '}{' '}
              {post.contentSource === 'HASH_NODE' && 'Hashnode '}{' '}
              {post.contentSource === 'MEDIUM' && 'Medium '} on{' '}
              {Moment(post.publishedAt).format('MMM Do')}
            </p>
          </div>
          <p className="text-base">{post.contentDescription}</p>
        </div>
        {isValidImage(post.contentImageURI) && (
          <div className="flex w-full items-end md:mb-0 lg:mb-4 lg:w-4/12">
            <div className="h-40 w-full overflow-hidden rounded-md md:h-48">
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
          <div className="mt-8 flex w-full flex-col items-center px-2 md:px-8">
            <div className="flex w-full flex-col items-center justify-evenly py-10 text-zinc-400 md:py-36">
              <span>No posts.</span>
            </div>
          </div>
        ))}
      {posts && (
        <div className="w-full xl:w-full">
          <div className="mt-8 w-full items-start gap-8 space-y-6 overflow-hidden md:rounded-lg">
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
