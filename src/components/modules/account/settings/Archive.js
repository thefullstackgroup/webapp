import Menu from './Menu';

const Archive = ({ user }) => {
  const defaultSubject = `The Full Stack - I wish to request my data archive ${user.displayName}`;
  const defaultMail = 'support@thefullstackgroup.com';

  return (
    <>
      <div className="mx-auto mt-0 w-full max-w-5xl justify-center lg:mt-6">
        <div className="hidden w-full pt-4 pb-10 text-4xl font-medium tracking-tight sm:block">
          Account settings
        </div>
        <div className="flex h-[60vh] items-start space-x-4">
          <div className="w-3/12">
            <Menu selected="Request data" />
          </div>

          <div className="mb-4 w-full rounded-lg border border-base-200 bg-base-50 px-4 py-4 dark:border-base-700 dark:bg-base-900 sm:px-6">
            <h4 className="mb-6 text-2xl font-medium">Request your data</h4>
            <p className="mt-1 mb-6 font-bold">
              Your data belongs to you and you can request an archive of your
              data anytime.
            </p>
            <fieldset>
              <div className="space-y-10">
                <div className="flex items-start">
                  <input
                    id="request"
                    name="request"
                    type="checkbox"
                    className="h-5 w-5 rounded border-base-300 text-cyan-dark focus:ring-cyan-dark"
                  />

                  <div className="ml-3">
                    <label htmlFor="request">
                      Request a data archive to be sent to you, including all
                      your profile data, your connections, account history, and
                      information we infer about you based on your profile and
                      activity.
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  <a
                    className="mailto"
                    href={`mailto:${defaultMail}?subject=${defaultSubject}`}
                  >
                    Request Data Archive
                  </a>
                </button>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
};

export default Archive;
