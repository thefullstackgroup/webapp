import Link from 'next/link';

const Footer = () => {
  return (
    <div className="w-full mt-6 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0  md:space-x-10 text-sm text-slate-400 text-center mb-20">
      <Link href="/" passHref>
        <a href="">Home</a>
      </Link>
      <Link href="/privacy-policy" passHref>
        <a href="">Privacy Policy</a>
      </Link>
      <Link href="/cookie-policy" passHref>
        <a href="">Cookie Policy</a>
      </Link>
      <Link href="/code-of-conduct" passHref>
        <a href="">Code of Conduct</a>
      </Link>
      <a
        href={`${process.env.BASEURL}/resources/contact/general`}
        target="_blank"
        rel="noreferrer"
      >
        Need Help?
      </a>
    </div>
  );
};

export default Footer;
