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
      {goal === 'FIND_WORK' && (
        <Link href="/account/settings/jobpreferences">
          <div className="relative mx-auto mb-8 w-full max-w-screen-lg cursor-pointer gap-4 px-4 sm:mb-10 md:px-0 lg:flex">
            <div className="box items-center justify-between space-y-4 md:space-y-0 md:px-4 lg:flex">
              <div className="flex flex-col space-y-2 md:w-2/3">
                <div className="flex items-end space-x-6">
                  <h4 className="text-xl font-medium md:text-2xl">
                    Open to work opportunties?
                  </h4>
                </div>
                <div className="text-sm text-base-600 dark:text-base-300">
                  Update your work preferences in order to match your profile to
                  the right opportunities. All your details are private by
                  default and not displayed on your profile -{' '}
                  <span className="font-bold">No recruiter spam</span>.
                </div>
              </div>
              <div className="flex flex-col justify-end space-y-6">
                <button className="btn btn-sm btn-secondary">
                  Set your preferences
                </button>
                <div className="hidden items-center -space-x-2 md:justify-end lg:flex">
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
