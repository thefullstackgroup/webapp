import Ticker from 'react-ticker';
import { testimonials } from './constants';

const TestimonialsSection = () => {
  return (
    <section className="">
      <div className="relative w-full">
        <div className="mt-20 md:mt-40 md:p-12 max-w-screen-xl mx-auto">
          <h4 className="text-2xl md:text-4xl font-semibold text-center mb-10 px-4 font-intertight">
            What the{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600">
              #community
            </span>{' '}
            is saying
          </h4>
          <Ticker speed={3}>
            {({ index }) => (
              <div className="ml-8 flex mb-10">
                {testimonials
                  .sort(() => Math.random() - 0.5)
                  .map((testimonial, index) => (
                    <div key={index}>
                      <div className="border border-purple-600/20 bg-black/20 p-6 rounded-md w-80 md:w-96 h-80 flex flex-col space-y-4 mr-8">
                        <div className="flex items-center space-x-4">
                          <img
                            className="h-14 w-14 rounded-full object-cover"
                            src={testimonial.image}
                            alt={testimonial.name}
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              {testimonial.name}
                            </span>
                            <span className="text-slate-400 text-sm">
                              {testimonial.title}
                            </span>
                          </div>
                        </div>
                        <div className="text-base">{testimonial.comment}</div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </Ticker>
          <Ticker direction="toRight" speed={3}>
            {({ index }) => (
              <div className="flex flex-row-reverse h-96">
                {testimonials
                  .sort(() => Math.random() - 0.5)
                  .map((testimonial, index) => (
                    <div key={index}>
                      <div className="border border-purple-600/20 bg-black/20 p-6 rounded-md w-96 h-80 flex flex-col space-y-4 mr-8">
                        <div className="flex items-center space-x-4">
                          <img
                            className="h-14 w-14 rounded-full object-cover"
                            src={testimonial.image}
                            alt={testimonial.name}
                          />
                          <div className="flex flex-col">
                            <span className="font-semibold">
                              {testimonial.name}
                            </span>
                            <span className="text-slate-400 text-sm">
                              {testimonial.title}
                            </span>
                          </div>
                        </div>
                        <div className="text-base">{testimonial.comment}</div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </Ticker>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
