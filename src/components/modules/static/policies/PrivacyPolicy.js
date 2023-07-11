import Image from 'next/future/image';

const PrivacyPolicy = () => {
  return (
    <div className="bg-black">
      <div className="fixed top-0 left-0 mx-auto mt-12 flex min-h-screen w-full justify-between bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-base-300/40 via-black to-base-900"></div>
      <div className="relative z-10 mx-auto mb-20 max-w-4xl">
        <div className="mb-10 space-y-6 px-4 pt-14 text-center sm:mb-28 md:pt-10 lg:px-0">
          <h1 className="text-3xl font-bold tracking-tighter text-base-100 md:text-6xl">
            Privacy Policy
          </h1>
          <p>Last updated: February 13th 2023</p>
        </div>

        <div className="prose prose-dark max-w-full space-y-4 px-4">
          <div className="pb-20">
            <p className="text-lg">
              <blockquote>
                TLDR; You own your data. We want to be as transparent as
                possible. We are a community and platform that wants to earn
                your trust and help you own, build and strengthen your developer
                network.
              </blockquote>
            </p>

            <p>Hey there! 👋</p>
            <p>
              My name is Noel Maher and I&apos;m one of the founders of The Full
              Stack. I maintain our privacy policy so if you have any questions
              or ideas on how we can make The Full Stack or this policy better
              please let me know. You can email me at any time, send me a DM on
              the site or you can find me on{' '}
              <a
                href="https://twitter.com/danoely_"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>{' '}
              or{' '}
              <a
                href="https://www.linkedin.com/in/noelmaher/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              .
            </p>
            <p>
              We are building The Full Stack because we believe in the power of
              building your own network. We believe showing off what you can
              build and expressing your developer story yields results. And
              importantly, we believe in human connection, resulting in a better
              and more inclusive experience for all. In order to harness this,
              we want to help you own, build and strengthen your developer
              network. This document, and our privacy values in general, are all
              focused on how we do that in a way that respects, and hopefully
              enhances, your privacy.
            </p>
            <p>
              We will request your permission to use YOUR data at times to help
              you succeed. We will never ask or want to own your data. We will
              try to always protect your data like it&apos;s our own, but we
              never want to own your data. Instead, we want to OWN your trust.
            </p>
            <p>
              While today we are a young startup, we envisage building more and
              more of the technology within the open source community. In doing
              so will help this platform benefit all of its users in the best
              way possible.
            </p>
            <p>
              Finally - we will make mistakes and we will miss things. Apologies
              in advance and we will work to fix these and keep you updated. We
              don&apos;t see privacy, data legislation, governance etc... as
              cost centres or a tick the box exercise. We see protecting your
              privacy as part of our core USP and our own durable advantage.
            </p>
            <p>Thank you for being part of this.</p>
            <p>
              Cheers, <br />
              Noel
            </p>
            <div className="h-20 w-20 md:h-32 md:w-32">
              <Image
                src="/assets/landing/about/noel.webp"
                className="h-full w-full overflow-hidden rounded-lg object-cover grayscale"
                alt="Noel"
                width={800}
                height={800}
                layout="fill"
              />
            </div>
          </div>
          <h3 className="text-xl font-semibold">
            What information does The Full Stack collect and why?
          </h3>
          <p>
            In order to give you the best possible experience using The Full
            Stack, we collect information from your interactions with our
            network. We use common internet technologies, such as cookies and
            web server logs. We collect this basic information from everybody,
            whether they have an account or not.
          </p>
          <p>
            The information we collect about all visitors to our website
            includes:
          </p>
          <ul>
            <li>The visitor&apos;s browser type</li>
            <li>Referring site</li>
            <li>The date and time of each visitor request</li>
            <li>
              We also collect potentially personally-identifying information
              like Internet Protocol (IP) addresses.
            </li>
          </ul>

          <p>We use this information to:</p>
          <ul>
            <li>
              Provide, test, improve, promote and personalize The Full Stack
              community experience and services we offer
            </li>
            <li>Fight spam and other forms of abuse</li>
            <li>
              Generate aggregate, non-identifying information about how people
              use The Full Stack
            </li>
          </ul>

          <p>
            In order for you to create an account on The Full Stack and use our
            Platform, we need to collect and process certain information.
            Depending on your use of the Services, that may include:
          </p>
          <ul>
            <li>
              Communications you send to us (for example, when you ask for
              support, send us questions or comments, or report a problem);
            </li>
            <li>
              Information that you submit on or to The Full Stack in the form of
              reactions, comments, or messages to other users;
            </li>
            <li>
              The email address associated with your Google account, if you
              choose to sign up using your Google credentials. The Full Stack
              will also request permission to access additional information
              (these permissions are governed by Google&apos;s privacy policies
              and can be managed through your Google privacy settings). We never
              post anything to your Google account without your permission.
            </li>
            <li>
              The email address associated with your GitHub account, if you
              choose to sign up using your Github credentials. The Full Stack
              will also request permission to access additional information
              (these permissions are governed by GitHub&apos;s privacy policies
              and can be managed through your GitHub privacy settings). We never
              post anything to your GitHub without your permission.
            </li>
            <li>
              The email address associated with your LinkedIn account, if you
              choose to sign up using your LinkedIn credentials. The Full Stack
              will also request permission to access additional information
              (these permissions are governed by LinkedIn&apos;s privacy
              policies and can be managed through your LinkedIn privacy
              settings). We never post anything to your LinkedIn without your
              permission.
            </li>
            <li>
              You also have the option to give us more information if you want
              to, and this may include “User Personal Information.”
            </li>
          </ul>
          <h3 className="text-xl font-semibold">Information Disclosure</h3>
          <p>
            We do not share, sell, rent, or trade User Personal Information with
            third parties for commercial purposes.
          </p>
          <p>
            We do share certain aggregated, non-personally identifying
            information with others about how our users, collectively, use The
            Full Stack. For example, we may share information pertaining to the
            popularity of different programming languages for advertising
            partners.
          </p>
          <p>
            We may use User Personal Information with your permission, so we can
            perform services you have authorized.
          </p>
          <p>
            We may share User Personal Information with a limited number of
            third party vendors who process it on our behalf to provide or
            improve our service, and who have agreed to privacy restrictions
            similar to our own Privacy Statement. Our third party vendors are
            listed below.
          </p>
          <h3 className="text-xl font-semibold">Third Party Vendors</h3>
          <p>
            <span className="font-bold">
              We may share your account information with third parties in some
              circumstances, including:
            </span>{' '}
            (1) with your consent; (2) to a service provider or partner who
            meets our data protection standards; (3) for survey or research
            purposes, after aggregation, anonymization, or pseudonymization; (4)
            when we have a good faith belief it is required by law, such as
            pursuant to a subpoena or other legal process; (5) when we have a
            good faith belief that doing so will help prevent imminent harm to
            someone.
          </p>
          <p className="font-bold">Data Storage</p>
          <p>
            The Full Stack uses third-party vendors and hosting partners for
            hardware, software, networking, storage, and related technology we
            need to run The Full Stack. By using The Full Stack, you authorize
            The Full Stack to transfer, store, and use your information in the
            EU and any other country where we operate. All service providers and
            third-party vendors are required to meet our data protection
            standards.
          </p>
          <p className="font-bold">Site Monitoring</p>
          <p>
            The Full Stack uses a variety of third-party services to diagnose
            errors and improve the performance of our site. We aim to minimize
            the amount of personal information shared, but the information may
            include your IP address or other identifying information. All
            service providers and third-party vendors are required to meet our
            data protection standards.
          </p>
          <p className="font-bold">Payment Processing</p>
          <p>
            The Full Stack does not process payments directly — we rely on
            third-party services from Stripe to receive payments and store any
            payment information.
          </p>
          <p className="font-bold">Third-Party Embeds</p>
          <p>
            Some of the content that you see displayed on The Full Stack is not
            hosted by The Full Stack. These “embeds” are hosted by a third-party
            and embedded in The Full Stack. For example: YouTube videos,
            Codepens, Twitter tweets, or GitHub code that appear within a The
            Full Stack post. These files send data to the hosted site just as if
            you were visiting that site directly (for example, when you load a
            The Full Stack post page with a YouTube video embedded in it,
            YouTube receives data about your activity). The Full Stack does not
            control what data third parties collect in cases like this, or what
            they will do with it. Third-party embeds on The Full Stack are not
            covered by this privacy policy; they are covered by the privacy
            policy of the third-party service. Be mindful when interacting with
            these services.
          </p>
          <p className="font-bold">Tracking and Cookies</p>
          <p>
            We use browser cookies and similar technologies to recognize you
            when you return to our Services. Third-party vendors may also use
            cookies for various reasons.
          </p>
          <p>
            The Full Stack uses a specific cookie in order to facilitate the use
            of Google Universal Analytics for users logged-in to the
            Applications or the Platforms (“Logged-In User). If you are a
            Logged-In User, The Full Stack may use your The Full Stack user ID
            in combination with Google Universal Analytics and Google Analytics
            to track and analyze the pages of the Services you visit. We do this
            only to better understand how you use the Website and the other
            Services, with a view to offering improvements for all The Full
            Stack users; and to tailor our business and marketing activities
            accordingly, both generally and specifically to you. Google
            Analytics cookies do not provide The Full Stack with any Personal
            Information. You can prevent Google Analytics from recognizing you
            on return visits to this site by disabling cookies on your browser.
          </p>
          <p>
            You may opt-out of this feature by installing the Google Analytics
            Opt-out Browser Add-on, by setting your web browser to refuse
            cookies, or by setting your browser to alert you when cookies are
            being sent. If you do so, note that some parts of the Site may not
            function properly.
          </p>
          <p className="font-bold">Data Security</p>
          <p>
            We use encryption (HTTPS/TLS) to protect data transmitted to and
            from our site. However, no data transmission over the Internet is
            100% secure, so we cannot guarantee security. You use the Service at
            your own risk, and you&apos;re responsible for taking reasonable
            measures to secure your account.
          </p>
          <p className="font-bold">Administrative Emails from The Full Stack</p>
          <p>
            Sometimes we&apos;ll send you emails about your account, service
            changes or new policies. You cannot opt out of this type of
            “transactional” emails (unless you delete your account).
          </p>
          <p>
            When you interact with a transactional email sent from The Full
            Stack (such as opening an email or clicking on a particular link in
            an email), we may receive information about that interaction.
          </p>
          <p className="font-bold">
            Non-administrative Emails from The Full Stack
          </p>
          <p>
            Upon creating a The Full Stack account, you will be opted into The
            Full Stack Newsletter and other non-administrative email. Your email
            address and fist name may be stored by a third-party email provider
            Sendgrid. You can opt out of non-administrative emails such as
            newsletters, and activity notifications through your account
            “Settings” page and at the link of the footer in any
            non-administrative email you receive from us.
          </p>
          <p>
            When you interact with a non-administrative email sent from The Full
            Stack (such as opening an email or clicking on a particular link in
            an email), we may receive information about that interaction.
          </p>
          <p className="font-bold">Deleting Your Personal Information</p>
          <p>
            You may request deletion of your personal information through your
            account “Settings” page.
          </p>
          <p>
            To protect information from accidental or malicious destruction, we
            may maintain residual copies for a brief time period. But, if you
            delete your account, your information and content will be
            unrecoverable after that time.
          </p>
          <p className="font-bold">Data Portability</p>
          <p>
            If you would like to request a copy of your user data, you may
            request this through your account “Settings” page.
          </p>
          <p className="font-bold">Changes to this Policy</p>
          <p>
            We reserve the right to revise this Privacy Policy at any time. If
            we change this Privacy Policy in the future, we will post the
            revised Privacy Policy and update the “Effective Date,” above, to
            reflect the date of the changes.
          </p>
          <p className="font-bold">Questions</p>
          <p>
            We welcome feedback about this policy at hello@thefullstack.network
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
