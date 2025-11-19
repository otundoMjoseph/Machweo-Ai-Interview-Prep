import React, { useState } from 'react';
import Icon from './Icon.jsx';

const InterviewPage = ({ role, question, onSubmit }) => {
  const [answer, setAnswer] = useState('');

  return (
    React.createElement('div', { className: "flex flex-col" },
      React.createElement('h1', { className: "text-2xl md:text-3xl font-bold mb-2" }, `Interview for ${role}`),
      React.createElement('p', { className: "text-white/70 mb-6" }, "The AI will now ask you a question."),
      React.createElement('div', { className: "bg-black/20 p-6 rounded-lg mb-6" },
        React.createElement('h3', { className: "text-xl md:text-2xl font-semibold leading-snug" }, `“${question}”`)
      ),
      React.createElement('textarea', {
        placeholder: "Craft your detailed answer here...",
        value: answer,
        onChange: e => setAnswer(e.target.value),
        className: "w-full h-48 p-4 bg-white/10 rounded-lg placeholder-white/50 border-2 border-transparent focus:border-violet-400 focus:bg-white/5 focus:outline-none transition-all duration-200 mb-6 resize-none"
      }),
      React.createElement('button', {
        onClick: () => onSubmit(answer),
        disabled: !answer.trim(),
        className: "w-full bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
      },
        "Submit Answer ", React.createElement(Icon, { name: "Send", size: 20 })
      )
    )
  );
}; 

export default InterviewPage;
