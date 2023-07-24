import { useRef, useState } from 'react';
import Page from 'components/modules/project/Container';
import Link from 'next/link';
import Loader from 'components/common/elements/Loader';
import { Dialog, Transition } from '@headlessui/react';
import Reactions from './Reactions';
import Icon from 'components/common/elements/Icon';

const Main = ({ user, project, author }) => {
  const [showComments, setShowComments] = useState(false);
  const cancelButtonRef = useRef(null);

  if (!project)
    return (
      <div className="mx-auto flex h-screen max-w-screen-xl flex-1 items-center justify-center bg-base-800">
        <Loader />
      </div>
    );

  if (project && !project.projectName)
    return (
      <div className="flex h-screen items-start justify-center sm:items-center">
        <div className="prose prose-dark mx-auto max-w-md rounded-md bg-base-700 p-8 text-center">
          <h2 className="text-xl font-semibold">Oops! Post not found</h2>
          <p>
            This post may have been moved by the author!{' '}
            <Link href={`/${project.id}`}>
              <a>Check out their profile</a>
            </Link>{' '}
            to see.
          </p>
        </div>
      </div>
    );

  return (
    <>
      <div className="relative mx-auto">
        <Page
          project={project}
          author={author}
          user={user}
          setShowComments={setShowComments}
        />
      </div>

      <Transition.Root show={showComments}>
        <Dialog
          as="div"
          className="relative z-50"
          initialFocus={cancelButtonRef}
          onClose={setShowComments}
        >
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-base-400/50 dark:bg-base-900/70" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 flex justify-center">
            <div className="flex w-full items-end justify-center text-center sm:items-center sm:p-0">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="translate-y-full sm:translate-x-full sm:translate-y-0"
                enterTo="translate-y-36 sm:translate-x-0 sm:translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="translate-y-36 sm:translate-x-0 sm:translate-y-0"
                leaveTo="translate-y-full sm:translate-x-full sm:translate-y-0"
                className={`fixed right-0 top-0 h-screen w-full max-w-lg`}
              >
                <button className="btn btn-xs btn-with-icon btn-secondary absolute -top-10 right-4 rounded-full">
                  <span>Close</span>
                  <Icon name="FiX" className={'h-4 w-4'} />
                </button>
                <Dialog.Panel
                  className={`relative h-full w-full overflow-hidden border-0 bg-white text-left shadow-xl dark:border-base-600 dark:bg-base-900 sm:border-l`}
                >
                  <Reactions project={project} user={user} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Main;
