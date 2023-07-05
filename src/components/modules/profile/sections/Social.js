import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaLaptop,
  FaDev,
} from "react-icons/fa";
import { SiHashnode, SiMedium } from "react-icons/si";

const Social = ({ social }) => {
  return (
    <div className="flex items-center justify-start space-x-4">
      {social && social?.personalWebsite && (
        <a
          href={social?.personalWebsite}
          className="btn btn-ghost group px-0"
          target="_blank"
          rel="noreferrer"
          title="Personal Website"
        >
          <FaLaptop className="h-5 w-5 duration-200 sm:group-hover:scale-110 md:h-6 md:w-6" />
        </a>
      )}

      {social?.bio?.gitHubAccount && (
        <a
          href={`https://github.com/${social?.bio?.gitHubAccount}`}
          className="btn btn-ghost group px-0"
          target="_blank"
          rel="noreferrer"
          title="GitHub"
        >
          <FaGithub className="h-5 w-5 duration-200 sm:group-hover:scale-110 md:h-6 md:w-6" />
        </a>
      )}

      {social?.bio?.devToAccount && (
        <a
          href={`https://dev.to/${social?.bio?.devToAccount}`}
          className="btn btn-ghost group px-0"
          target="_blank"
          rel="noreferrer"
          title="Dev"
        >
          <FaDev className="h-5 w-5 duration-200 sm:group-hover:scale-110 md:h-6 md:w-6" />
        </a>
      )}

      {social?.bio?.hashNodeAccount && (
        <a
          href={`https://hashnode.com/@${social?.bio?.hashNodeAccount}`}
          className="btn btn-ghost group px-0"
          target="_blank"
          rel="noreferrer"
          title="Hashnode"
        >
          <SiHashnode className="h-5 w-5 duration-200 sm:group-hover:scale-110 md:h-6 md:w-6" />
        </a>
      )}

      {social?.bio?.mediumAccount && (
        <a
          href={`https://medium.com/${social?.bio?.mediumAccount}`}
          className="btn btn-ghost group px-0"
          target="_blank"
          rel="noreferrer"
          title="Medium"
        >
          <SiMedium className="h-5 w-5 duration-200 sm:group-hover:scale-110 md:h-6 md:w-6" />
        </a>
      )}

      {social && social?.bio?.linkedInAccount && (
        <a
          href={social?.bio?.linkedInAccount}
          className="btn btn-ghost group px-0"
          target="_blank"
          rel="noreferrer"
          title="LinkedIn"
        >
          <FaLinkedin className="h-5 w-5 duration-200 sm:group-hover:scale-110 md:h-6 md:w-6" />
        </a>
      )}

      {social?.bio?.facebookAccount && (
        <a
          href={social?.bio?.facebookAccount}
          className="btn btn-ghost group px-0"
          target="_blank"
          rel="noreferrer"
          title="Facebook"
        >
          <FaFacebook className="h-5 w-5 duration-200 sm:group-hover:scale-110 md:h-6 md:w-6" />
        </a>
      )}

      {social?.bio?.instagramAccount && (
        <a
          href={social?.bio?.instagramAccount}
          className="btn btn-ghost group px-0"
          target="_blank"
          rel="noreferrer"
          title="Instagram"
        >
          <FaInstagram className="h-5 w-5 duration-200 sm:group-hover:scale-110 md:h-6 md:w-6" />
        </a>
      )}

      {social?.bio?.twitterAccount && (
        <a
          href={social?.bio?.twitterAccount}
          className="btn btn-ghost group px-0"
          target="_blank"
          rel="noreferrer"
          title="Twitter"
        >
          <FaTwitter className="h-5 w-5 duration-200 sm:group-hover:scale-110 md:h-6 md:w-6" />
        </a>
      )}
    </div>
  );
};

export default Social;
