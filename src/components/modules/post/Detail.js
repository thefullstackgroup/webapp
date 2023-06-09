import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import useSWR, { mutate } from 'swr';
import fetcher from 'utils/fetcher';
import PostContent from 'components/modules/post/Content';
import PostComments from 'components/modules/comments/ListComments';
import NewComment from 'components/modules/comments/NewComment';
import ModalAlert from 'components/common/modals/ModalAlert';
import ModalDialog from 'components/common/modals/ModalDialog';
import EditPost from 'components/modules/hangout/EditPost';
import Loader from 'components/common/elements/Loader';
import Avatar from 'components/common/elements/Avatar';

const Detail = ({ postId, user, setShowPost }) => {
  const router = useRouter();
  const [showEditPost, setShowEditPost] = useState(false);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
  const [showNewComment, setShowNewComment] = useState(false);

  const postUrl = `${process.env.BASEURL}/api/posts/getPostById?postId=${postId}`;
  const { data } = useSWR(postUrl, fetcher);
  const post = data ? data : null;

  const deletePost = async () => {
    const data = {
      projectId: post?._id,
    };
    await axios.post(
      `${process.env.BASEURL}/api/projects/project/delete`,
      data
    );
    setIsDeletePromptOpen(false);
    setShowEditPost(false);
    setShowPost(false);
    router.reload(`/hangout`);
  };

  useEffect(() => {
    mutate(postUrl);
  }, [showEditPost]);

  return (
    <>
      <div className="relative mt-0 flex">
        <div className="relative mx-auto w-full">
          <div className="overflow-hidden pt-6 pb-40 lg:rounded-t-lg">
            {!post && (
              <div className="flex h-screen flex-1 items-center justify-center">
                <Loader />
              </div>
            )}

            {post && (
              <PostContent
                post={post}
                projectContent={post}
                nComments={post.numberOfComments}
                user={user}
                setShowNewComment={setShowNewComment}
                setShowEditPost={setShowEditPost}
              />
            )}

            {post && (
              <>
                <div
                  id="comments"
                  className="mb-10 pb-4 text-left align-bottom sm:my-4 sm:w-full sm:max-w-full sm:px-4 sm:align-middle md:px-4 lg:w-full"
                >
                  <PostComments
                    post={post}
                    user={user}
                    setShowNewComment={setShowNewComment}
                  />
                </div>
                <div className="flex items-center sm:space-x-3">
                  {user && (
                  <Avatar
                    image={user.profilePicUrl}
                    name={user.displayName}
                    dimensions="h-10 w-10"
                  />
                  )}

                  <div className="ml-3 w-auto flex-1 overflow-hidden">
                    {/* Plain comment textarea for mobile */}
                    <div className="block">
                      <input
                        type="text"
                        className="text-input rounded-xl"
                        onClick={() => setShowNewComment(true)}
                        placeholder="Write a comment..."
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {user && (
        <NewComment
          user={user}
          show={showNewComment}
          setShow={setShowNewComment}
          project={post}
        />
      )}

      {/* Edit Post Modal */}

      {post && user && (
        <ModalDialog
          show={showEditPost}
          setShow={setShowEditPost}
          title="Edit post"
          dimensions={'sm:max-w-screen-md'}
          disabled
        >
          <EditPost
            user={user}
            postSlug={post?.projectSlug}
            postAuthor={post?.projectCreator?.displayName}
            setShowEditPost={setShowEditPost}
            setIsDeletePromptOpen={setIsDeletePromptOpen}
          />
        </ModalDialog>
      )}

      {isDeletePromptOpen && (
        <ModalAlert show={isDeletePromptOpen} setShow={setIsDeletePromptOpen}>
          <div>
            <div className="justify-center sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0">
                <h3 className="text-xl font-bold text-base-200">
                  Delete post?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-base-300">
                    Are you sure you want to delete this post?
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-center space-x-2 sm:mt-4">
              <button
                type="button"
                className="btn-primary bg-red-600/80 hover:bg-red-500"
                onClick={() => deletePost()}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsDeletePromptOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </ModalAlert>
      )}
    </>
  );
};

export default Detail;
