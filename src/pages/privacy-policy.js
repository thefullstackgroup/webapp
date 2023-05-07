import { useState } from 'react';
import dynamic from 'next/dynamic';

const Meta = dynamic(() => import('components/common/partials/Metadata'));
const LayoutLoggedOut = dynamic(() =>
  import('components/common/layout/LayoutLoggedOut')
);
const Page = dynamic(() =>
  import('components/modules/static/policies/PrivacyPolicy')
);
const SignUpModal = dynamic(() => import('components/modules/signup/Modal'));

const PrivacyPolicy = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      <Meta
        title="The Full Stack | Privacy policy."
        description="A community and network to discover and connect with developers around the globe."
        keywords="developer, social network, developers, software engineering, full stack, software engineering network, tech community, tech companies, best tech companies, developer portfolio, developer network, professional network, professional community"
      />
      <LayoutLoggedOut setShowSignupModal={setShowSignupModal}>
        <div className="pt-10 sm:pt-28">
          <Page />
        </div>
      </LayoutLoggedOut>

      {showSignupModal && (
        <SignUpModal show={showSignupModal} setShow={setShowSignupModal} />
      )}
    </>
  );
};

export default PrivacyPolicy;
