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
      <div className="mt-0 flex relative">
        <div className="relative w-full mx-auto">
          <div className="overflow-hidden pt-6 lg:rounded-t-lg pb-40">
            {!post && (
              <div className="flex flex-1 justify-center items-center h-screen">
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
                  className="align-bottom sm:px-4 md:px-4 mb-10 pb-4 text-left sm:my-4 sm:align-middle sm:max-w-full sm:w-full lg:w-full"
                >
                  <PostComments
                    post={post}
                    user={user}
                    setShowNewComment={setShowNewComment}
                  />
                </div>
                <div className="flex items-center sm:space-x-3">
                  <Avatar
                    image={user.profilePicUrl}
                    name={user.displayName}
                    dimensions="h-10 w-10"
                  />

                  <div className="w-auto flex-1 overflow-hidden ml-3">
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

      <NewComment
        user={user}
        show={showNewComment}
        setShow={setShowNewComment}
        project={post}
      />

      {/* Edit Post Modal */}

      {post && (
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
            <div className="sm:flex sm:items-start justify-center">
              <div className="mt-3 sm:mt-0 text-center">
                <h3 className="text-xl font-bold text-slate-200">
                  Delete post?
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-slate-300">
                    Are you sure you want to delete this post?
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 flex space-x-2 justify-center">
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
