import Meta from 'components/common/partials/Metadata';

const NotFound = () => {
  return (
    <>
      <Meta
        title="thefullstack - Page Not Found"
        description="Oops"
        keywords=""
      />
      <div className="h-screen">
        <div className="w-full h-full flex justify-center">
          <div className="flex flex-col m-auto max-w-3xl px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-10 mb-4">
              404 not found
            </h2>
            <p className="text-2xl text-gray-700 dark:text-gray-200">
              We{"'"}re sorry, this page has either moved or does not exist.
            </p>
            <p className="my-10">
              <a
                href={`${process.env.BASEURL}/`}
                className="w-72 mx-auto text-center block px-12 py-4 text-lg font-semibold rounded-md duration-200 text-white bg-stone-900 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600"
              >
                Go back home &rarr;
              </a>
            </p>

            <p className="text-xl text-gray-400">
              We&apos;ll do better next time 🤞
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
