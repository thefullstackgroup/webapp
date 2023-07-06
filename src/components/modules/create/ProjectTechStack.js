import Toast from 'components/common/elements/Toast';
import ModalDialog from 'components/common/modals/ModalDialog';
import TagStack from 'components/common/tags/TagStack';
import React from 'react';
import { useState } from 'react';
import { IoCodeOutline } from 'react-icons/io5';
import * as Icons from 'react-icons/si';

const popularStacks = [
  { _id: '611e26d8e1babff8b4e92887', skillName: 'HTML5', icon: 'Html5' },
  { _id: '60b0c001a4c4065e3dfdc532', skillName: 'React', icon: 'React' },
  { _id: '60c8c2ae5a23ac9589856623', skillName: 'NextJS', icon: 'Nextdotjs' },
  { _id: '60dcddc00112a448cde42f95', skillName: 'Vue', icon: 'Vuedotjs' },
  { _id: '60dc52f457c7ee60c991e120', skillName: 'NuxtJS', icon: 'Nuxtdotjs' },
  { _id: '60c313b8e78bac3a183bc168', skillName: 'Gatsby', icon: 'Gatsby' },
  { _id: '613f6e8f3bdae71b36e4597a', skillName: 'Angular', icon: 'Angular' },
  { _id: '60b5047eff0afc2c312a48f9', skillName: 'CSS3', icon: 'Css3' },
  { _id: '60e8c970a61d0d6a56d166e6', skillName: 'Sass', icon: 'Sass' },
  {
    _id: '60c1f20b87e6f64670c1a026',
    skillName: 'TailwindCSS',
    icon: 'TailwindCSS',
  },
  { _id: '612b420e6b186e40c0c09a66', skillName: 'ChakraUI', icon: 'Chakraui' },
  {
    _id: '62a1d46e0efbd2e7d5bd99c8',
    skillName: 'Bootstrap',
    icon: 'Bootstrap',
  },
  { _id: '60c30fb8892a99ab41ef502f', skillName: 'Redux', icon: 'Redux' },
  { _id: '626585b5c193153e20907a13', skillName: 'Webpack', icon: 'Webpack' },
  { _id: '62a1d4650efbd2e7d5bd99c6', skillName: 'Babel', icon: 'Babel' },
  { _id: '62a1d4770efbd2e7d5bd99ca', skillName: 'Svelte', icon: 'Svelte' },
  { _id: '60c2a4746c078a239e680821', skillName: 'NodeJS', icon: 'Nodedotjs' },
  { _id: '60c1f18087e6f62659c1a024', skillName: 'Express', icon: 'Express' },
  { _id: '62a1d4940efbd2e7d5bd99d4', skillName: 'NestJS', icon: 'Nestjs' },
  { _id: '62a1d47e0efbd2e7d5bd99cc', skillName: 'FastAPI', icon: 'Fastapi' },
  { _id: '60c31d1cc3623523efd41d93', skillName: 'GraphQL', icon: 'Graphql' },
  { _id: '60b0c017a4c406a8a8fdc535', skillName: 'MongoDB', icon: 'Mongodb' },
  { _id: '60b0c011a4c40627d3fdc534', skillName: 'MySQL', icon: 'Mysql' },
  {
    _id: '618c882fc0f5b37fd367bba5',
    skillName: 'PostgreSQL',
    icon: 'Postgresql',
  },
  { _id: '60c30fc3892a99ba92ef5030', skillName: 'Firebase', icon: 'Firebase' },
  { _id: '62a1d4830efbd2e7d5bd99ce', skillName: 'Heroku', icon: 'Heroku' },
  { _id: '62a1d4880efbd2e7d5bd99d0', skillName: 'Flask', icon: 'Flask' },
  { _id: '62a1d48e0efbd2e7d5bd99d2', skillName: 'Supabase', icon: 'Supabase' },
];

const ProjectTechStack = ({
  show,
  setShow,
  postTechStack,
  setPostTechStack,
}) => {
  const [skillList, setSkillList] = useState([]);
  const [skillName, setSkillName] = useState('');
  const [showToast, setShowToast] = useState(false);

  const Icon = (props) => {
    const { iconName } = props;

    const iconKey = `Si${
      iconName.charAt(0).toUpperCase() + iconName.slice(1).toLowerCase()
    }`;
    const icon = React.createElement(Icons[iconKey] || IoCodeOutline, {
      className: 'w-5 h-5 text-base-400',
    });
    return <div>{icon}</div>;
  };

  const addSkill = (skill) => {
    setSkillName('');
    const skillsExists = postTechStack.find(function (item) {
      return skill.skillId === item;
    });

    if (skill.skillId === -1) {
      setSkillList([]);
    }
    if (!skillsExists && skill.skillId != -1) {
      setPostTechStack([...postTechStack, skill.skillName]);
    }
    setShowToast(true);
  };

  const searchSkills = async (term) => {
    const filteredTerm = term.replace(',', '');
    setSkillName(filteredTerm);
    if (term.indexOf(',') > 0) {
      const skillExists = skillList.find(function (item) {
        return filteredTerm.toLowerCase() === item.skillName.toLowerCase();
      });

      if (skillExists) {
        addSkill(skillExists);
        setSkillName('');
        return;
      }
    }
    if (term.length > 1) {
      setSkillName(term);
      const response = await fetch(`${process.env.BASEURL}/api/search/skills`, {
        method: 'POST',
        body: JSON.stringify(term),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const results = await response.json();

      if (!results.content.length) {
        setSkillList([]);
      } else {
        setSkillList(results.content);
      }
    }
  };

  return (
    <>
      <ModalDialog show={show} setShow={setShow} title="Tag a tech stack">
        <div className="relative flex flex-col py-4 px-2">
          <input
            type="text"
            id="skill"
            name="skill"
            autoComplete="off"
            autoFocus
            placeholder="Search stacks ... e.g. React"
            onChange={(e) => searchSkills(e.target.value)}
            className="text-input"
            value={skillName}
          />

          <div className="relative">
            {skillName.length > 1 && skillList.length > 0 && (
              <ul className="absolute top-2 left-0 z-10 max-h-72 w-full overflow-scroll overscroll-contain rounded-md border border-base-400 bg-base-50 shadow-lg dark:border-base-700 dark:bg-base-800">
                {skillList.map((result) => (
                  <li
                    className="my-1 items-center px-4 py-1"
                    key={result.skillId}
                  >
                    <button
                      type="button"
                      className="flex w-full items-center space-x-2 text-left focus:outline-none"
                      onClick={() => {
                        addSkill(result);
                      }}
                    >
                      <Icon iconName={`${result.skillName}`} />
                      <span>{result.skillName}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="my-4 space-y-1">
            <h5 className="font-medium">Popular tags</h5>
            <div className="flex flex-wrap gap-1"></div>
            {popularStacks.map((stack, index) => (
              <button
                key={index}
                onClick={() => {
                  addSkill(stack);
                  setShow(false);
                }}
              >
                <TagStack tech={stack.skillName} />
              </button>
            ))}
          </div>
        </div>
      </ModalDialog>

      <Toast show={showToast} setShow={setShowToast} message={'Tag added'} />
    </>
  );
};

export default ProjectTechStack;
