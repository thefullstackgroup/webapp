import useSWR from 'swr';
import Avatar from 'components/common/elements/Avatar';
import fetcher from 'utils/fetcher';

const Contributors = ({ project }) => {
  const url = `${process.env.BASEURL}/api/projects/project/contributors?projectId=${project._id}`;
  const { data } = useSWR(url, fetcher);
  const contributors = data ? data.content : null;

  if (!contributors) return null;

  console.log(contributors);

  return (
    <>
      {contributors?.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {contributors.map((contributor, index) => (
            <div key={index}>
              <Avatar
                image={contributor.avatar_url}
                name={contributor.login}
                dimensions="h-10 w-10"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Contributors;
