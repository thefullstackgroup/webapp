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
      <div className="hidden lg:flex flex-1 flex-col w-full overflow-scroll overscroll-contain h-screen bg-black no-scrollbar">
        {/* Profile */}
        <div className="sticky w-full top-0 z-10">
          <div className="border-b border-tfsdark-600/50 px-6 bg-black pt-4 pb-4 space-y-4">
            <div className="flex lg:flex-col 2xl:flex-row lg:space-y-4 2xl:space-y-0 2xl:items-center 2xl:justify-between">
              <div className="flex items-center space-x-3">
                <Avatar
                  href={`/${project?.projectCreator?.displayName}`}
                  image={project?.projectCreator?.profilePicUrl}
                  name={project?.projectCreator?.displayName}
                  dimensions="h-14 w-14"
                />
                <Link href={`/${project?.projectCreator?.displayName}`}>
                  <div className="flex flex-col pt-1 cursor-pointer">
                    <div className="text-base">
                      <p className="font-bold tracking-tight">
                        {project?.projectCreator?.name}
                      </p>
                      <p className="text-xs tracking-tight text-slate-400">
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
            <div className="border-b border-tfsdark-600/50 px-6 bg-black pt-4 pb-4 space-y-2">
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
        <div className="relative top-0 px-4 py-4 h-[74vh] overflow-y-scroll overscroll-contain no-scrollbar">
          <ListComments user={user} post={project} />
        </div>

        {/* Post comment */}
        {user && (
          <div className="sticky z-0 w-full max-w-lg bottom-0 bg-black border-t border-tfsdark-700 px-4">
            <div className="flex items-center sm:space-x-4 py-6">
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
        <div className="fixed bottom-12 left-0 w-full z-10 lg:hidden">
          <div className="flex space-x-6 bg-tfsdark-800/90 w-min py-2 px-4 rounded-full mx-auto border border-tfsdark-600 items-center">
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
          <div className="top-20 left-0 fixed z-20 w-full mx-auto">
            <div
              className="fixed inset-0 bg-tfsdark-900 bg-opacity-80"
              onClick={() => setShowCommentsModal(!showCommentsModal)}
            ></div>
            <div
              className="absolute z-50 top-2 right-2 cursor-pointer"
              onClick={() => setShowCommentsModal(!showCommentsModal)}
            >
              <IoCloseSharp className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col mx-auto max-w-full relative bg-tfsdark-900 border-t border-tfsdark-700 rounded-t-2xl h-[90vh]">
              <div className="text-center py-3 text-sm">
                <div>
                  {project?.numberOfComments}{' '}
                  {project?.numberOfComments == 1 ? 'comment' : 'comments'}
                </div>
              </div>
              {user && (
                <div className="w-full max-w-full border-t border-tfsdark-700 px-4 h-20">
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
              <div className="w-full px-4 md:px-8 pb-28 overflow-y-scroll overscroll-contain no-scrollbar">
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
