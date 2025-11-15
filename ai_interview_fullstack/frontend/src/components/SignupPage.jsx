import React, { useState } from 'react';
import Icon from './Icon.jsx';

const SignupPage = ({ onSignup, onLoginLinkClick }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email && password) {
            onSignup(name, email, password);
        }
    };

    return (
        React.createElement('div', { className: "flex flex-col" },
            React.createElement('h1', { className: "flex items-center gap-3 text-3xl font-bold mb-6" },
                React.createElement(Icon, { name: "UserPlus", size: 32, className: "text-violet-300" }),
                'Create Your Account'
            ),
            React.createElement('form', { onSubmit: handleSubmit, className: "flex flex-col gap-4" },
                React.createElement('input', {
                    type: "text",
                    placeholder: "Full Name",
                    value: name,
                    onChange: (e) => setName(e.target.value),
                    className: "w-full p-4 bg-white/10 rounded-lg placeholder-white/50 border-2 border-transparent focus:border-violet-400 focus:bg-white/5 focus:outline-none transition-all duration-200",
                    required: true
                }),
                React.createElement('input', {
                    type: "email",
                    placeholder: "Email",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    className: "w-full p-4 bg-white/10 rounded-lg placeholder-white/50 border-2 border-transparent focus:border-violet-400 focus:bg-white/5 focus:outline-none transition-all duration-200",
                    required: true
                }),
                React.createElement('input', {
                    type: "password",
                    placeholder: "Password",
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                    className: "w-full p-4 bg-white/10 rounded-lg placeholder-white/50 border-2 border-transparent focus:border-violet-400 focus:bg-white/5 focus:outline-none transition-all duration-200",
                    required: true
                }),
                React.createElement('button', {
                    type: "submit",
                    disabled: !name || !email || !password,
                    className: "w-full bg-gradient-to-r from-violet-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                },
                    'Sign Up'
                )
            ),
            React.createElement('p', { className: "text-center mt-6 text-white/70" },
                "Already have an account? ",
                React.createElement('button', { onClick: onLoginLinkClick, className: "font-semibold text-violet-300 hover:text-white transition-colors" },
                    'Log In'
                )
            )
        )
    );
};

export default SignupPage;
