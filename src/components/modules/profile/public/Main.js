import React from 'react';
import TechBadge from 'components/common/tags/TagStack';
import ProjectCard from 'components/modules/static/shared/ProjectCard';
import Loader from 'components/common/elements/Loader';
import Overview from 'components/modules/profile/public/Overview';

const Main = (props) => {
  if (!props.profile)
    return (
      <div className="my-48 flex w-full justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="mb-8 flex w-full flex-col bg-base-700">
      <div className="-mt-10 space-y-3 rounded-2xl bg-base-700">
        <Overview profile={props.profile} />
      </div>

      {props?.profile?.userSkills.skills.length > 0 && (
        <div className="mt-10 px-4 md:px-10">
          <h4 className="text-sm font-medium uppercase tracking-tight text-slate-300">
            My tech stack
          </h4>
          <ul className="mt-4 flex w-full flex-wrap">
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
          <h4 className="text-sm font-medium uppercase tracking-tight text-slate-300">
            What I have built
          </h4>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
            {props.projects?.map((project, index) => (
              <div className="relative col-span-1" key={index}>
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
