import {
  FaReddit,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLinkedin,
} from 'react-icons/fa';
import {
  RedditShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'next-share';

const SocialShareLinks = ({ link, title }) => {
  const defaultDimensions = {
    height: 460,
    width: 660,
  };

  return (
    <div className="flex space-x-4">
      <RedditShareButton
        url={link}
        title={title}
        windowWidth={defaultDimensions.width}
        windowHeight={defaultDimensions.height}
      >
        <div className="w-14 rounded-xl bg-red-600 px-3 py-3">
          <FaReddit className="mx-auto h-7 w-7 text-white" />
        </div>
        <div className="mt-2 text-xs text-base-400">Reddit</div>
      </RedditShareButton>
      <FacebookShareButton url={link} quote={title}>
        <div className="w-14 rounded-xl bg-blue-600 px-3 py-3">
          <FaFacebook className="mx-auto h-7 w-7 text-white" />
        </div>
        <div className="mt-2 text-xs text-base-400">Facebook</div>
      </FacebookShareButton>
      <TwitterShareButton url={link} title={title}>
        <div className="w-14 rounded-xl bg-blue-500 px-3 py-3">
          <FaTwitter className="mx-auto h-7 w-7 text-white" />
        </div>
        <div className="mt-2 text-xs text-base-400">Twitter</div>
      </TwitterShareButton>
      <WhatsappShareButton url={link} title={title}>
        <div className="w-14 rounded-xl bg-green-500 px-3 py-3">
          <FaWhatsapp className="mx-auto h-7 w-7 text-white" />
        </div>
        <div className="mt-2 text-xs text-base-400">Whatsapp</div>
      </WhatsappShareButton>{' '}
      <LinkedinShareButton url={link} title={title}>
        <div className="w-14 rounded-xl bg-blue-500 px-3 py-3">
          <FaLinkedin className="mx-auto h-7 w-7 text-white" />
        </div>
        <div className="mt-2 text-xs text-base-400">LinkedIn</div>
      </LinkedinShareButton>
    </div>
  );
};

export default SocialShareLinks;
