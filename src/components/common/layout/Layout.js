import Header from 'components/common/layout/Header';
import Footer from 'components/common/layout/Footer';
import CreatePostModal from 'components/modules/create/CreatePostModal';
import { useState } from 'react';

const Layout = ({
  user,
  children,
  headerFixed,
  hideFooter,
  fullWidth = false,
}) => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  return (
    <>
      <main className="min-h-screen bg-base-200/50 dark:bg-black">
        <Header
          user={user}
          headerFixed={headerFixed}
          setShowCreatePost={setShowCreatePost}
        />
        <div className={!fullWidth && 'mx-auto max-w-screen-2xl px-4'}>
          {children}
        </div>
        <Footer hideFooter={hideFooter} />
      </main>

      <CreatePostModal
        user={user}
        show={showCreatePost}
        setShow={setShowCreatePost}
      />
    </>
  );
};

export default Layout;
