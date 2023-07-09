import Link from 'next/link';

const menuOptions = [
  {
    label: 'Work preferences',
    desc: 'Set your work preferences',
    href: '/account/settings/jobpreferences',
  },
  // {
  //   label: 'Notification Preferences',
  //   desc: 'Configure your email notification preferences.',
  //   href: '/account/settings/notifications',
  // },
  {
    label: 'Request data',
    desc: 'Download an archive of your data anytime.',
    href: '/account/settings/archive',
  },
  {
    label: 'Danger zone',
    desc: 'Want to delete your account?',
    href: '/account/settings/danger',
  },
];

const Menu = ({ selected }) => {
  return (
    <div className="flex flex-col space-y-2">
      {menuOptions.map((option, index) => (
        <Link href={option.href} key={index}>
          <button
            className={
              'btn btn-ghost px-0 text-left font-normal ' +
              (selected === option.label &&
                'text-base-900 hover:text-base-900 dark:text-white dark:hover:text-white')
            }
          >
            {option.label}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
