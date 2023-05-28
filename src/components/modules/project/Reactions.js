import { useState } from 'react';
import Link from 'next/link';
import NewComment from 'components/modules/comments/NewComment';
import Avatar from 'components/common/elements/Avatar';
import Actions from 'components/modules/project/Actions';
import Insights from 'components/modules/post/Insights';
import FollowButton from 'components/common/buttons/Follow';
import ListComments from 'components/modules/comments/ListComments';
import { isMobile } from 'react-device-detect';
import { IoCloseSharp } from 'react-icons/io5';

const Reactions = ({ project, user }) => {
  const [showNewComment, setShowNewComment] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  return (
    <>
      <div className="no-scrollbar sticky top-16 hidden h-screen w-full flex-1 flex-col overflow-scroll overscroll-contain bg-black lg:flex">
        {/* Profile */}
        <div className="sticky top-0 z-10 w-full">
          <div className="space-y-4 border-b border-base-600/50 bg-black px-6 pt-4 pb-4">
            <div className="flex lg:flex-col lg:space-y-4 2xl:flex-row 2xl:items-center 2xl:justify-between 2xl:space-y-0">
              <div className="flex items-center space-x-3">
                <Avatar
                  href={`/${project?.projectCreator?.displayName}`}
                  image={project?.projectCreator?.profilePicUrl}
                  name={project?.projectCreator?.displayName}
                  dimensions="h-14 w-14"
                />
                <Link href={`/${project?.projectCreator?.displayName}`}>
                  <div className="flex cursor-pointer flex-col pt-1">
                    <div className="text-base">
                      <p className="font-bold tracking-tight">
                        {project?.projectCreator?.name}
                      </p>
                      <p className="text-xs tracking-tight text-base-400">
                        {project?.projectCreator?.currentTitle}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              {user && project?.userId !== user?.userId && (
                <FollowButton
                  followToUser={project?.projectCreator?.userId}
                  followFromUser={user?.userId}
                  followToName={project?.projectCreator?.displayName}
                />
              )}
            </div>
          </div>
          {user && (
            <div className="space-y-2 border-b border-base-600/50 bg-black px-6 pt-4 pb-4">
              <Actions
                user={user}
                project={project}
                isLiked={project?.likedByCurrentUser}
                nComments={project?.numberOfComments}
              />
              <div className="">
                <Insights projectId={project?._id} />
              </div>
            </div>
          )}
        </div>

        {/* Comments */}
        <div className="no-scrollbar relative top-0 h-[74vh] overflow-y-scroll overscroll-contain px-4 py-4">
          <ListComments user={user} post={project} />
        </div>

        {/* Post comment */}
        {user && (
          <div className="sticky bottom-0 z-0 w-full max-w-lg border-t border-base-700 bg-black px-4">
            <div className="flex items-center py-6 sm:space-x-4">
              <Avatar
                image={user.profilePicUrl}
                name={user.displayName}
                dimensions="h-10 w-10 hidden md:block"
              />
              <input
                type="text"
                className="text-input"
                placeholder="Add comment"
                readOnly
                onClick={() => setShowNewComment(true)}
              />
              <button
                className="btn-ghost"
                onClick={() => setShowNewComment(true)}
              >
                Post
              </button>
            </div>
          </div>
        )}
      </div>

      {isMobile && user && (
        <div className="fixed bottom-12 left-0 z-10 w-full lg:hidden">
          <div className="mx-auto flex w-min items-center space-x-6 rounded-full border border-base-600 bg-base-800/90 py-2 px-4">
            <Actions
              user={user}
              project={project}
              isLiked={project?.likedByCurrentUser}
              nComments={project?.numberOfComments}
              setShowCommentsModal={setShowCommentsModal}
            />
          </div>
        </div>
      )}

      {isMobile && showCommentsModal && (
        <div className="absolute">
          <div className="fixed top-20 left-0 z-20 mx-auto w-full">
            <div
              className="fixed inset-0 bg-base-900 bg-opacity-80"
              onClick={() => setShowCommentsModal(!showCommentsModal)}
            ></div>
            <div
              className="absolute top-2 right-2 z-50 cursor-pointer"
              onClick={() => setShowCommentsModal(!showCommentsModal)}
            >
              <IoCloseSharp className="h-6 w-6 text-white" />
            </div>
            <div className="relative mx-auto flex h-[90vh] max-w-full flex-col rounded-t-2xl border-t border-base-700 bg-base-900">
              <div className="py-3 text-center text-sm">
                <div>
                  {project?.numberOfComments}{' '}
                  {project?.numberOfComments == 1 ? 'comment' : 'comments'}
                </div>
              </div>
              {user && (
                <div className="h-20 w-full max-w-full border-t border-base-700 px-4">
                  <div className="flex items-center space-x-2 py-2">
                    <Avatar
                      image={user.profilePicUrl}
                      name={user.displayName}
                      dimensions="h-8 w-8"
                    />
                    <input
                      type="text"
                      className="text-input text-sm"
                      placeholder="Add comment..."
                      readOnly
                      onClick={() => setShowNewComment(true)}
                    />
                  </div>
                </div>
              )}
              <div className="no-scrollbar w-full overflow-y-scroll overscroll-contain px-4 pb-28 md:px-8">
                <ListComments user={user} post={project} />
              </div>
            </div>
          </div>
        </div>
      )}

      {showNewComment && (
        <NewComment
          user={user}
          show={showNewComment}
          setShow={setShowNewComment}
          project={project}
        />
      )}
    </>
  );
};

export default Reactions;
