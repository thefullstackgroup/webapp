import { useEffect, useState } from 'react';
import PostContent from 'components/modules/post/Content';
import PostComments from 'components/modules/comments/ListComments';
import ModalDialog from 'components/common/modals/ModalDialog';
import EditPost from 'components/modules/hangout/EditPost';
import NewComment from 'components/modules/comments/NewComment';

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
      <div className="mt-4 md:mt-12 flex">
        <div className="w-full max-w-2xl lg:max-w-3xl overflow-hidden mx-auto">
          <div className="md:rounded-lg overflow-hidden sm:bg-tfsdark-700 px-4 sm:px-0 pt-4 pb-20">
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
              className="align-bottom sm:px-4 md:px-8 mb-10 pb-4 mx-4 md:mx-0 text-left sm:my-4 sm:align-middle sm:max-w-full sm:w-full lg:w-full"
            >
              <PostComments
                post={props.project}
                user={props.user}
                setShowNewComment={setShowNewComment}
              />
            </div>
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

      <NewComment
        user={props.user}
        show={showNewComment}
        setShow={setShowNewComment}
        project={props.project}
      />
    </>
  );
};

export default Container;
