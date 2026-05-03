export const quizQuestions = [
  {
    id: 'q1',
    question: 'Who is responsible for conducting Lok Sabha elections in India?',
    options: ['The Supreme Court of India', 'The Election Commission of India', 'The Ministry of Home Affairs', 'The President of India'],
    answerIndex: 1,
    explanation: 'The Election Commission of India (ECI) is a constitutional body under Article 324, responsible for superintending, directing, and controlling all elections to Parliament and State Legislatures.',
  },
  {
    id: 'q2', question: 'What is NOTA?',
    options: ['A type of Electronic Voting Machine', 'A postal ballot system for NRIs', 'An option to reject all candidates on the ballot', 'A voter registration form'],
    answerIndex: 2,
    explanation: 'NOTA (None of the Above) was introduced by the Supreme Court in 2013. It allows voters to reject all candidates, though it does not affect the outcome — the candidate with the most votes still wins.',
  },
  {
    id: 'q3',
    question: 'How many seats does a party need to win a majority in the Lok Sabha?',
    options: ['243', '252', '272', '300'],
    answerIndex: 2,
    explanation: 'The Lok Sabha has 543 elected seats. A simple majority requires 272 seats (more than half of 543), which is needed to form a government.',
  },
  {
    id: 'q4',
    question: 'What is the Model Code of Conduct?',
    options: ['Rules for how EVMs must be manufactured', 'ECI guidelines restricting parties and candidates during election period', 'A code of ethics for Supreme Court judges', 'A law governing campaign finance'],
    answerIndex: 1,
    explanation: 'The MCC is a set of ECI guidelines that comes into effect from the date of election announcement. It prohibits use of government resources for campaigning, religious appeals for votes, and bribery.',
  },
  {
    id: 'q5',
    question: 'What does VVPAT stand for?',
    options: ['Voter Verified Public Audit Trail', 'Verified Voting Paper and Tally', 'Voter Verified Paper Audit Trail', 'Validated Vote Print and Track'],
    answerIndex: 2,
    explanation: 'VVPAT machines are attached to EVMs and print a paper slip showing the voter\'s chosen candidate symbol and name, displayed for 7 seconds before dropping into a sealed compartment for audit purposes.',
  },
];

export const scoreMessages = {
  perfect: '🏆 Perfect Score! Outstanding civic knowledge!',
  strong: '🎉 Well done! You know Indian elections well.',
  learning: '📚 Keep learning! Explore the Timeline and Glossary.',
  start: "🗳️ Let's learn together! Start with the Timeline tab.",
};
