import Ticker from 'react-ticker';
import { testimonials } from './constants';

const TestimonialsSection = () => {
  return (
    <section className="">
      <div className="relative w-full">
        <div className="mx-auto mt-20 max-w-screen-xl md:mt-40 md:p-12">
          <h4 className="mb-10 px-4 text-center font-intertight text-2xl font-semibold md:text-4xl">
            What the{' '}
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-blue-600 bg-clip-text text-transparent">
              #community
            </span>{' '}
            is saying
          </h4>
          <Ticker speed={3}>
            {({ index }) => (
              <div className="ml-8 mb-10 flex">
                {testimonials
                  .sort(() => Math.random() - 0.5)
                  .map((testimonial, index) => (
                    <div key={index}>
                      <div className="mr-8 flex h-80 w-80 flex-col space-y-4 rounded-md border border-purple-600/20 bg-black/20 p-6 md:w-96">
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
                            <span className="text-sm text-base-400">
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
              <div className="flex h-96 flex-row-reverse">
                {testimonials
                  .sort(() => Math.random() - 0.5)
                  .map((testimonial, index) => (
                    <div key={index}>
                      <div className="mr-8 flex h-80 w-96 flex-col space-y-4 rounded-md border border-purple-600/20 bg-black/20 p-6">
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
                            <span className="text-sm text-base-400">
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
