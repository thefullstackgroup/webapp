import { FaHeart } from 'react-icons/fa';

const CodeOfConduct = () => {
  return (
    <div className="bg-black">
      <div className="fixed top-0 left-0 w-full mx-auto min-h-screen mt-12 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-tfsdark-300/40 via-black to-tfsdark-900 flex justify-between"></div>
      <div className="relative z-10 max-w-4xl mx-auto mb-20">
        <div className="pt-14 md:pt-10 text-center space-y-6 px-4 lg:px-0 mb-10 sm:mb-28">
          <h1 className="text-3xl md:text-6xl font-bold tracking-tight text-slate-100 font-intertight">
            Code of Conduct
          </h1>
          <p>Last updated: July 04, 2022</p>
        </div>

        <div className="space-y-4 px-4 prose prose-dark max-w-full">
          <p>
            Like the technical community as a whole, The Full Stack team and
            community is made up of a mixture of professionals and volunteers
            from all over the world, working on every aspect of the mission -
            including learning, self improvement, mentorship, collaboration,
            connecting people and opening up opportunities.
          </p>
          <p>
            The Full Stack culture is positive, supportive, and inclusive. We
            also want it to stay that way as the team and network grows. To that
            end, we have a few ground rules that we ask people to adhere to.
            This code applies equally to everyone involved in our company
            building The Full Stack.
          </p>
          <p>
            This isn&apos;t an exhaustive list of things that you can&apos;t do.
            Rather, take it in the spirit in which it&apos;s intended - a
            guideline for making sure everyone at The Full Stack is happy,
            productive, and safe.
          </p>
          <p>
            This code of conduct applies to all spaces managed by The Full Stack
            team. This includes our internal tools, our events events, and any
            other forums created by The Full Stack team which are used for
            communication. In addition, violations of this code outside these
            spaces may affect a person&apos;s ability to participate within
            them.
          </p>
          <p>
            If you believe someone is violating the code of conduct, we ask that
            you report it by emailing hello@thefullstack.network.
          </p>
          <p>
            <span className="font-bold">Be friendly and patient.</span> Each
            person is a key player on our team and deserves respect. While we
            all have different roles to play, we recognise that no single role
            is more important than the other. Members of our community should
            always be ready to give each other the benefit of the doubt,
            acknowledge each other&apos;s best effort, and do their part to
            create a healthy and supportive work environment, both in-person and
            virtually.
          </p>
          <p>
            <span className="font-bold">Be welcoming.</span> We strive to be a
            community that welcomes and supports people of all backgrounds and
            identities. This includes, but is not limited to, members of any
            race, ethnicity, culture, national origin, colour, immigration
            status, social and economic class, educational level, sex, sexual
            orientation, gender identity and expression, age, size, family
            status, political belief, religion, and mental and physical ability.
          </p>
          <p>
            <span className="font-bold">Be considerate.</span> Remember that
            we&apos;re a world-wide community, so you might not be communicating
            in someone else&apos;s primary language.
          </p>
          <p>
            <span className="font-bold">Be respectful.</span> Not all of us will
            agree all the time, but disagreement is no excuse for poor behaviour
            and poor manners. We might all experience some frustration now and
            then, but we cannot allow that frustration to turn into a personal
            attack. It&apos;s important to remember that a community where
            people feel uncomfortable or threatened is not a productive one.
            Members of The Full Stack community should be respectful when
            dealing with other members as well as with people outside The Full
            Stack community.
          </p>
          <p>
            Be careful in the words that you choose. We are a community of
            professionals, and we conduct ourselves professionally. Be kind to
            others. Do not insult or put down other participants. Harassment and
            other exclusionary behaviour aren&apos;t acceptable. This includes,
            but is not limited to:
          </p>
          <ul className="list-disc ml-8 space-y-4">
            <li>
              Violent threats or language directed against another person.
            </li>
            <li>Discriminatory jokes and language.</li>
            <li>Posting sexually explicit or violent material.</li>
            <li>
              Posting (or threatening to post) other people&apos;s personally
              identifying information (&quot;doxing&quot;).
            </li>
            <li>
              Personal insults, especially those using racist or sexist terms.
            </li>
            <li>Unwelcome sexual attention.</li>
            <li>Advocating for, or encouraging, any of the above behaviour.</li>
            <li>
              Repeated harassment of others. In general, if someone asks you to
              stop, then stop.
            </li>
          </ul>
          <p>
            When we disagree, try to understand why. Disagreements, both social
            and technical, happen all the time and The Full Stack is no
            exception. It is important that we resolve disagreements and
            differing views constructively. Remember that we&apos;re different.
            The strength of The Full Stack comes from its varied community,
            people from a wide range of backgrounds. Different people have
            different perspectives on issues. Being unable to understand why
            someone holds a viewpoint doesn&apos;t mean that they&apos;re wrong.
            Don&apos;t forget that it is human to err and blaming each other
            doesn&apos;t get us anywhere. Instead, focus on helping to resolve
            issues and learning from mistakes.
          </p>
          <p>
            This code of conduct has been repeated and is massively inspired by
            many communities we admire, respect and love.
            <FaHeart className="mt-2 h-8 w-auto text-red-500" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CodeOfConduct;
