import { useTheme } from "next-themes";
import { CgSpinner } from "react-icons/cg";
import Icon from "components/common/elements/Icon";
import Image from "next/future/image";

const Header = ({
  isPublished,
  setShowSettings,
  handleSavePost,
  setIsDiscardPromptOpen,
  saving,
}) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {!isPublished && (
        <div className="w-full cursor-pointer bg-red-500 py-3 px-4 text-center font-normal text-base-100 md:px-8">
          This project is{" "}
          <span className="font-bold text-base-200">unpublished</span> and not
          visible to anyone.
        </div>
      )}
      <div className="sticky top-0 z-40 border-b border-base-200 bg-base-50 dark:border-base-700 dark:bg-base-900">
        <div className="left-0 mx-auto w-full max-w-screen-lg py-2 px-4">
          <div className="sticky top-0 flex items-center justify-between">
            <div className="mt-1 h-9 w-9 cursor-pointer overflow-hidden rounded-sm">
              <Image
                src={
                  currentTheme === "dark"
                    ? "/assets/icons/thefullstack-dark.webp"
                    : "/assets/icons/thefullstack-light.webp"
                }
                className="object-center"
                alt="The Full Stack"
                width={200}
                height={200}
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="btn btn-ghost px-0"
                onClick={() => setShowSettings(true)}
              >
                <Icon name="FiSettings" />
              </button>

              <button
                className="btn btn-ghost"
                onClick={() => handleSavePost(true)}
              >
                {saving ? (
                  <>
                    <CgSpinner className="h-4 w-4 animate-spin" />
                    <span>Saving ...</span>
                  </>
                ) : (
                  <span>Save draft</span>
                )}
              </button>

              <button
                className="btn btn-primary"
                onClick={() => setShowSettings(true)}
              >
                Publish
              </button>

              <button
                className="btn btn-ghost px-0"
                onClick={() => setIsDiscardPromptOpen(true)}
              >
                <Icon name="FiX" className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
