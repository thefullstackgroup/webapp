import ButtonBookmark from 'components/common/buttons/Bookmark';
import ButtonShare from 'components/common/buttons/Share';
import ButtonVote from 'components/common/buttons/Vote';
import ButtonComment from 'components/common/buttons/Comment';
import ButtonAward from 'components/common/buttons/Award';
import ModalAlert from 'components/common/modals/ModalAlert';
import Link from 'next/link';
import { useState } from 'react';
import ToolTip from 'components/common/elements/ToolTip';
import Icon from 'components/common/elements/Icon';

const Actions = (props) => {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <>
      {props.user ? (
        <div className="flex w-full items-center justify-around space-x-10">
          <ButtonVote
            user={props.user}
            post={props.project}
            showLabel={props.showLabel}
          />

          <ButtonComment
            user={props.user}
            post={props.project}
            action={props.setShowComments}
            showLabel={props.showLabel}
          />

          <ButtonAward
            user={props.user}
            post={props.project}
            showLabel={props.showLabel}
          />

          <ButtonBookmark
            user={props.user}
            project={props.project}
            showLabel={props.showLabel}
          />
          <div>
            <ButtonShare
              url={`${process.env.BASEURL}/u/${props.project?.projectCreator?.displayName}/${props.project?.projectSlug}`}
              message={props.project?.projectName}
              showLabel={props.showLabel}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-around space-x-10">
          <button
            className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 pl-1 text-sm text-base-800 hover:bg-green-500/20 hover:text-green-600 dark:text-base-100 dark:hover:bg-green-500/20 dark:hover:text-green-400"
            onClick={() => setShowSignUp(!showSignUp)}
          >
            <ToolTip message="Like" />

            <Icon name="FiTriangle" className="h-6 w-6 " />
            <span>{Math.abs(props.project.numberOfLikes)}</span>
          </button>
          <button
            className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 text-sm text-base-800 hover:bg-violet-500/40 hover:text-violet-500 dark:text-base-100 dark:hover:bg-violet-500/40 dark:hover:text-violet-500"
            onClick={() =>
              props.setShowComments
                ? props.setShowComments(true)
                : setShowSignUp(!showSignUp)
            }
          >
            <ToolTip message="Comment" />
            <Icon name="FiMessageSquare" className="h-6 w-6" />
            <span>{Math.abs(props.project.numberOfComments)}</span>
          </button>
          <button
            className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 text-sm text-base-800 hover:bg-yellow-500/40 hover:text-yellow-600 dark:text-base-200 dark:hover:bg-yellow-500/40 dark:hover:text-yellow-500"
            onClick={() => setShowSignUp(!showSignUp)}
          >
            <ToolTip message="Award" />
            <Icon name="FiStar" className="h-6 w-6" />
            <span>{Math.abs(props.project.contentTotalDiamonds)}</span>
          </button>

          <button
            className="btn btn-ghost btn-with-icon group group relative cursor-pointer space-x-1 rounded-xl bg-transparent px-2 pl-1 text-sm text-base-800 hover:bg-base-200 hover:text-base-700 dark:text-base-100 dark:hover:bg-base-700 dark:hover:text-base-100"
            onClick={() => setShowSignUp(!showSignUp)}
          >
            <ToolTip message="Bookmark" />
            <Icon name="FiBookmark" className="h-6 w-6" />
          </button>

          <ButtonShare
            url={`${process.env.BASEURL}/u/${props.project?.projectCreator?.displayName}/${props.project?.projectSlug}`}
            message={props.project?.projectName}
            showLabel={props.showLabel}
          />
        </div>
      )}

      <ModalAlert show={showSignUp} setShow={setShowSignUp} title="">
        <div>
          <div className="space-y-6 px-6 py-8 text-center">
            <h4 className="text-xl font-semibold">Join us at The Full Stack</h4>
            <p className="text-sm">
              Join us and thousands of developers who have discovered a place to
              show off projects and grow a network.
            </p>
            <div className="items-centet flex justify-center space-x-2">
              <Link href="/login">
                <a href="#" className="btn btn-secondary">
                  Login
                </a>
              </Link>
              <Link href="/signup">
                <a href="#" className="btn btn-primary">
                  Sign up
                </a>
              </Link>
            </div>
          </div>
        </div>
      </ModalAlert>
    </>
  );
};

export default Actions;
