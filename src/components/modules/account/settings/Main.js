import Menu from './Menu';

const settingsOptions = [
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
      <div className="mx-auto mt-0 w-full max-w-5xl justify-center lg:mt-6">
        <div className="hidden w-full py-4 text-4xl font-medium tracking-tight sm:block">
          Account settings
        </div>
        <div className="flex items-start space-x-4">
          <Menu />
          <div>HERE</div>
        </div>
      </div>
    </>
  );
};

export default Main;
