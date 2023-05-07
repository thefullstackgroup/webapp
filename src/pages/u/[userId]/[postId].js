import axios from 'axios';
import Meta from 'components/common/partials/Metadata';
import Layout from 'components/common/layout/LayoutLoggedIn';
import Project from 'components/modules/project/Main';
import { FaRegSadTear } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/future/image';

const ProjectNotFound = () => {
  return (
    <div className="w-full pb-20">
      <div className="flex flex-col w-auto text-center space-y-4 mb-28 px-8">
        <h2 className="text-2xl lg:text-5xl font-bold tracking-tight mt-40">
          Oops! Project not found.
        </h2>
        <p className="text-base lg:text-lg text-slate-400">
          Sorry, this user may have moved or deleted this project.
        </p>
        <FaRegSadTear className="my-20 h-28 w-auto text-slate-400" />
        <p className="text-lg text-slate-400">
          <Link href="/">
            <button className="btn-primary mt-10">Back to home</button>
          </Link>
        </p>
      </div>
    </div>
  );
};

const Post = ({ author, project }) => {
  return (
    <>
      {project != null && (
        <>
          <Meta
            title={`${project.projectName}`}
            description={`${author.name} (${author.currentTitle}) | ${project.projectName}`}
            keywords=""
            openGraphImage={project.projectImgURI || ''}
          />
          <div className="max-w-screen-2xl mx-auto">
            <div className="lg:px-0 xl:px-4 2xl:px-0">
              <div className="z-30 w-full px-4 sm:px-8 py-2 sm:py-3 bg-black/90 border border-tfsdark-700 flex items-center space-x-4 text-base font-semibold">
                <Link href="/" passHref>
                  <div className="flex items-center cursor-pointer space-x-4">
                    <span className="w-10 h-10 py-1">
                      <Image
                        src="/assets/icons/thefullstack.webp"
                        className="object-contain hover:opacity-100 duration-300"
                        alt="The Full Stack"
                        width={200}
                        height={200}
                      />
                    </span>
                  </div>
                </Link>
                <Link href="/">
                  <button className="duration-300 text-white hover:text-white">
                    The Full Stack
                  </button>
                </Link>
              </div>
            </div>
            <Project project={project} user={null} />
          </div>
        </>
      )}

      {project === null && (
        <Layout>
          <ProjectNotFound />
        </Layout>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const userId = context.params.userId;
  const postId = context.params.postId;

  const author = await axios
    .get(
      `${process.env.API_PROFILE_URL}/profile/user/${encodeURIComponent(
        userId
      )}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error?.response.status;
    });

  if (author?.data !== undefined) {
    const project = await axios
      .get(
        `${process.env.API_PROJECTS_URL}/project/${encodeURIComponent(
          postId
        )}/user/${encodeURIComponent(author.data.displayName)}`
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error?.response.status;
      });

    if (project?.data !== undefined) {
      return {
        props: {
          author: author.data,
          project: project.data,
        },
      };
    }
  }

  return {
    props: {
      author: null,
      project: null,
    },
  };
}

export default Post;
