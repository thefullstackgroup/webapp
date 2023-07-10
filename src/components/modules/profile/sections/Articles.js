import useSWR from "swr";
import Moment from "moment";
import fetcher from "utils/fetcher";

const fileExtentions = ["jpg", "jpeg", "png", "webp", "gif"];

const Card = ({ post }) => {
  const openLink = () => {
    window.open(post.contentURI, "_blank");
  };

  const isValidImage = () => {
    const imageSource = post.contentImageURI?.split(".").pop();
    if (fileExtentions.includes(imageSource)) return true;
    return false;
  };

  return (
    <div className="flex items-start">
      <button
        className="mb-6 flex w-full flex-row items-start space-x-8 overflow-hidden rounded-md border border-base-200 bg-base-50 px-6 py-6 text-left duration-200 hover:border-base-600 dark:border-base-700 dark:bg-base-900 dark:hover:border-base-100"
        onClick={openLink}
      >
        <div className="w-8/12 space-y-2">
          <div>
            <h4 className="text-xl font-semibold">{post.contentTitle}</h4>
            <p className="text-xs text-base-300 dark:text-base-400">
              Published on
              {post.contentSource === "DEV_TO" && "DEV "}{" "}
              {post.contentSource === "HASH_NODE" && "Hashnode "}{" "}
              {post.contentSource === "MEDIUM" && "Medium "} on{" "}
              {Moment(post.publishedAt).format("MMM Do")}
            </p>
          </div>
          <p className="text-base">{post.contentDescription}</p>
        </div>
        {isValidImage(post.contentImageURI) && (
          <div className="mb-4 w-full md:mb-0 md:w-4/12">
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
          <div className="mt-8 w-full items-start gap-8 overflow-hidden md:rounded-lg">
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
