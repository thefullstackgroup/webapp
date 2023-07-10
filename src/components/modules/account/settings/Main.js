import Link from "next/link";
import Menu from "./Menu";
import Icon from "components/common/elements/Icon";

const settingsOptions = [
  {
    label: "Dashboard",
    desc: "View your profile stats, project stats, bookmarks and followers",
    href: "/account/dashboard",
    icon: "FiGrid",
  },
  {
    label: "Wallet",
    desc: "Your wallet contains virtual coin that you can use to reward and endorse others",
    href: "/account/wallet",
    icon: "FiCreditCard",
  },
  {
    label: "Work Preferences",
    desc: "The Full Stack can help you find and connect to tech teams with open positions matched to your preferences",
    href: "/account/settings/jobpreferences",
    icon: "FiBriefcase",
  },
  {
    label: "Notification Preferences",
    desc: "Configure your email notification preferences",
    href: "/account/settings/notifications",
    icon: "FiBell",
  },
  {
    label: "Request Your Data",
    desc: "Your data belongs to you and you can request an archive of your data anytime",
    href: "/account/settings/archive",
    icon: "FiHardDrive",
  },
  {
    label: "Danger Zone",
    desc: "Looking to delete your account?",
    href: "/account/settings/danger",
    icon: "FiAlertTriangle",
  },
];

const Main = ({ user }) => {
  return (
    <>
      <div className="page page-6xl space-y-6">
        <h2>Account settings</h2>
        <div className="grid grid-cols-3 gap-4">
          {settingsOptions.map((option, index) => (
            <Link href={option.href}>
              <div className="box box-link space-y-1 pb-4">
                <Icon name={option.icon} className="mb-4 h-8 w-8" />

                <h4>{option.label}</h4>
                <p className="text-base-300 dark:text-base-400">
                  {option.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Main;
