import { FaReddit, FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import {
  RedditShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
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
        <div className="bg-red-600 py-3 px-3 rounded-xl w-14">
          <FaReddit className="w-7 h-7 text-white mx-auto" />
        </div>
        <div className="text-xs text-slate-400 mt-2">Reddit</div>
      </RedditShareButton>

      <FacebookShareButton url={link} quote={title}>
        <div className="bg-blue-600 py-3 px-3 rounded-xl w-14">
          <FaFacebook className="w-7 h-7 text-white mx-auto" />
        </div>
        <div className="text-xs text-slate-400 mt-2">Facebook</div>
      </FacebookShareButton>

      <TwitterShareButton url={link} title={title}>
        <div className="bg-blue-500 py-3 px-3 rounded-xl w-14">
          <FaTwitter className="w-7 h-7 text-white mx-auto" />
        </div>
        <div className="text-xs text-slate-400 mt-2">Twitter</div>
      </TwitterShareButton>

      <WhatsappShareButton url={link} title={title}>
        <div className="bg-green-500 py-3 px-3 rounded-xl w-14">
          <FaWhatsapp className="w-7 h-7 text-white mx-auto" />
        </div>
        <div className="text-xs text-slate-400 mt-2">Whatsapp</div>
      </WhatsappShareButton>
    </div>
  );
};

export default SocialShareLinks;
