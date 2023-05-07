export const pricingPlans = [
  {
    title: 'Starter',
    price: 250,
    period: 1,
    description:
      'Great for startups and small teams looking to fill one or two positions.',
    features: [
      { label: '2 active open roles', value: true },
      { label: 'Featured team', value: false },
      { label: 'Team insights', value: false },
    ],
    product: process.env.NEXT_PUBLIC_TEAM_PLAN_STARTER_MONTHLY,
    refPlan: 'TEAM_PLAN_STARTER_MONTHLY',
  },
  {
    title: 'Scale',
    price: 500,
    period: 1,
    description:
      'Perfect for teams looking to drive regular leads into their pipelines.',
    features: [
      { label: '5 active open roles', value: true },
      { label: 'Featured team', value: true },
      { label: 'Team insights', value: false },
    ],
    product: process.env.NEXT_PUBLIC_TEAM_PLAN_SCALE_MONTHLY,
    refPlan: 'TEAM_PLAN_SCALE_MONTHLY',
  },
  {
    title: 'Growth',
    price: 1500,
    period: 1,
    description:
      'Ideal for teams wanting a full-time community partner to drive leads.',
    features: [
      { label: 'Unlimited active open roles', value: true },
      { label: 'Featured team', value: true },
      { label: 'Team insights', value: true },
    ],
    product: process.env.NEXT_PUBLIC_TEAM_PLAN_GROWTH_MONTHLY,
    refPlan: 'TEAM_PLAN_GROWTH_MONTHLY',
  },
  {
    title: 'Starter',
    price: 175,
    period: 12,
    description:
      'Great for startups and small teams looking to fill one or two positions.',
    features: [
      { label: '2 active open roles', value: true },
      { label: 'Featured team', value: false },
      { label: 'Team insights', value: false },
    ],
    product: process.env.NEXT_PUBLIC_TEAM_PLAN_STARTER_YEARLY,
    refPlan: 'TEAM_PLAN_STARTER_YEARLY',
  },
  {
    title: 'Scale',
    price: 350,
    period: 12,
    description:
      'Perfect for teams looking to drive regular leads into their pipelines.',
    features: [
      { label: '5 active open roles', value: true },
      { label: 'Featured team', value: true },
      { label: 'Team insights', value: false },
    ],
    product: process.env.NEXT_PUBLIC_TEAM_PLAN_SCALE_YEARLY,
    refPlan: 'TEAM_PLAN_SCALE_YEARLY',
  },
  {
    title: 'Growth',
    price: 1050,
    period: 12,
    description:
      'Ideal for teams wanting a full-time community partner to drive leads.',
    features: [
      { label: 'Unlimited active open roles', value: true },
      { label: 'Featured team', value: true },
      { label: 'Team insights', value: true },
    ],
    product: process.env.NEXT_PUBLIC_TEAM_PLAN_GROWTH_YEARLY,
    refPlan: 'TEAM_PLAN_GROWTH_YEARLY',
  },
];
