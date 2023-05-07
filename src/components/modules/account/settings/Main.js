import Link from 'next/link';
import { IoChevronForward, IoPerson } from 'react-icons/io5';

const settingsOptions = [
  {
    label: 'Teams',
    desc: 'Manage team profiles, invite members and post jobs.',
    href: '/account/teams',
  },
  {
    label: 'Subscriptions',
    desc: 'Manage your subscriptions',
    href: '/account/settings/subscriptions',
  },
  {
    label: 'Work Preferences',
    desc: 'Set your work preferences',
    href: '/account/settings/jobpreferences',
  },
  {
    label: 'Notification Preferences',
    desc: 'Configure your email notification preferences.',
    href: '/account/settings/notifications',
  },
  {
    label: 'Request Data Archive',
    desc: 'Download an archive of your data anytime.',
    href: '/account/settings/archive',
  },
  {
    label: 'Danger Zone',
    desc: 'Want to delete your account?',
    href: '/account/settings/danger',
  },
];

const Main = ({ user }) => {
  return (
    <>
      <div className="mt-0 lg:mt-12 w-full flex justify-center">
        <div className="w-full lg:max-w-full px-0 xl:px-4 2xl:px-0 md:ml-6 lg:ml-20 xl:ml-52 2xl:ml-56">
          <div className="relative max-w-4xl mx-auto">
            <div className="mx-4 md:mx-0 space-y-6">
              <div className="hidden sm:flex items-center space-x-2 px-4 md:px-0 mb-4">
                <IoPerson className="h-5 w-5" />
                <h2 className="font-bold text-sm">{user.name}</h2>
              </div>

              <div className="relative w-min whitespace-nowrap">
                <h2 className="text-3xl sm:text-3xl font-bold tracking-tight">
                  Account settings
                </h2>
              </div>
              <div className="pb-20">
                {settingsOptions.map((option, index) => (
                  <Link href={option.href} key={index}>
                    <button className="w-full flex items-center justify-between rounded-lg bg-tfsdark-700 mb-4 px-4 sm:px-6 py-4 md:mx-0 hover:bg-tfsdark-600/50">
                      <div className="flex flex-col text-left">
                        <span className="font-bold">{option.label}</span>
                        <span className="text-sm sm:text-base text-slate-400">
                          {option.desc}
                        </span>
                      </div>
                      <div className="pl-6">
                        <IoChevronForward className="text-white h-6 w-6" />
                      </div>
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
