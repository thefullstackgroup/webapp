import { useState } from 'react';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import SignUpModal from 'components/modules/signup/Modal';

const Layout = ({ user, children, headerFixed, hideFooter }) => {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      <main className="bg-white dark:bg-black">
        <Header user={user} headerFixed={headerFixed} />
        <div className="mx-auto max-w-screen-2xl px-4">{children}</div>
        <Footer hideFooter={hideFooter} />
      </main>

      {showSignupModal && (
        <SignUpModal show={showSignupModal} setShow={setShowSignupModal} />
      )}
    </>
  );
};

export default Layout;
