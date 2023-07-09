import React, { useEffect } from 'react';
import { useState } from 'react';
import * as Icons from 'react-icons/si';
import { BsCheck, BsFileCode } from 'react-icons/bs';
import axios from 'axios';

const techStacks = [
  {
    label: 'Frontend',
    stacks: [
      { _id: '611e26d8e1babff8b4e92887', label: 'HTML5', icon: 'Html5' },
      { _id: '60b0c001a4c4065e3dfdc532', label: 'React', icon: 'React' },
      { _id: '60c8c2ae5a23ac9589856623', label: 'NextJS', icon: 'Nextdotjs' },
      { _id: '60dcddc00112a448cde42f95', label: 'Vue', icon: 'Vuedotjs' },
      { _id: '60dc52f457c7ee60c991e120', label: 'NuxtJS', icon: 'Nuxtdotjs' },
      { _id: '60c313b8e78bac3a183bc168', label: 'Gatsby', icon: 'Gatsby' },
      { _id: '613f6e8f3bdae71b36e4597a', label: 'Angular', icon: 'Angular' },
      { _id: '60b5047eff0afc2c312a48f9', label: 'CSS3', icon: 'Css3' },
      { _id: '60e8c970a61d0d6a56d166e6', label: 'Sass', icon: 'Sass' },
      {
        _id: '60c1f20b87e6f64670c1a026',
        label: 'TailwindCSS',
        icon: 'TailwindCSS',
      },
      { _id: '612b420e6b186e40c0c09a66', label: 'ChakraUI', icon: 'Chakraui' },
      {
        _id: '62a1d46e0efbd2e7d5bd99c8',
        label: 'Bootstrap',
        icon: 'Bootstrap',
      },
      { _id: '60c30fb8892a99ab41ef502f', label: 'Redux', icon: 'Redux' },
      { _id: '626585b5c193153e20907a13', label: 'Webpack', icon: 'Webpack' },
      { _id: '62a1d4650efbd2e7d5bd99c6', label: 'Babel', icon: 'Babel' },
      { _id: '62a1d4770efbd2e7d5bd99ca', label: 'Svelte', icon: 'Svelte' },
    ],
  },
  {
    label: 'Core',
    stacks: [
      { _id: '60affa73153fce2826fda3c2', label: 'PHP', icon: 'Php' },
      { _id: '60b5047eff0afc2c312a48cd', label: 'Go', icon: 'Go' },
      {
        _id: '60b0c00ba4c4067de8fdc533',
        label: 'JavaScript',
        icon: 'Javascript',
      },
      {
        _id: '60b5047eff0afc2c312a48f7',
        label: 'TypeScript',
        icon: 'Typescript',
      },
      { _id: '60b5047eff0afc2c312a48ea', label: 'Python', icon: 'Python' },
      { _id: '60b5047eff0afc2c312a48eb', label: 'Ruby', icon: 'Ruby' },
      { _id: '60ad383fe7fdf8509f6cf861', label: 'Java', icon: 'Java' },
      { _id: '60b5047eff0afc2c312a48b5', label: 'C++', icon: 'Cplusplus' },
      { _id: '60b5047eff0afc2c312a48b6', label: 'C#', icon: 'Csharp' },
      { _id: '60b5047eff0afc2c312a48f4', label: 'Swift', icon: 'Swift' },
      { _id: '60b5047eff0afc2c312a48f8', label: 'Kotlin', icon: 'Kotlin' },
    ],
  },
  {
    label: 'Backend',
    stacks: [
      { _id: '60c2a4746c078a239e680821', label: 'NodeJS', icon: 'Nodedotjs' },
      { _id: '60c1f18087e6f62659c1a024', label: 'Express', icon: 'Express' },
      { _id: '62a1d4940efbd2e7d5bd99d4', label: 'NestJS', icon: 'Nestjs' },
      { _id: '62a1d47e0efbd2e7d5bd99cc', label: 'FastAPI', icon: 'Fastapi' },
      { _id: '60c31d1cc3623523efd41d93', label: 'GraphQL', icon: 'Graphql' },
      { _id: '60b0c017a4c406a8a8fdc535', label: 'MongoDB', icon: 'Mongodb' },
      { _id: '60b0c011a4c40627d3fdc534', label: 'MySQL', icon: 'Mysql' },
      {
        _id: '618c882fc0f5b37fd367bba5',
        label: 'PostgreSQL',
        icon: 'Postgresql',
      },
      { _id: '60c30fc3892a99ba92ef5030', label: 'Firebase', icon: 'Firebase' },
      { _id: '62a1d4830efbd2e7d5bd99ce', label: 'Heroku', icon: 'Heroku' },
      { _id: '62a1d4880efbd2e7d5bd99d0', label: 'Flask', icon: 'Flask' },
      { _id: '62a1d48e0efbd2e7d5bd99d2', label: 'Supabase', icon: 'Supabase' },
    ],
  },
  {
    label: 'Infra',
    stacks: [
      { _id: '60b5047eff0afc2c312a4910', label: 'AWS', icon: 'Amazonaws' },
      {
        _id: '613f6e853bdae7d2d8e45979',
        label: 'Azure',
        icon: 'Microsoftazure',
      },
      {
        _id: '60d1c3886945a226c17a4e80',
        label: 'Digital Ocean',
        icon: 'Digitalocean',
      },
      { _id: '60b5047eff0afc2c312a4906', label: 'GCP', icon: 'Googlecloud' },
      { _id: '60c8c28e5a23acfce3856621', label: 'Netlify', icon: 'Netlify' },
      { _id: '60c8c2975a23acf105856622', label: 'Vercel', icon: 'Vercel' },
    ],
  },
  {
    label: 'Misc',
    stacks: [
      { _id: '61225b056b1d5349cc23ee3b', label: 'Laravel', icon: 'Laravel' },
      { _id: '637c9ee13aae1b2ced1dc5d8', label: 'Symfony', icon: 'Symfony' },
      { _id: '60f0acce093c3f7dd7970257', label: '.Net', icon: 'Dotnet' },
      { _id: '613a2ba7017467eec93eff83', label: 'Django', icon: 'Django' },
      { _id: '613f6e963bdae705e1e4597b', label: 'Flutter', icon: 'Flutter' },
      {
        _id: '60c1f1f187e6f6f162c1a025',
        label: 'React Native',
        icon: 'React',
      },
    ],
  },
];

