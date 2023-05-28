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
      <div className="mt-0 flex w-full justify-center lg:mt-12">
        <div className="w-full px-0 md:ml-6 lg:ml-20 lg:max-w-full xl:ml-52 xl:px-4 2xl:ml-56 2xl:px-0">
          <div className="relative mx-auto max-w-4xl">
            <div className="mx-4 space-y-6 md:mx-0">
              <div className="mb-4 hidden items-center space-x-2 px-4 sm:flex md:px-0">
                <IoPerson className="h-5 w-5" />
                <h2 className="text-sm font-bold">{user.name}</h2>
              </div>

              <div className="relative w-min whitespace-nowrap">
                <h2 className="text-3xl font-bold tracking-tight sm:text-3xl">
                  Account settings
                </h2>
              </div>
              <div className="pb-20">
                {settingsOptions.map((option, index) => (
                  <Link href={option.href} key={index}>
                    <button className="mb-4 flex w-full items-center justify-between rounded-lg bg-base-700 px-4 py-4 hover:bg-base-600/50 sm:px-6 md:mx-0">
                      <div className="flex flex-col text-left">
                        <span className="font-bold">{option.label}</span>
                        <span className="text-sm text-slate-400 sm:text-base">
                          {option.desc}
                        </span>
                      </div>
                      <div className="pl-6">
                        <IoChevronForward className="h-6 w-6 text-white" />
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
