import { useState } from 'react';
import { sendSlackMessage } from 'utils/slack/sendMessageSlack';
import SocialShareLinks from 'components/common/elements/SocialShareLinks';
import Icon from 'components/common/elements/Icon';

const InviteFriends = ({ user }) => {
  const [isCopied, setIsCopied] = useState(false);

  const getReferralLink = () => {
    return `${process.env.BASEURL}/invite/${user.usersReferralCode}`;
  };

  return (
    <>
      <div className="page page-4xl my-10 lg:my-20">
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-4xl">
          <div className="flex justify-between pb-20">
            <div className="space-y-4 text-center lg:space-y-10">
              <Icon name="FiHeart" className="mx-auto h-16 w-16" />
              <h2 className="font-manrope text-4xl font-bold tracking-tighter lg:text-6xl">
                Invite your friends
              </h2>
              <p>
                We are super proud of this community and we love the vibe it has
                going on, and this is all down to people like you who see it
                that way. Invite your friends to thefullstack using your
                personal invite link below.
              </p>
              <div className="mt-8 mb-10 text-gray-600">
                <div
                  className="w-full cursor-pointer justify-center break-all rounded-md border-2 border-green-500 px-3 py-3 font-mono text-lg text-green-500 shadow-green-900/90 focus:border-transparent focus:outline-none"
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
              <p>
                Help spread the word. Tweet your invite link, tag
                @thefullstacknet Twitter handle.
              </p>

              <p>Or click a social channel below to share your invite link</p>
              <div className="mx-auto flex justify-center text-xl text-gray-600 sm:mx-0">
                <SocialShareLinks
                  link={getReferralLink()}
                  title="I joined the @thefullstacknet community today. You can join using my invite link below."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InviteFriends;
