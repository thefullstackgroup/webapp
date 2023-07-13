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
      <div className="no-scrollbar sticky h-full w-full flex-1 flex-col overflow-scroll overscroll-contain bg-base-50 dark:bg-base-900 lg:flex">
        {/* Profile */}
        <div className="top-0 z-10 hidden w-full sm:sticky">
          <div className="space-y-4 border-b border-base-200/50 bg-base-50 px-6 pt-4 pb-4 dark:border-base-700 dark:bg-base-900">
            <div className="flex flex-col space-y-4 2xl:flex-row 2xl:items-center 2xl:justify-between 2xl:space-y-0">
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
              {!user && (
                <Link href="/signup">
                  <button className="btn btn-secondary">Follow</button>
                </Link>
              )}
            </div>
            {user && (
              <div className="">
                <Insights projectId={project?._id} />
              </div>
            )}
          </div>
        </div>

        {/* Post comment */}
        {user ? (
          <div className="w-full bg-base-50 px-4 pt-4 dark:bg-base-900 sm:hidden">
            <div className="flex items-center pb-6 sm:space-x-2">
              <Avatar
                image={user.profilePicUrl}
                name={user.displayName}
                dimensions="h-10 w-10 hidden md:block"
              />
              <input
                type="text"
                className="text-input"
                placeholder="Add your comment"
                readOnly
                onClick={() => setShowNewComment(true)}
              />
            </div>
          </div>
        ) : (
          <div className="w-full bg-base-50 px-8 pt-4 dark:bg-base-900">
            <div className="flex items-center pb-6 sm:space-x-2">
              <Link href="/signup">
                <input
                  type="text"
                  className="text-input"
                  placeholder="Sign in to comment"
                  readOnly
                />
              </Link>
            </div>
          </div>
        )}

        {/* Comments */}
        <div className="no-scrollbar relative top-0 h-[78vh] overflow-y-scroll overscroll-contain px-4 pb-4">
          <ListComments user={user} post={project} />
        </div>

        <div className="hidden bg-base-50 px-6 pt-3 dark:bg-base-900 sm:block">
          <Actions
            user={user}
            project={project}
            isLiked={project?.likedByCurrentUser}
            nComments={project?.numberOfComments}
          />
        </div>

        {/* Post comment */}
        {user ? (
          <div className="hidden w-full bg-base-50 px-4 pt-4 dark:bg-base-900 sm:block">
            <div className="flex items-center pb-6 sm:space-x-2">
              <Avatar
                image={user.profilePicUrl}
                name={user.displayName}
                dimensions="h-10 w-10 hidden md:block"
              />
              <input
                type="text"
                className="text-input"
                placeholder="Add your comment"
                readOnly
                onClick={() => setShowNewComment(true)}
              />
            </div>
          </div>
        ) : (
          <div className="w-full bg-base-50 px-8 pt-4 dark:bg-base-900">
            <div className="flex items-center pb-6 sm:space-x-2">
              <Link href="/signup">
                <input
                  type="text"
                  className="text-input"
                  placeholder="Sign in to comment"
                  readOnly
                />
              </Link>
            </div>
          </div>
        )}
      </div>

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
                      placeholder="Add your comment..."
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

      {user && (
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
