const employmentTypeOptions = ['Full Time', 'Part Time', 'Contract'];
const locationTypeOptions = ['Remote', 'Hybrid', 'Onsite'];

export const EmploymentType = ({ selected, setType }) => {
  return (
    <div className="flex w-1/2 items-center">
      {employmentTypeOptions.map((type, index) => (
        <button
          className={
            'badge w-full whitespace-nowrap bg-base-600/50 px-6 py-1.5 text-base ' +
            (selected === type && 'bg-primary-500 text-white')
          }
          onClick={() => setType(type)}
          key={index}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export const LocationType = ({ selected, setType }) => {
  return (
    <div className="flex w-1/2 items-center">
      {locationTypeOptions.map((type, index) => (
        <button
          className={
            'badge w-full bg-base-600/50 px-6 py-1.5 text-base ' +
            (selected === type && 'bg-primary-500 text-white')
          }
          onClick={() => {
            setType(type);
          }}
          key={index}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export const currencies = ['EUR', 'USD'];

export const salaryRanges = [
  { label: '10k per year', value: 10000 },
  { label: '20k per year', value: 20000 },
  { label: '30k per year', value: 30000 },
  { label: '40k per year', value: 40000 },
  { label: '50k per year', value: 50000 },
  { label: '60k per year', value: 60000 },
  { label: '70k per year', value: 70000 },
  { label: '80k per year', value: 80000 },
  { label: '90k per year', value: 90000 },
  { label: '100k per year', value: 100000 },
  { label: '110k per year', value: 110000 },
  { label: '120k per year', value: 120000 },
  { label: '130k per year', value: 130000 },
  { label: '140k per year', value: 140000 },
  { label: '150k per year', value: 150000 },
  { label: '160k per year', value: 160000 },
  { label: '170k per year', value: 170000 },
  { label: '180k per year', value: 180000 },
  { label: '190k per year', value: 190000 },
  { label: '200k per year', value: 200000 },
  { label: '220k per year', value: 220000 },
  { label: '250k per year', value: 250000 },
  { label: '300k per year', value: 300000 },
  { label: '350k per year', value: 350000 },
  { label: '400k per year', value: 400000 },
  { label: '450k per year', value: 450000 },
  { label: '500k per year', value: 500000 },
];

export const pricingPlans = [
  {
    title: 'Starter',
    price: 250,
    price12: 175,
    description:
      'Great for startups and small teams looking to fill one or two positions.',
    features: [
      { label: '2 active open roles', value: true },
      { label: 'Featured team', value: false },
      { label: 'Team insights', value: false },
    ],
  },
  {
    title: 'Scale',
    price: 500,
    price12: 350,
    description:
      'Perfect for teams looking to drive regular leads into their pipelines.',
    features: [
      { label: '5 active open roles', value: true },
      { label: 'Featured team', value: true },
      { label: 'Team insights', value: false },
    ],
  },
  {
    title: 'Growth',
    price: 1500,
    price12: 1050,
    description:
      'Ideal for teams wanting a full-time community partner to drive leads.',
    features: [
      { label: 'Unlimited active open roles', value: true },
      { label: 'Featured team', value: true },
      { label: 'Team insights', value: true },
    ],
  },
];

export const faqs = [
  {
    question: 'How much do job listings cost?',
    answer:
      'Job listings start at EUR250 a month, for 2 job listings. We also offer discounts to pre series–A startups, small to medium sized studios, and nonprofits. Please contact us to see if your team qualifies!',
  },
  {
    question: 'Who can create job listings?',
    answer:
      'Job listings can be created using the owner of your team profile. We suggest using a team profile to communicate your team culture alongside your job description. For job listings made with team profiles this information will be derived from your team profile.',
  },
  {
    question: 'How do I create a job listing for my team profile?',
    answer:
      'If you are the owner of a Team, navigate to the Manage Team section (found under More tab on main menu) and click on the Job Listings options. If you are a subscriber to one of the Teams plans, click the Add open role button in the top right corner. This will open the create job listing screen. Once you’ve filled in all the details you will be able to save and view it on your profile.',
  },
  {
    question: 'How do I edit a job listing?',
    answer:
      'If you have created a job listing with your team profile, navigate to the Manage Team section (found under More tab on main menu) and click on the Job Listings options, then click the Edit button on the job listing you want to update.',
  },
  {
    question: 'How do I delete a job listing?',
    answer:
      'If you have created a job listing with your team profile, navigate to the Manage Team section (found under More tab on main menu) and click on the Job Listings options, then click the Edit button that will load the job details screen. Scroll to the bottom of the page and click the Delete listing button to delete the job listing.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer:
      'If you would like to cancel your subscripiton anytime, navigate to the Account settings section (found under More tab on main menu) and select Subscripiton Plan. Click the Cancel button under your active plan.',
  },
  {
    question:
      'What happens if I delete all my job listing before the subscription ends?',
    answer:
      'Your subscription will remain in place until. If you would like to cancel your subscripiton anytime, navigate to the Account settings section (found under More tab on main menu) and select Subscripiton Plan. Click the Cancel button under your active plan.',
  },
  {
    question: 'Do you have any tips for creating a successful job listing?',
    answer:
      'So glad you asked! One thing that many people forget is that a job posting is an advertisement, and they need to sell your vision, your culture, your team and the role. Typical job boards are boring and give little insight to the team, their culture and what the people on the team are like. This is why we stress the importance of Teams and put the team profile first before the job role listed. Its important for you and your team to find the right developer that wants to be part of your team, to be challenged, to learn and to grow. This is what retains people and gives people a purpose, and this is what makes the best teams give the best output and results - its a win all round.',
  },
  {
    question: 'Dont see a question that helps you?',
    answer:
      'Sure no problem - we are not perfect by any stretch! Please do not hesitate to get in touch with us, we are here to help you and to help developers looking for the right opportunity. Contact us at support@thefullstackgroup.com.',
  },
];
