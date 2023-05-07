const ToolTip = ({ position, message }) => {
  let yPostion = '-top-8 before:top-full before:border-t-tfsdark-600';
  if (position === 'bottom')
    yPostion = '-bottom-8 before:bottom-full before:border-b-tfsdark-600';

  return (
    <span
      className={`pointer-events-none absolute ${yPostion} left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-tfsdark-600 px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:-translate-x-1/2 before:border-4 before:border-transparent before:content-[''] group-hover:opacity-100 text-xs`}
    >
      {message}
    </span>
  );
};

export default ToolTip;
