import React, { useState } from 'react';
import Icon from './Icon.jsx';

const JobSelectionPage = ({ onStartInterview }) => {
  const [selectedJob, setSelectedJob] = useState('');
  const [customJob, setCustomJob] = useState('');

  const jobs = ['Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'Marketing Manager'];

  const handleJobSelect = (job) => {
    setSelectedJob(job);
    setCustomJob('');
  };

  const handleCustomJobChange = (e) => {
    setCustomJob(e.target.value);
    setSelectedJob('');
  };

  const handleStart = () => {
    const role = customJob.trim() || selectedJob;
    if (role) {
      onStartInterview(role);
    }
  };

  return (
    React.createElement('div', { className: "flex flex-col" },
      React.createElement('h1', { className: "flex items-center gap-3 text-3xl font-bold mb-6" },
        React.createElement(Icon, { name: "Briefcase", size: 32, className: "text-violet-300" }),
        'Choose Your Role'
      ),
      React.createElement('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-3 mb-4" },
        jobs.map(job => (
          React.createElement('button', {
            key: job,
            className: `w-full text-left p-4 rounded-lg transition-all duration-200 border-2 ${selectedJob === job ? 'bg-violet-500 border-violet-400' : 'bg-white/10 border-transparent hover:bg-white/20'}`,
            onClick: () => handleJobSelect(job)
          },
            job
          )
        ))
      ),
       React.createElement('input', {
        type: "text",
        placeholder: "Or enter a custom job title...",
        value: customJob,
        onChange: handleCustomJobChange,
        className: "w-full p-4 bg-white/10 rounded-lg placeholder-white/50 border-2 border-transparent focus:border-violet-400 focus:bg-white/5 focus:outline-none transition-all duration-200 mb-6"
      }),
      React.createElement('button', {
        onClick: handleStart,
        disabled: !selectedJob && !customJob.trim(),
        className: "w-full bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
      },
        'Start Interview ', React.createElement(Icon, { name: "Play", size: 20 })
      )
    )
  );
};

export default JobSelectionPage;
