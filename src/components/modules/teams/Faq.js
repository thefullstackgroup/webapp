import { Disclosure } from "@headlessui/react";
import { IoAdd, IoRemove } from "react-icons/io5";

const faqs = [
  {
    question: "Do I have to pay to create a team?",
    answer: "No. You can create a Team profile for free.",
  },
  {
    question: "Can I add my team members to my Team profile?",
    answer:
      "Yes. You can invite people to join your team for free. Once your Team profile is created, you can invite people by searching for their username here on The Full Stack or send them an invite to their email address.",
  },
  {
    question: "I have open roles on my team. Can I post them here?",
    answer:
      "Amazing. You want to grow your team! You can post open roles on your Team profile. Click the `Post Open Role` button on your Team profile.",
  },
  {
    question: "Do I have to pay to post an open role?",
    answer:
      "No. The Full Stack is about discovering and connecting developers to build awesome things.",
  },
  {
    question: "Who can create open roles?",
    answer:
      "Open roles can be created by the owner of a team profile. We recommend using a team profile to communicate your team culture alongside your open role. Each open role listing will contain information about your team derived from your team profile.",
  },
  {
    question: "How do I post an open role on my team profile?",
    answer:
      "If you are the owner of a Team, navigate to your Team profile page. Hit the Manage Team button and click on the Open roles option. Then click the Add open role button. This will open the create an open role screen. Once you’ve filled in all the details, hit Save, your open role will be live on your team profile.",
  },
  {
    question: "Do you have any tips?",
    answer:
      "So glad you asked! YOU are exicted about what you are building. It's awesome. So sell your vision, your culture, your team. This is why we stress the importance of Teams and put the team profile first. Its important for you to find connections and collaborate and grow your network. It's important to be challenged, to learn and to grow. This is what gives people a purpose, and this is what makes the best teams build the best - its a win all round.",
  },
  {
    question: "Dont see a question that helps you?",
    answer:
      "Sure no problem - we are not perfect by any stretch! Please do not hesitate to get in touch with us, we are here to help. Contact us at support@thefullstackgroup.com.",
  },
];

const Faq = () => {
  return (
    <>
      <dl className="space-y-4 divide-y divide-base-200 dark:divide-base-700">
        {faqs.map((faq) => (
          <Disclosure as="div" key={faq.question} className="pt-6">
            {({ open }) => (
              <>
                <dt>
                  <Disclosure.Button
                    className={
                      "flex w-full items-start justify-between text-left " +
                      (open
                        ? "btn btn-ghost py-0 px-0"
                        : "btn btn-ghost  py-0 px-0")
                    }
                  >
                    <span className="font-medium leading-7">
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
                  <p className="text-left leading-7">{faq.answer}</p>
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
