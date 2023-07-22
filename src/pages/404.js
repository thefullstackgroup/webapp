import Meta from 'components/common/partials/Metadata';

const NotFound = () => {
  return (
    <>
      <Meta
        title="The Full Stack - Page Not Found"
        description="Oops"
        keywords=""
      />
      <div className="h-screen bg-base-50 dark:bg-base-900">
        <div className="flex h-full w-full flex-col justify-center">
          <div className="mx-auto max-w-md space-y-10 px-4">
            <div className="space-y-6 text-center">
              <h2 className="font-manrope text-4xl font-semibold md:text-5xl">
                404... god dam it!!
              </h2>
              <p className="text-2xl text-base-700 dark:text-base-300">
                We{"'"}re sorry, this page has either moved or does not exist.
              </p>
            </div>
            <div className="text-center">
              <a
                href={`${process.env.BASEURL}/`}
                className="btn btn-primary block py-3 text-lg"
              >
                Take me home &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
