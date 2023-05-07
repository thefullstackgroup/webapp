import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaLaptop,
  FaDev,
} from 'react-icons/fa';
import { SiHashnode, SiMedium } from 'react-icons/si';

const Social = ({ social }) => {
  return (
    <div className="flex space-x-4 md:space-x-5 items-center justify-start">
      {social && social?.personalWebsite && (
        <a
          href={social?.personalWebsite}
          className="text-slate-400 hover:text-white group"
          target="_blank"
          rel="noreferrer"
          title="Personal Website"
        >
          <FaLaptop className="w-5 h-5 md:w-6 md:h-6 sm:group-hover:scale-110 duration-200" />
        </a>
      )}

      {social?.bio?.gitHubAccount && (
        <a
          href={`https://github.com/${social?.bio?.gitHubAccount}`}
          className="text-slate-400 hover:text-white group"
          target="_blank"
          rel="noreferrer"
          title="GitHub"
        >
          <FaGithub className="w-5 h-5 md:w-6 md:h-6 sm:group-hover:scale-110 duration-200" />
        </a>
      )}

      {social?.bio?.devToAccount && (
        <a
          href={`https://dev.to/${social?.bio?.devToAccount}`}
          className="text-slate-400 hover:text-white group"
          target="_blank"
          rel="noreferrer"
          title="Dev"
        >
          <FaDev className="w-5 h-5 md:w-6 md:h-6 sm:group-hover:scale-110 duration-200" />
        </a>
      )}

      {social?.bio?.hashNodeAccount && (
        <a
          href={`https://hashnode.com/@${social?.bio?.hashNodeAccount}`}
          className="text-slate-400 hover:text-white group"
          target="_blank"
          rel="noreferrer"
          title="Hashnode"
        >
          <SiHashnode className="w-5 h-5 md:w-6 md:h-6 sm:group-hover:scale-110 duration-200" />
        </a>
      )}

      {social?.bio?.mediumAccount && (
        <a
          href={`https://medium.com/${social?.bio?.mediumAccount}`}
          className="text-slate-400 hover:text-white group"
          target="_blank"
          rel="noreferrer"
          title="Medium"
        >
          <SiMedium className="w-5 h-5 md:w-6 md:h-6 sm:group-hover:scale-110 duration-200" />
        </a>
      )}

      {social && social?.bio?.linkedInAccount && (
        <a
          href={social?.bio?.linkedInAccount}
          className="text-slate-400 hover:text-white group"
          target="_blank"
          rel="noreferrer"
          title="LinkedIn"
        >
          <FaLinkedin className="w-5 h-5 md:w-6 md:h-6 sm:group-hover:scale-110 duration-200" />
        </a>
      )}

      {social?.bio?.facebookAccount && (
        <a
          href={social?.bio?.facebookAccount}
          className="text-slate-400 hover:text-white group"
          target="_blank"
          rel="noreferrer"
          title="Facebook"
        >
          <FaFacebook className="w-5 h-5 md:w-6 md:h-6 sm:group-hover:scale-110 duration-200" />
        </a>
      )}

      {social?.bio?.instagramAccount && (
        <a
          href={social?.bio?.instagramAccount}
          className="text-slate-400 hover:text-white group"
          target="_blank"
          rel="noreferrer"
          title="Instagram"
        >
          <FaInstagram className="w-5 h-5 md:w-6 md:h-6 sm:group-hover:scale-110 duration-200" />
        </a>
      )}

      {social?.bio?.twitterAccount && (
        <a
          href={social?.bio?.twitterAccount}
          className="text-slate-400 hover:text-white group"
          target="_blank"
          rel="noreferrer"
          title="Twitter"
        >
          <FaTwitter className="w-5 h-5 md:w-6 md:h-6 sm:group-hover:scale-110 duration-200" />
        </a>
      )}
    </div>
  );
};

export default Social;
