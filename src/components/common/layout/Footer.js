import Link from 'next/link';
import CookieConsent from 'react-cookie-consent';
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

const links = [
  {
    url: 'https://developer.thefullstack.network',
    label: 'Developer API',
    newWindow: true,
  },
  { url: '/about/our-story', label: 'About', newWindow: false },
  {
    url: 'https://cdn.forms-content.sg-form.com/9d844234-926d-11ed-b182-82896c15a735',
    label: 'Newsletter',
    newWindow: true,
  },
  { url: '/privacy', label: 'Privacy', newWindow: false },
  { url: '/cookie-policy', label: 'Cookie Policy', newWindow: false },
  { url: '/code-of-conduct', label: 'Code of Conduct', newWindow: false },
  {
    url: `${process.env.BASEURL}/resources/contact/general`,
    label: 'Contact',
    newWindow: true,
  },
];

const socials = [
  {
    url: 'https://www.linkedin.com/company/thefullstacknetwork',
    label: 'LinkedIn',
  },
  { url: 'https://instagram.com/thefullstacknetwork/', label: 'Instagram' },
  { url: 'https://twitter.com/thefullstacknet', label: 'Twitter' },
  { url: 'https://github.com/thefullstackgroup', label: 'GitHub' },
];

const Footer = ({ hideFooter }) => {
  return (
    <>
      {!hideFooter && (
        <footer className="relative border-t border-base-200 bg-base-50 dark:border-base-700/70 dark:bg-base-900">
          <div className="mx-auto max-w-5xl py-12 px-4 md:px-10 lg:py-16">
            <div className="flex w-full flex-col justify-center space-y-4">
              <ul className="flex flex-wrap items-center justify-center gap-2 lg:gap-6">
                {links.map((link, index) => (
                  <li className="whitespace-nowrap" key={index}>
                    {link.newWindow ? (
                      <a
                        href={link.url}
                        className="ftr-link"
                        target="_blank"
                        rel="noreferrer"
                        title={link.label}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.url} passHref>
                        <a href="#" className="ftr-link">
                          {link.label}
                        </a>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="flex justify-center space-x-6">
                {socials.map((social, index) => (
                  <a
                    href={social.url}
                    className="ftr-link-icon"
                    target="_blank"
                    rel="noreferrer"
                    title={social.label}
                    key={index}
                  >
                    <span className="sr-only">{social.label}</span>
                    {social.label === 'LinkedIn' && (
                      <FaLinkedin className="h-6 w-6" />
                    )}
                    {social.label === 'Instagram' && (
                      <FaInstagram className="h-6 w-6" />
                    )}
                    {social.label === 'Twitter' && (
                      <FaTwitter className="h-6 w-6" />
                    )}
                    {social.label === 'GitHub' && (
                      <FaGithub className="h-6 w-6" />
                    )}
                  </a>
                ))}
              </div>
              <p className="mt-8 w-full text-center text-xs text-gray-400 dark:text-gray-500">
                &copy; {new Date().getFullYear()} The Full Stack.
              </p>
            </div>
          </div>
        </footer>
      )}

      <CookieConsent
        disableStyles={true}
        location="bottom"
        containerClasses="bg-gray-800 fixed bottom-0 z-50 w-full flex py-2 px-4 items-center justify-between"
        contentClasses="relative max-w-full text-white text-sm md:text-base"
        buttonClasses="inline-flex ml-10 px-6 py-2 border-2 border-white text-sm font-bold rounded-md duration-200 text-white bg-transparent hover:bg-gray-600 hover:border-white"
        buttonText="OK"
      >
        Please note we use cookies to improve your experience. If you are happy,
        click OK.
      </CookieConsent>
    </>
  );
};

export default Footer;
