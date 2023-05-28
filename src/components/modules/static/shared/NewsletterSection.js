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
    <div className="space-y-4 rounded-lg border border-base-700 bg-base-800/20 p-4 md:p-8">
      <div className="space-y-4 text-center">
        <div className="w-full space-y-2">
          <h4 className="font-intertight text-2xl font-bold uppercase md:text-4xl">
            Join 10000+ developers
          </h4>
          <p className="text-sm text-base-400 md:text-base">
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
              className="btn-primary mx-auto w-full whitespace-nowrap rounded-lg py-2 px-3 text-lg md:py-3 md:px-6 md:text-xl"
              onClick={() => sendSlackMessage()}
            >
              Subscribe
            </button>
          </a>
          <p className="text-xs text-base-400">
            Great content, no spam, easy unsubscribe
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