const Tech = ({ user, setSkillsSelected }) => {
  const [skillListUser, setSkillListUser] = useState(
    user.userSkills?.skills.filter(function (skill) {
      return skill._id !== null;
    })
  );

  const [userSkill, setUserSkill] = useState([]);

  const fetchProfileSkills = async () => {
    await axios
      .get(`${process.env.BASEURL}/api/profile/user?userId=${user.displayName}`)
      .then((res) => {
        setUserSkill(res.data.userSkills.skills);
      })
      .catch((error) => console.log(error));
  };

  const Icon = (props) => {
    const { iconName } = props;

    const iconKey = `Si${
      iconName?.charAt(0).toUpperCase() + iconName?.slice(1)?.toLowerCase()
    }`;
    const icon = React.createElement(Icons[iconKey] || BsFileCode, {
      className: props.className,
    });
    return <div>{icon}</div>;
  };

  const TechPill = ({ tech }) => {
    const techSelected = userSkill?.find(function (item) {
      return tech._id === item._id;
    });

    return (
      <div
        className="badge badge-with-icon relative cursor-pointer px-2.5 py-1.5"
        onClick={() => saveTech(tech)}
      >
        <Icon iconName={tech.icon} className="h-5 w-5" />
        <span>{tech.label}</span>
        {techSelected && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-600 text-white ring-2 ring-white">
            <BsCheck className="h-4 w-4" />
          </span>
        )}
      </div>
    );
  };

  const saveTech = async (tech) => {
    const techExist = userSkill?.find(function (item) {
      return tech._id === item._id;
    });

    if (techExist) {
      let filteredArray = userSkill.filter((item) => item._id !== tech._id);
      setUserSkill(filteredArray);

      await axios
        .post(
          `${process.env.BASEURL}/api/skills/remove`,
          JSON.stringify(tech._id),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .catch((error) => {
          console.log(error.status);
        });
    } else {
      setUserSkill([
        ...userSkill,
        {
          _id: tech._id,
          languageName: tech.label,
          yearsWorkingWithSkill: 1,
        },
      ]);

      const skill = [
        {
          _id: tech._id,
          languageName: tech.label,
          yearsWorkingWithSkill: 1,
        },
      ];

      const formData = { userSkills: skill };

      await axios
        .post(
          `${process.env.BASEURL}/api/profile/skills/update`,
          JSON.stringify(formData),
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .catch((error) => {
          console.log(error.status);
        });
    }
  };

  useEffect(() => {
    fetchProfileSkills();
  }, []);

  useEffect(() => {
    if (setSkillsSelected) {
      if (userSkill?.length > 2) setSkillsSelected(true);
      else setSkillsSelected(false);
    }
  }, [userSkill]);

  return (
    <>
      <div className="w-full">
        {techStacks.map((type, index) => (
          <div className="my-6" key={index}>
            <h4 className="text-sm font-semibold uppercase">{type.label}</h4>
            <div className="my-4 flex w-full flex-wrap gap-1">
              {type.stacks.map((tech) => (
                <TechPill
                  tech={tech}
                  key={tech._id}
                  usersTech={skillListUser}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tech;
