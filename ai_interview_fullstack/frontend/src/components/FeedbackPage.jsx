import React from 'react';
import Icon from './Icon.jsx';

// A simple markdown to React element converter for bold and lists
const SimpleMarkdown = ({ text }) => {
    const lines = text.split('\n');
    const elements = lines.map((line, i) => {
        if (line.startsWith('* ')) {
            return React.createElement('li', { key: i, className: "mb-2" }, line.substring(2));
        }
        if (line.match(/^\d+\.\s/)) {
            return React.createElement('li', { key: i, className: "mb-2" }, line.replace(/^\d+\.\s/, ''));
        }
        if (line.startsWith('### ')) {
            return React.createElement('h3', { key: i, className: "text-xl font-semibold mt-4 mb-2 text-violet-300" }, line.substring(4));
        }
        if (line.startsWith('## ')) {
             return React.createElement('h2', { key: i, className: "text-2xl font-bold mt-6 mb-3 text-pink-300" }, line.substring(3));
        }
        if(line.trim() === '') {
            // Using a styled div for <br> equivalent with margin
            return React.createElement('div', { key: i, style: { height: '1rem' } });
        }
        return React.createElement('p', { key: i, className: "mb-4" }, line);
    });

    const groupedElements = [];
    let listItems = [];

    const flushList = () => {
        if (listItems.length > 0) {
            // Simple assumption: all lists are unordered. Can be improved.
            groupedElements.push(React.createElement('ul', { key: `list-${groupedElements.length}`, className: "list-disc list-inside pl-4 mb-4" }, ...listItems));
            listItems = [];
        }
    };

    for (const element of elements) {
        if (element.type === 'li') {
            listItems.push(element);
        } else {
            flushList();
            groupedElements.push(element);
        }
    }
    flushList();

    return React.createElement(React.Fragment, null, ...groupedElements);
};


const FeedbackPage = ({ role, question, answer, feedback, onAskAnother }) => {
  return (
    React.createElement('div', { className: "flex flex-col" },
      React.createElement('h1', { className: "text-3xl font-bold mb-4 text-center" }, "Your Feedback"),
      React.createElement('div', { className: "space-y-6 text-white/90" },
        React.createElement('details', { className: "bg-black/20 p-4 rounded-lg cursor-pointer" },
          React.createElement('summary', { className: "font-semibold text-lg" }, "Your Answer"),
          React.createElement('div', { className: "mt-4 pt-4 border-t border-white/20" },
            React.createElement('p', { className: "font-medium text-violet-300 mb-2" }, `Question: "${question}"`),
            React.createElement('p', { className: "whitespace-pre-wrap" }, answer)
          )
        ),
        React.createElement('div', { className: "bg-black/20 p-4 rounded-lg" },
          React.createElement('h2', { className: "text-2xl font-bold mb-3 flex items-center gap-2 text-pink-300" },
            React.createElement(Icon, { name: "MessageSquareQuote" }), " AI Feedback"
          ),
          React.createElement('div', { className: "prose prose-invert max-w-none text-white/90" },
             React.createElement(SimpleMarkdown, { text: feedback })
          )
        )
      ),
      React.createElement('button', {
        onClick: onAskAnother,
        className: "mt-8 w-full bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
      },
        "Practice Another Question ", React.createElement(Icon, { name: "RefreshCw", size: 20 })
      )
    )
  );
};

export default FeedbackPage;
