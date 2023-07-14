import { useEffect, useState } from 'react';
import PostContent from 'components/modules/post/Content';
import PostComments from 'components/modules/comments/ListComments';
import ModalDialog from 'components/common/modals/ModalDialog';
import EditPost from 'components/modules/hangout/EditPost';
import NewComment from 'components/modules/comments/NewComment';
import Topics from '../hangout/Topics';
import WhoToFollow from '../hangout/WhoToFollow';

const Container = (props) => {
  const [showEditPost, setShowEditPost] = useState(false);
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
  const [showNewComment, setShowNewComment] = useState(false);

  useEffect(() => {
    const path = window.location.hash;
    if (path && path.includes('#')) {
      setTimeout(() => {
        const id = path.replace('#', '');
        const el = window.document.getElementById(id);
        const r = el.getBoundingClientRect();
        window.top.scroll({
          top: scrollY + r.top,
          behavior: 'smooth',
        });
      }, 200);
    }
  }, []);

  return (
    <>
      <div className="mx-auto flex max-w-screen-2xl lg:gap-10">
        <div className="hidden lg:block lg:w-3/12">
          <div className="sticky top-20">
            <Topics topic={''} />
          </div>
        </div>
        <div className="mt-0 min-h-screen w-full lg:mt-8 lg:w-7/12 lg:max-w-2xl xl:w-6/12">
          <div className="overflow-hidden bg-base-50 px-4 pt-4 pb-20 dark:bg-base-900 md:rounded-lg">
            <PostContent
              post={props.project}
              projectContent={props.projectContent}
              nComments={props.nComments}
              user={props.user}
              setShowNewComment={setShowNewComment}
              setShowEditPost={setShowEditPost}
            />

            <div
              id="comments"
              className="mx-4 mb-10 pb-4 text-left align-bottom sm:my-4 sm:w-full sm:max-w-full sm:px-4 sm:align-middle md:mx-0 md:px-8 lg:w-full"
            >
              <PostComments
                post={props.project}
                user={props.user}
                setShowNewComment={setShowNewComment}
              />
            </div>
          </div>
        </div>
        <div className="hidden w-3/12 xl:block">
          <div className="sticky top-20 space-y-8">
            <WhoToFollow user={props.user} />
          </div>
        </div>
      </div>

      {/* Edit Post Modal */}

      {props.project && (
        <ModalDialog
          show={showEditPost}
          setShow={setShowEditPost}
          title="Edit post"
          dimensions={'sm:max-w-screen-md'}
          disabled
        >
          <EditPost
            user={props.user}
            postSlug={props.project.projectSlug}
            postAuthor={props.project.projectCreator?.displayName}
            setShowEditPost={setShowEditPost}
            setIsDeletePromptOpen={setIsDeletePromptOpen}
          />
        </ModalDialog>
      )}

      {props.user && (
        <NewComment
          user={props.user}
          show={showNewComment}
          setShow={setShowNewComment}
          project={props.project}
        />
      )}
    </>
  );
};

export default Container;
