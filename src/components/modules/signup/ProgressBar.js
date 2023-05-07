import Link from 'next/link';

const Progress = ({ step }) => {
  return (
    <div className="pt-4 sm:pt-4">
      <div className="mb-8 mx-4 md:mx-0">
        <div>
          <div className="grid grid-cols-2 text-xs sm:text-sm font-medium text-slate-500 mb-2">
            <div className="">
              {step != 1 && (
                <Link href={`/account/signup/step${step - 1}`}>
                  <button className="text-primary-500">&larr; Back</button>
                </Link>
              )}
            </div>

            <div className="text-right">{step}/5</div>
          </div>
          <div className="bg-tfsdark-600 rounded-full overflow-hidden">
            {step == 1 && (
              <div
                className="h-2 bg-primary-500 rounded-full"
                style={{ width: '20%' }}
              />
            )}
            {step == 2 && (
              <div
                className="h-2 bg-primary-500 rounded-full"
                style={{ width: '40%' }}
              />
            )}
            {step == 3 && (
              <div
                className="h-2 bg-primary-500 rounded-full"
                style={{ width: '60%' }}
              />
            )}
            {step == 4 && (
              <div
                className="h-2 bg-primary-500 rounded-full"
                style={{ width: '80%' }}
              />
            )}
            {step == 5 && (
              <div
                className="h-2 bg-primary-500 rounded-full"
                style={{ width: '100%' }}
              />
            )}
          </div>
        </div>
      </div>

      <h2 className="tracking-tight mb-0 text-2xl sm:text-3xl font-semibold text-slate-100 text-center">
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
