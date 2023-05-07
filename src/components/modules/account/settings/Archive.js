import Link from 'next/link';
import { IoArrowBack } from 'react-icons/io5';

const Archive = ({ user }) => {
  const defaultSubject = `The Full Stack - I wish to request my data archive ${user.displayName}`;
  const defaultMail = 'support@thefullstackgroup.com';

  return (
    <>
      <div className="mt-0 lg:mt-12 w-full flex justify-center">
        <div className="w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 md:ml-6 lg:ml-20 xl:ml-52 2xl:ml-56">
          <div className="relative max-w-4xl mx-auto">
            <div className="mx-4 md:mx-0 space-y-6">
              <Link href={`/account/settings`}>
                <div className="flex items-center space-x-2 px-4 md:px-0 mb-4 cursor-pointer">
                  <IoArrowBack className="h-5 w-5" />
                  <h2 className="font-bold text-sm">
                    Back to account settings
                  </h2>
                </div>
              </Link>

              <div className="relative w-min whitespace-nowrap">
                <h2 className="text-3xl sm:text-3xl font-bold tracking-tight">
                  Request data archive
                </h2>
              </div>
              <div className="w-full rounded-lg bg-tfsdark-700 mb-4 px-4 sm:px-6 py-4">
                <p className="mt-1 text-slate-100 mb-6">
                  Your data belongs to you and you can download an archive of
                  your data anytime.
                </p>
                <fieldset>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-5 flex items-center">
                        <input
                          id="request"
                          name="request"
                          type="checkbox"
                          className="focus:ring-gray-500 h-4 w-4 text-gray-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3">
                        <label htmlFor="request" className="text-slate-200">
                          Request Data Archive
                        </label>
                        <p className="text-slate-400 text-sm">
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
