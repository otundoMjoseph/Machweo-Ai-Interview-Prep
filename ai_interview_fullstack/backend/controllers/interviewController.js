import Attempt from '../models/Attempt.js';

const QUESTIONS_BY_ROLE = {
  'Software Engineer': [
    'Tell me about a time you debugged a complex issue in production.',
    'Describe a challenging feature you built end-to-end.'
  ],
  'Data Scientist': [
    'Describe a machine learning project you led from problem to deployment.',
    'How do you handle imbalanced datasets in classification problems?'
  ],
  'Product Manager': [
    'Tell me about a time you had to prioritize conflicting stakeholder requests.',
    'How do you define and measure success for a new feature?'
  ],
  'UX Designer': [
    'Describe your process for conducting user research.',
    'Tell me about a time usability testing changed your design direction.'
  ],
  'Marketing Manager': [
    'Tell me about a campaign you led that didn’t go as planned.',
    'How do you decide which marketing channels to prioritize?'
  ]
};

const GENERIC_QUESTIONS = [
  'Tell me about a time you faced a difficult challenge and how you handled it.',
  'Describe your biggest professional achievement and what you learned from it.',
  'Tell me about a time you received critical feedback. How did you respond?'
];

const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generateQuestion = async (req, res) => {
  try {
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({ message: 'Role is required.' });
    }

    const bank = QUESTIONS_BY_ROLE[role] || GENERIC_QUESTIONS;
    const question = pickRandom(bank);

    return res.status(200).json({ question });
  } catch (err) {
    console.error('Generate question error:', err.message);
    return res.status(500).json({ message: 'Server error generating question.' });
  }
};

const generateFeedbackText = (role, question, answer) => {
  const trimmed = answer.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const comments = [];

  if (wordCount < 40) {
    comments.push('- Your answer is quite short. Add more detail and context.');
  } else {
    comments.push('- Good length – you provided enough detail to evaluate.');
  }

  if (!/I\s|I'|me\b|my\b/.test(answer)) {
    comments.push('- Use more first-person language (“I did…”) to show ownership.');
  }

  if (!/team|stakeholder|client|colleag/i.test(answer)) {
    comments.push('- Mention how you worked with others (team, stakeholders, clients).');
  }

  if (!/result|impact|outcome|improv/i.test(answer)) {
    comments.push('- Highlight the result or impact of your actions (what changed?).');
  }

  return [
    `## Feedback for your ${role} interview answer`,
    '',
    `**Question:** ${question}`,
    '',
    `**Approx. length:** ~${wordCount} words`,
    '',
    '### What you did well',
    '- You attempted to address the question and share your experience.',
    '',
    '### How you can improve',
    ...comments,
    '',
    '### Next steps',
    '- Try structuring your answer as: Situation → Task → Action → Result (STAR).',
    '- Practice saying your answer out loud to make it more natural.'
  ].join('\n');
};

export const handleAnswer = async (req, res) => {
  try {
    const { role, question, answer } = req.body;

    if (!role || !question || !answer) {
      return res.status(400).json({ message: 'role, question and answer are required.' });
    }

    const feedback = generateFeedbackText(role, question, answer);

    const attempt = await Attempt.create({
      user: req.user._id,
      role,
      question,
      answer,
      feedback
    });

    return res.status(201).json({
      feedback,
      attemptId: attempt._id
    });
  } catch (err) {
    console.error('Handle answer error:', err.message);
    return res.status(500).json({ message: 'Server error processing answer.' });
  }
};

export const getHistory = async (req, res) => {
  try {
    const attempts = await Attempt.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('-__v');

    return res.status(200).json(attempts);
  } catch (err) {
    console.error('Get history error:', err.message);
    return res.status(500).json({ message: 'Server error fetching history.' });
  }
};
