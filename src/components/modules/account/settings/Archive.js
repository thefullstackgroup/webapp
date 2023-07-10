import Menu from "./Menu";

const Archive = ({ user }) => {
  const defaultSubject = `The Full Stack - I wish to request my data archive ${user.displayName}`;
  const defaultMail = "support@thefullstackgroup.com";

  return (
    <>
      <div className="page page-6xl space-y-6">
        <h2>Request your data</h2>

        <div className="box py-4">
          <p className="mb-6 font-bold">
            Your data belongs to you and you can request an archive of your data
            anytime.
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
                    Request a data archive to be sent to you, including all your
                    profile data, your connections, account history, and
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
    </>
  );
};

export default Archive;
