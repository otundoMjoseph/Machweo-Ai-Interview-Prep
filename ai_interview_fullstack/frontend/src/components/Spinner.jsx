import React from 'react';
import Icon from './Icon.jsx';

const Spinner = () => {
  return (
    React.createElement('div', { className: "flex flex-col items-center justify-center p-8 text-center min-h-[300px]" },
      React.createElement(Icon, { name: "LoaderCircle", className: "animate-spin text-violet-400 h-16 w-16" }),
      React.createElement('p', { className: "mt-4 text-lg text-white/80" }, "Our AI is thinking..."),
      React.createElement('p', { className: "text-sm text-white/60" }, "This might take a moment.")
    )
  );
};

export default Spinner;
