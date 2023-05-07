const NewsletterSection = () => {
  const sendSlackMessage = async () => {
    const message = {
      message: `HOMEPAGE: Someone has clicked the NEWSLETTER subscribe button`,
    };

    fetch(`${process.env.BASEURL}/api/notifications/slack/postMessage`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
  };

  return (
    <div className="bg-tfsdark-800/20 border border-tfsdark-700 rounded-lg p-4 md:p-8 space-y-4">
      <div className="space-y-4 text-center">
        <div className="w-full space-y-2">
          <h4 className="text-2xl md:text-4xl font-bold font-intertight uppercase">
            Join 10000+ developers
          </h4>
          <p className="text-sm md:text-base text-slate-400">
            who receive our newsletter every week, filled with the best trending
            projects showcased by the community along with projects open to
            collaboration and looking for contributors.
          </p>
        </div>
        <div className="space-y-2">
          <a
            href="https://cdn.forms-content.sg-form.com/9d844234-926d-11ed-b182-82896c15a735"
            target="_blank"
            rel="noreferrer"
          >
            <button
              className="btn-primary w-full whitespace-nowrap mx-auto text-lg md:text-xl py-2 px-3 md:py-3 md:px-6 rounded-lg"
              onClick={() => sendSlackMessage()}
            >
              Subscribe
            </button>
          </a>
          <p className="text-xs text-slate-400">
            Great content, no spam, easy unsubscribe
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
