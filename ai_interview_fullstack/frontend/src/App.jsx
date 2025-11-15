import React, { useState, useCallback, useEffect } from 'react';
import LandingPage from './components/LandingPage.jsx';
import JobSelectionPage from './components/JobSelectionPage.jsx';
import InterviewPage from './components/InterviewPage.jsx';
import FeedbackPage from './components/FeedbackPage.jsx';

import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import { generateInterviewQuestion, getAnswerFeedback } from './Services/geminiService.js';
import * as authService from './Services/authService.js';
import Spinner from './components/Spinner.jsx';
import Icon from './components/Icon.jsx';

export default function App() {
  const [page, setPage] = useState('Landing');
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        setUser(JSON.parse(userData));
        setPage('JobSelection');
      }
    } catch (e) {
      console.error("Failed to parse user data from localStorage", e);
      localStorage.clear();
    } finally {
        setIsLoading(false);
    }
  }, []);

  const handleLogin = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user: loggedInUser, token } = await authService.login(email, password);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      setPage('JobSelection');
    } catch (err) {
      setError(err.message || 'Failed to log in.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSignup = useCallback(async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const { user: signedUpUser, token } = await authService.signup(name, email, password);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(signedUpUser));
      setUser(signedUpUser);
      setPage('JobSelection');
    } catch (err) {
      setError(err.message || 'Failed to sign up.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setRole('');
    setQuestion('');
    setAnswer('');
    setFeedback('');
    setError(null);
    setPage('Landing');
  }, []);

  const handleStartInterview = useCallback(async (selectedRole) => {
    setIsLoading(true);
    setError(null);
    try {
      setRole(selectedRole);
      const generatedQuestion = await generateInterviewQuestion(selectedRole);
      setQuestion(generatedQuestion);
      setAnswer('');
      setFeedback('');
      setPage('Interview');
    } catch (err) {
      setError('Failed to generate a question. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmitAnswer = useCallback(async (submittedAnswer) => {
    setIsLoading(true);
    setError(null);
    try {
      setAnswer(submittedAnswer);
      const generatedFeedback = await getAnswerFeedback(role, question, submittedAnswer);
      setFeedback(generatedFeedback);
      setPage('Feedback');
    } catch (err) {
      setError('Failed to get feedback. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [role, question]);

  const handleTryAgain = useCallback(() => {
    setPage('JobSelection');
    setError(null);
  }, []);

  const handleAskAnother = useCallback(() => {
    handleStartInterview(role);
  }, [role, handleStartInterview]);

  const renderContent = () => {
    if (isLoading) {
      return React.createElement(Spinner, null);
    }
    if (error) {
        return React.createElement('div', { className: "text-center text-red-400 p-4" },
            React.createElement('p', { className: 'font-semibold' }, 'An Error Occurred'),
            React.createElement('p', { className: 'text-sm mb-4' }, error),
            React.createElement('button', {
                onClick: () => {
                  setError(null);
                  user ? setPage('JobSelection') : setPage('Landing');
                },
                className: "bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg"
            }, 'Try Again')
        );
    }

    if (!user) {
        switch (page) {
            case 'Signup':
                return React.createElement(SignupPage, { onSignup: handleSignup, onLoginLinkClick: () => setPage('Login') });
            case 'Login':
                return React.createElement(LoginPage, { onLogin: handleLogin, onSignupLinkClick: () => setPage('Signup') });
            default:
                return React.createElement(LandingPage, { onSignup: () => setPage('Signup'), onLogin: () => setPage('Login') });
        }
    }

    switch (page) {
      case 'JobSelection':
        return React.createElement(JobSelectionPage, { onStartInterview: handleStartInterview });
      case 'Interview':
        return React.createElement(InterviewPage, { role: role, question: question, onSubmit: handleSubmitAnswer });
      case 'Feedback':
        return React.createElement(FeedbackPage, { role: role, question: question, answer: answer, feedback: feedback, onAskAnother: handleAskAnother });
      default:
        return React.createElement(JobSelectionPage, { onStartInterview: handleStartInterview });
    }
  };

  return (
    React.createElement('div', { className: "min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white flex flex-col items-center justify-center p-4" },
      React.createElement('main', { className: "w-full max-w-2xl" },
         React.createElement('div', { className: "bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transition-all duration-300" },
            user && React.createElement('header', { className: "flex justify-between items-center p-4 border-b border-white/20" },
                React.createElement('p', { className: "text-sm font-medium" }, `Welcome, ${user.name}!`),
                React.createElement('button', { onClick: handleLogout, className: "flex items-center gap-2 text-sm font-semibold text-violet-300 hover:text-white transition-colors" },
                    React.createElement(Icon, { name: "LogOut", size: 16 }),
                    'Logout'
                )
            ),
            React.createElement('div', { className: "p-6 sm:p-8" },
              renderContent()
            )
         )
      )
    )
  );
}
