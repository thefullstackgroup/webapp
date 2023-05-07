import { useState } from 'react';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import SocialShareLinks from 'components/common/elements/SocialShareLinks';
import { IoHeart } from 'react-icons/io5';

const InviteFriends = ({ user }) => {
  const [isCopied, setIsCopied] = useState(false);

  const getReferralLink = () => {
    return `${process.env.BASEURL}/invite/${user.usersReferralCode}`;
  };

  return (
    <>
      <div className="mt-4 md:mt-12 flex">
        <div className="w-full max-w-2xl lg:max-w-3xl overflow-hidden mx-auto">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl relative">
            <div className="flex justify-between pb-20">
              <div className="sm:pr-6 space-y-6 md:space-y-10 text-center text-xl">
                <h2 className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-2 items-center mt-4 lg:mt-8 font-extrabold tracking-tighter text-4xl lg:text-6xl">
                  <span>Invite your friends</span>
                  <IoHeart className="text-red-600 h-16 w-16" />
                </h2>
                <p className="text-gray-300">
                  We are super proud of this community and we love the vibe it
                  has going on, and this is all down to people like you who see
                  it that way. Invite your friends to thefullstack using your
                  personal invite link below.
                </p>
                <div className="mt-8 mb-10 text-gray-600">
                  <div
                    className="focus:placeholder-gray-300 placeholder-gray-400 w-full focus:ring-2 focus:ring-gray-600 focus:border-transparent focus:outline-none rounded-md border-2 border-green-900/50 px-3 py-3 font-mono text-lg text-green-500 cursor-pointer shadow-md shadow-green-900/90 inline-flex break-all justify-center"
                    onClick={() => {
                      navigator.clipboard.writeText(getReferralLink());
                      setIsCopied(true);
                      sendSlackMessage(`Copied their invite link.`);
                    }}
                  >
                    {getReferralLink()}
                  </div>
                  {isCopied && (
                    <span className="text-xs font-semibold uppercase text-green-500">
                      Copied to clipboard!
                    </span>
                  )}
                </div>
                <p className="mt-8">
                  <span className="font-bold">
                    Help spread the word. Tweet your invite link, tag
                    @thefullstacknet Twitter handle.
                  </span>
                </p>

                <p className="mb-8 text-xl text-gray-300">
                  Or click a social channel below to share your invite link
                </p>
                <div className="flex justify-center text-xl text-gray-600 mx-auto sm:mx-0">
                  <SocialShareLinks
                    link={getReferralLink()}
                    title="I joined the @thefullstacknet community today. You can join using my invite link below."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InviteFriends;
