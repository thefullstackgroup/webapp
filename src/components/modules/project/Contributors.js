import useSWR from 'swr';
import Avatar from 'components/common/elements/Avatar';
import fetcher from 'utils/fetcher';

const Contributors = ({ project }) => {
  const url = `${process.env.BASEURL}/api/projects/project/contributors?projectId=${project._id}`;
  const { data } = useSWR(url, fetcher);
  const contributors = data ? data.content : null;

  if (!contributors) return null;

  return (
    <>
      {contributors?.length > 1 && (
        <div className="mt-2 mb-4 space-y-2">
          <span className="text-sm font-medium text-base-200">
            Contributors
          </span>

          <div className="flex flex-wrap">
            {contributors.map((contributor, index) => (
              <div key={index}>
                <Avatar
                  image={contributor.avatar_url}
                  name={contributor.login}
                  dimensions="h-10 w-10 mr-3 mb-2"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Contributors;
