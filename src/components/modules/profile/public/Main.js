import React from 'react';
import TechBadge from 'components/common/tags/TagStack';
import ProjectCard from 'components/modules/static/shared/ProjectCard';
import Loader from 'components/common/elements/Loader';
import Overview from 'components/modules/profile/public/Overview';

const Main = (props) => {
  if (!props.profile)
    return (
      <div className="my-48 flex justify-center w-full">
        <Loader />
      </div>
    );

  return (
    <div className="mb-8 w-full flex flex-col bg-tfsdark-700">
      <div className="-mt-10 space-y-3 bg-tfsdark-700 rounded-2xl">
        <Overview profile={props.profile} />
      </div>

      {props?.profile?.userSkills.skills.length > 0 && (
        <div className="mt-10 px-4 md:px-10">
          <h4 className="uppercase tracking-tight text-slate-300 font-medium text-sm">
            My tech stack
          </h4>
          <ul className="mt-4 flex flex-wrap w-full">
            {props?.profile?.userSkills.skills.map(
              (skill, index) =>
                skill.languageName != null && (
                  <li key={index}>
                    <TechBadge tech={skill.languageName} size="sm" />
                  </li>
                )
            )}
          </ul>
        </div>
      )}

      {props.projects?.length > 0 && (
        <div className="mt-10 px-4 md:px-10">
          <h4 className="uppercase tracking-tight text-slate-300 font-medium text-sm">
            What I have built
          </h4>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {props.projects?.map((project, index) => (
              <div className="col-span-1 relative" key={index}>
                <ProjectCard project={project} hideDescription hideUser />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Main;
