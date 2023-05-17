import { useState } from 'react';
import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import SignUpModal from 'components/modules/signup/Modal';

const Layout = ({ children }) => {
  const [showSignupModal, setShowSignupModal] = useState(false);

  return (
    <>
      <main>
        <Header />
        {children}
        <Footer />
      </main>

      {showSignupModal && (
        <SignUpModal show={showSignupModal} setShow={setShowSignupModal} />
      )}
    </>
  );
};

export default Layout;
