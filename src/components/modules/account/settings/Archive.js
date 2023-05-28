import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

const Archive = ({ user }) => {
  const defaultSubject = `The Full Stack - I wish to request my data archive ${user.displayName}`;
  const defaultMail = 'support@thefullstackgroup.com';

  return (
    <>
      <div className="mt-0 flex w-full justify-center lg:mt-12">
        <div className="w-full px-0 md:ml-6 lg:ml-20 lg:max-w-full xl:ml-52 xl:px-4 2xl:ml-56 2xl:px-0">
          <div className="relative mx-auto max-w-4xl">
            <div className="mx-4 space-y-6 md:mx-0">
              <Link href={`/account/settings`}>
                <div className="mb-4 flex cursor-pointer items-center space-x-2 px-4 md:px-0">
                  <IoArrowBack className="h-5 w-5" />
                  <h2 className="text-sm font-bold">
                    Back to account settings
                  </h2>
                </div>
              </Link>

              <div className="relative w-min whitespace-nowrap">
                <h2 className="text-3xl font-bold tracking-tight sm:text-3xl">
                  Request data archive
                </h2>
              </div>
              <div className="mb-4 w-full rounded-lg bg-base-700 px-4 py-4 sm:px-6">
                <p className="mt-1 mb-6 text-base-100">
                  Your data belongs to you and you can download an archive of
                  your data anytime.
                </p>
                <fieldset>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="request"
                          name="request"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="request" className="text-base-200">
                          Request Data Archive
                        </label>
                        <p className="text-sm text-base-400">
                          Request a data archive to be sent to you, including
                          all your profile data, your connections, account
                          history, and information we infer about you based on
                          your profile and activity.
                        </p>
                      </div>
                    </div>

                    <div>
                      <button type="submit" className="btn-primary">
                        <a
                          className="mailto"
                          href={`mailto:${defaultMail}?subject=${defaultSubject}`}
                        >
                          Request Data Archive
                        </a>
                      </button>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Archive;
