import Image from 'next/future/image';
import Link from 'next/link';

const images = [
  'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDh8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTl8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1561406636-b80293969660?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI5fHxwZXJzb258ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
];

const ImageSample = ({ image }) => {
  return (
    <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-black">
      <Image
        src={image}
        alt="Teams"
        className="h-full w-full object-cover object-center"
        width={200}
        height={200}
        layout="fill"
      />
    </div>
  );
};

const Goals = ({ goal, setCreateTeamPanel }) => {
  return (
    <>
      {goal === 'HIRE' && (
        <div className="relative mb-8 w-full gap-4 px-4 sm:mb-10 md:px-0 lg:flex">
          <div className="w-full items-center justify-between space-y-4 rounded-md bg-base-200/40 px-4 py-4 dark:bg-base-800 md:space-y-0 md:px-8 lg:flex">
            <div className="flex flex-col space-y-4 md:w-2/3">
              <div className="flex items-end space-x-6">
                <h4 className="text-xl font-bold md:text-2xl">
                  Looking to hire developers?
                </h4>
              </div>
              <div className="text-sm text-base-400">
                Team profiles make strong connections with people looking to
                collaborate or find work by introducing them to the people and
                personalities on your team they would be working with day to
                day. Create your team profile on one of the fastest growing dev
                communities on the web.
              </div>
            </div>
            <div className="flex flex-col justify-end space-y-6">
              <button
                className="btn-primary"
                onClick={() => setCreateTeamPanel(true)}
              >
                Create a Team Profile
              </button>
              <div className="flex items-center -space-x-2 md:justify-end">
                {images.map((image, index) => (
                  <ImageSample image={image} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {goal === 'FIND_WORK' && (
        <Link href="/account/settings/jobpreferences">
          <div className="relative mx-auto mb-8 w-full max-w-screen-lg cursor-pointer gap-4 px-4 sm:mb-10 md:px-0 lg:flex">
            <div className="w-full items-center justify-between space-y-4 rounded-md border border-base-300/40 bg-base-200/40 px-4 py-3 dark:border-base-700 dark:bg-base-900 md:space-y-0 md:px-4 lg:flex">
              <div className="flex flex-col space-y-4 md:w-2/3">
                <div className="flex items-end space-x-6">
                  <h4 className="text-xl font-medium md:text-2xl">
                    Looking for work opportunties?
                  </h4>
                </div>
                <div className="text-sm text-base-600 dark:text-base-300">
                  The Full Stack can help you find and connect to tech teams
                  matched to your preferences. Set the criteria for matches
                  based upon your profile in your work preferences. Your details
                  are private by default and not displayed on your profile -{' '}
                  <span className="font-bold">No recruiter spam</span>.
                </div>
              </div>
              <div className="flex flex-col justify-end space-y-6">
                <button className="btn btn-sm btn-secondary">
                  Set your preferences
                </button>
                <div className="flex items-center -space-x-2 md:justify-end">
                  {images.map((image, index) => (
                    <ImageSample image={image} key={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Goals;
