import { useState } from 'react';
import dynamic from 'next/dynamic';

const Meta = dynamic(() => import('components/common/partials/Metadata'));
const LayoutLoggedOut = dynamic(() =>
  import('components/common/layout/LayoutLoggedOut')
);
const Page = dynamic(() => import('components/modules/static/OurStory'));
const SignUpModal = dynamic(() => import('components/modules/signup/Modal'));

const OurStory = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      <Meta
        title="The Full Stack | Discover and connect with developers sharing their work."
        description="A community and network to discover and connect with developers around the globe."
        keywords="developer, social network, developers, software engineering, full stack, software engineering network, tech community, tech companies, best tech companies, developer portfolio, developer network, professional network, professional community"
      />
      <LayoutLoggedOut setShowSignupModal={setShowSignupModal}>
        <Page />
      </LayoutLoggedOut>

      {showSignupModal && (
        <SignUpModal show={showSignupModal} setShow={setShowSignupModal} />
      )}
    </>
  );
};

export default OurStory;
