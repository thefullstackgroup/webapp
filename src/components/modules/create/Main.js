import { useRouter } from "next/router";
import fetcher from "utils/fetcher";
import useSWR from "swr";
import Form from "components/modules/create/Form";

const Main = ({ user }) => {
  const router = useRouter();
  let postId = router.query.ref;

  const viewsURL = `${process.env.BASEURL}/api/posts/getPostByRef?postId=${postId}`;
  const { data } = useSWR(viewsURL, fetcher);

  if (!data) {
    return <div></div>;
  }

  return (
    <>
      <div className="min-h-screen bg-base-50 dark:bg-black">
        <div className="relative mx-auto w-full rounded-md">
          <Form user={user} postData={data} />
        </div>
      </div>
    </>
  );
};

export default Main;
