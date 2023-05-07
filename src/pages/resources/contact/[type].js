import validator from 'validator';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useState } from 'react';
import { IoChevronBack } from 'react-icons/io5';

const Meta = dynamic(() => import('components/common/partials/Metadata'));

const ContactForm = ({ formType }) => {
  let formTypeName = 'General Enquiry';
  let introMessage = 'Thanks for reaching out. What can we do for you?';
  let mulitpleChoiceOptions = [
    "I'm interested and would like to know more",
    'I have some feedback',
    "I'd like to have a chat",
    'Seriously, what is thefullstack all about?',
  ];

  if (formType === 'company') {
    formTypeName = 'Company Enquiry';
    introMessage = 'How can we help you, your team or company?';
    mulitpleChoiceOptions = [
      "I'd like to sign up my team / company to thefullstack",
      'How much does it cost?',
      "I'd like to find out what thefullstack could do for my team",
      "I'd like to have a chat",
    ];
  }

  if (formType === 'events') {
    formTypeName = 'Events Enquiry';
    introMessage = 'Do you run an event, meetup or conference?';
    mulitpleChoiceOptions = [
      "I'd like to list my event / meetup / conference on thefullstack",
      "I'd like to find out more about events on thefullstack",
      "I'd like to have a chat",
    ];
  }

  if (formType === 'teams') {
    formTypeName = 'Teams';
    introMessage =
      'Would you like to find out more about Teams on The Full Stack? Or do you have any feedback on Teams?';
    mulitpleChoiceOptions = [
      'Does it cost to create a profile?',
      "I'd like to create a team profile on The Full Stack",
      "I'd like to find out what The Full Stack could do for my team",
      'What are Team profiles all about?',
      'I have some feedback',
    ];
  }

  if (formType === 'submitfeaturerequest') {
    formTypeName = 'Submit Feature Request';
    introMessage =
      'Submit a feature request or feedback for thefullstack. Select an option below';
    mulitpleChoiceOptions = [
      "I'd like to submit a feature request",
      'I have some feedback',
      "I'd just like to chat",
    ];
  }

  const [showMultiChoice, setShowMultiChoice] = useState(true);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [multiChoiceSelected, setMultiChoiceSelected] = useState();
  const [multiChoiceSelectedText, setMultiChoiceSelectedText] = useState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const sendSlackMessage = async () => {
    let message = `The ${formTypeName.toUpperCase()} form got a response, see below:\n\n============\n\nName: ${name}\nEmail: ${email}\n\n${multiChoiceSelectedText}\n\n============\n\n`;

    await axios.post(
      `${process.env.BASEURL}/api/notifications/slack/postEnquiry`,
      {
        message: message,
      }
    );
    setShowSuccess(true);
    setShowMultiChoice(false);
    setShowContactDetails(false);
  };

  return (
    <>
      <Meta
        title={`${process.env.brandName} - Contact`}
        description="The web3 professional network for Developers"
        keywords=""
      />
      <main className="bg-tfsdark-900 min-h-screen text-gray-100 text-xl px-4 md:px-0">
        <div className="pt-10 md:pt-20">
          <div className="max-w-2xl mx-auto flex mb-20">
            <span className="h-7 sm:h-7 w-10 mr-1">
              <img
                src="/assets/thefullstack-dark-new-icon.png"
                className="object-contain"
                alt={process.env.brandName}
              />
            </span>
            <span className="text-gray-300 text-xl tracking-tighter font-bold">
              thefullstack
            </span>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              {showMultiChoice && (
                <div className="absolute w-full">
                  <div className="text-2xl font-medium">{introMessage}</div>
                  <div className="flex flex-col space-y-2 mt-8">
                    {mulitpleChoiceOptions.map((answer, index) => (
                      <button
                        type="button"
                        className={
                          'flex items-start border py-2 px-2 text-gray-100 text-left rounded ' +
                          (multiChoiceSelected == index
                            ? 'bg-blue-500'
                            : 'hover:bg-gray-700')
                        }
                        key={index}
                        onClick={() => {
                          setMultiChoiceSelected(index);
                          setMultiChoiceSelectedText(answer);
                          setShowMultiChoice(false);
                          setShowContactDetails(true);
                        }}
                      >
                        <span className="border border-gray-200 rounded text-xs text-gray-200 py-1 px-2 mr-2">
                          {index + 1}
                        </span>{' '}
                        <span>{answer}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {showContactDetails && !showMultiChoice && (
                <div className="absolute">
                  <div className="text-2xl font-medium">
                    Thanks for that. Now let{"'"}s grab your contact details so
                    we can get in touch with you.
                  </div>
                  <div className="mt-6 flex flex-col">
                    What{"'"}s your name?
                  </div>
                  <input
                    type="text"
                    value={name}
                    className="mt-2 border border-gray-700 bg-gray-800 rounded w-full text-white focus:ring-purple-600"
                    onChange={(e) => setName(e.target.value)}
                  />
                  {name && (
                    <>
                      <div className="mt-6 flex flex-col space-y-2">
                        What{"'"}s your email address?
                      </div>
                      <input
                        type="text"
                        value={email}
                        className="mt-2 border border-gray-700 bg-gray-800 rounded w-full text-white focus:ring-purple-600"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </>
                  )}
                  <div className="flex items-center mt-6 justify-between">
                    <button
                      className="flex text-sm text-gray-400 space-x-1 items-center"
                      onClick={() => {
                        setShowMultiChoice(true);
                        setShowContactDetails(true);
                      }}
                    >
                      <IoChevronBack />
                      <span>Back</span>
                    </button>

                    {email && name && validator.isEmail(email) ? (
                      <button
                        className="btn-primary "
                        onClick={() => sendSlackMessage()}
                      >
                        Submit
                      </button>
                    ) : (
                      <button className="btn-primary" disabled>
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              )}

              {showSuccess && (
                <div className="absolute">
                  <div className="text-3xl font-medium">
                    Thanks for getting in touch, we{"'"}ll get back to you
                    within a few days.
                  </div>
                  <div className="mt-10">
                    <a href={process.env.BASEURL} className="btn-primary">
                      Done
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps({ params }) {
  return {
    props: {
      formType: params.type,
    },
  };
}

export default ContactForm;
