import Link from 'next/link';
import Icon from './Icon';
import { Dialog, Transition } from '@headlessui/react';
import { useRef } from 'react';

const SignUpPrompt = ({ show, setShow }) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={show}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={setShow}
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-base-400/50 dark:bg-base-900/90" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 flex justify-center">
          <div className="flex w-full items-end justify-center text-center sm:items-center">
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-40 lg:translate-y-4 sm:translate-y-0 lg:scale-95"
              enterTo="opacity-100 translate-y-0 lg:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 lg:scale-100"
              leaveTo="opacity-0 translate-y-40 sm:translate-y-0 lg:scale-95"
              className={`max-w-sm`}
            >
              <Dialog.Panel
                className={`relative h-auto w-full overflow-hidden bg-white text-left shadow-xl dark:border-base-600 dark:bg-base-900 sm:my-8 lg:rounded-lg lg:border`}
              >
                <div className="px-4">
                  <div className="space-y-6 px-6 py-10 text-center">
                    <h4 className="text-xl font-semibold">
                      Join us at The Full Stack
                    </h4>
                    <p className="text-sm">
                      Join us and thousands of developers who have discovered a
                      place to show off projects and grow a network.
                    </p>
                    <div className="items-centet flex justify-center space-x-2">
                      <Link href="/signup">
                        <a href="#" className="btn btn-primary">
                          Sign up
                        </a>
                      </Link>
                      <Link href="/login">
                        <a href="#" className="btn btn-secondary">
                          Login
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SignUpPrompt;
