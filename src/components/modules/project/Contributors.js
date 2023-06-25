import useSWR from 'swr';
import Avatar from 'components/common/elements/Avatar';
import fetcher from 'utils/fetcher';
import Icon from 'components/common/elements/Icon';

const Contributors = ({ project }) => {
  const url = `${process.env.BASEURL}/api/projects/project/contributors?projectId=${project._id}`;
  const { data } = useSWR(url, fetcher);
  const contributors = data ? data.content : null;

  if (!contributors) return null;

  return (
    <>
      {contributors?.length > 1 && (
        <div className="my-6 space-y-3 border-t border-base-200 pt-6 dark:border-base-700">
          <div className="text-base font-medium">Contributors</div>
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
        </div>
      )}
    </>
  );
};

export default Contributors;
