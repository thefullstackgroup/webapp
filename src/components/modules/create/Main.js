import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Scratch from 'components/modules/create/Scratch';
import axios from 'axios';
import Loader from 'components/common/elements/Loader';

const Main = ({ user }) => {
  const router = useRouter();
  let postId = router.query.ref;
  const [loading, setLoading] = useState(false);
  const [postType, setPostType] = useState('PROJECT');
  const [postData, setPostData] = useState(null);

  const getPost = async () => {
    setLoading(true);
    await axios
      .get(`${process.env.BASEURL}/api/posts/getPostByRef?postId=${postId}`)
      .then((response) => {
        setPostData(response.data);
        setPostType(response.data.projectType);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.status);
      });
  };

  useEffect(() => {
    if (postId) getPost();
  }, [postId]);

  if (loading)
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-700">
        <Loader />
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-base-50 dark:bg-black">
        <div className="relative mx-auto w-full rounded-md">
          <Scratch user={user} postData={postData} />
        </div>
      </div>
    </>
  );
};

export default Main;
