import React from 'react';
import Icon from './Icon.jsx';

const LandingPage = ({ onSignup, onLogin }) => {
  return (
    React.createElement('div', { className: "text-center flex flex-col items-center" },
      React.createElement('div', { className: "p-4 bg-violet-500/20 rounded-full mb-6" },
         React.createElement(Icon, { name: "Sparkles", size: 40, className: "text-violet-300" })
      ),
      React.createElement('h1', { className: "text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-pink-300" },
        "AI Interview Prep"
      ),
      React.createElement('p', { className: "max-w-md mx-auto text-lg text-white/80 mb-8" },
        "Practice with AI. Get instant feedback. Land your dream job."
      ),
      React.createElement('div', { className: "w-full max-w-xs flex flex-col gap-4" },
        React.createElement('button', {
          onClick: onSignup,
          className: "w-full bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
        },
          "Get Started ", React.createElement(Icon, { name: "ArrowRight", size: 20 })
        ),
        React.createElement('button', {
          onClick: onLogin,
          className: "w-full bg-white/10 text-white font-bold py-3 px-6 rounded-lg text-lg hover:bg-white/20 transition-all duration-300"
        },
          "Log In"
        )
      )
    )
  );
};

export default LandingPage;
