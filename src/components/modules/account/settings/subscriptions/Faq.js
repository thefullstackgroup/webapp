import { Disclosure } from '@headlessui/react';
import { IoAdd, IoRemove } from 'react-icons/io5';

const faqs = [
  {
    question: 'Do I have to pay to create a team?',
    answer: 'No. You can create a Team profile for free.',
  },
  {
    question: 'Can I add my team members to my Team profile?',
    answer:
      'Yes. You can invite people to join your team for free. Once your Team profile is created, you can invite people by searching for their username here on The Full Stack or send them an invite to their email address.',
  },
  {
    question: 'I have open roles on my team. Can I post a job vacancy?',
    answer:
      'Yes. You can post open job positions on your Team profile. Click the `Post a Job` button on your Team profile or go to Account Settings > Team Profiles and select the `Post a job` option.',
  },
  {
    question: 'Do I have to pay to post a job?',
    answer:
      'Yes. Job listings start at EUR175 a month, for 2 job listings. We also offer discounts to pre-seed and seed startups, and nonprofits. Please contact us to see if your team qualifies!',
  },
  {
    question: 'How much do job listings cost?',
    answer:
      'Job listings start at EUR175 a month, for 2 job listings. We also offer discounts to pre-seed and seed startups, and nonprofits. Please contact us to see if your team qualifies!',
  },
  {
    question: 'Who can create job listings?',
    answer:
      'Job listings can be created by the owner of a team profile. We suggest using a team profile to communicate your team culture alongside your job description. Each job listing will contain information about your team derived from your team profile.',
  },
  {
    question: 'How do I post a job listing on my team profile?',
    answer:
      'If you are the owner of a Team, navigate to Account Settings (found under More tab on main menu or on your profile). Select Team profiles and click on the Open roles option. If you are a subscriber to one of the Teams plans, click the Add open role button. This will open the create job listing screen. Once you’ve filled in all the details and hit Save, your job will be live on your team profile.',
  },
  {
    question: 'How do I edit a job listing?',
    answer:
      'If you have created a job listing with your team profile, navigate to Team Profiles seciton under your Account Settings. Click on the Open roles option, then click the Edit button on the job listing you want to update.',
  },
  {
    question: 'How do I delete a job listing?',
    answer:
      'If you have created a job listing with your team profile, navigate to to Team Profiles seciton under your Account Settings. Click on the Open roles option, then click the Edit button that will load the job details screen. Scroll to the bottom of the page and click the Delete listing button to delete the job listing.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer:
      'If you would like to cancel your subscripiton anytime, navigate to the Account settings section (found under More tab on main menu) and select Subscriptions. Click the Cancel subscription button.',
  },
  {
    question:
      'What happens if I delete all my job listing before the subscription ends?',
    answer:
      'Your subscription will remain in place until the end date of the subscripiton plan you are on. If you would like to cancel your subscripiton anytime, navigate to the Account settings section (found under More tab on main menu) and select Subscripiton Plan. Click the Cancel button under your active plan.',
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

const Faq = ({ showTitle = true }) => {
  return (
    <>
      {showTitle && (
        <h3 className="font-semibold text-2xl mb-6">
          Frequently asked questions
        </h3>
      )}
      <dl className="space-y-4 divide-y divide-white/10">
        {faqs.map((faq) => (
          <Disclosure as="div" key={faq.question} className="pt-6">
            {({ open }) => (
              <>
                <dt>
                  <Disclosure.Button
                    className={
                      'flex w-full items-start justify-between text-left ' +
                      (open
                        ? 'text-slate-400'
                        : 'hover:text-slate-400 text-slate-100')
                    }
                  >
                    <span className="text-base font-medium leading-7">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      {open ? (
                        <IoRemove className="h-6 w-6" />
                      ) : (
                        <IoAdd className="h-6 w-6" />
                      )}
                    </span>
                  </Disclosure.Button>
                </dt>
                <Disclosure.Panel as="dd" className="mt-2 pr-12">
                  <p className="text-base leading-7 text-white">{faq.answer}</p>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </dl>
    </>
  );
};

export default Faq;
