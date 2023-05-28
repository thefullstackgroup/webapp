import Link from 'next/link';

const Progress = ({ step }) => {
  return (
    <div className="pt-4 sm:pt-4">
      <div className="mx-4 mb-8 md:mx-0">
        <div>
          <div className="mb-2 grid grid-cols-2 text-xs font-medium text-slate-500 sm:text-sm">
            <div className="">
              {step != 1 && (
                <Link href={`/account/signup/step${step - 1}`}>
                  <button className="text-primary-500">&larr; Back</button>
                </Link>
              )}
            </div>

            <div className="text-right">{step}/5</div>
          </div>
          <div className="overflow-hidden rounded-full bg-base-600">
            {step == 1 && (
              <div
                className="bg-primary-500 h-2 rounded-full"
                style={{ width: '20%' }}
              />
            )}
            {step == 2 && (
              <div
                className="bg-primary-500 h-2 rounded-full"
                style={{ width: '40%' }}
              />
            )}
            {step == 3 && (
              <div
                className="bg-primary-500 h-2 rounded-full"
                style={{ width: '60%' }}
              />
            )}
            {step == 4 && (
              <div
                className="bg-primary-500 h-2 rounded-full"
                style={{ width: '80%' }}
              />
            )}
            {step == 5 && (
              <div
                className="bg-primary-500 h-2 rounded-full"
                style={{ width: '100%' }}
              />
            )}
          </div>
        </div>
      </div>

      <h2 className="mb-0 text-center text-2xl font-semibold tracking-tight text-slate-100 sm:text-3xl">
        {step == 1 && 'Basic information'}
        {step == 2 && 'What is your goal?'}
        {step == 3 && 'What are your interests?'}
        {step == 4 && 'What are your ninja skills?'}
        {step == 5 && 'How should we introduce you?'}
      </h2>
    </div>
  );
};

export default Progress;
