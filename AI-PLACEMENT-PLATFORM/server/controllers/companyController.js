const pool = require('../config/db');

const COMPANY_PLAYLISTS = [
  {
    id: 1,
    name: 'TCS',
    logo: '🏢',
    tagline: 'TCS NQT (Ninja & Digital) Placement Preparation',
    rounds: ['Foundation Round (Aptitude + Verbal + Reasoning)', 'Advanced Round (Digital Coding)', 'Technical & HR Interview'],
    difficulty: 'Easy to Medium',
    selectionProcess: {
      eligibility: '60% or 6.0 CGPA throughout 10th, 12th, and B.Tech/BCA/MCA (Max 1 active backlog allowed at test time)',
      round1: 'Foundation Section: 75 mins total covering Quantitative Aptitude (20 Qs), Verbal Ability (24 Qs), and Reasoning Ability (20 Qs).',
      round2: 'Advanced Section (Digital Track): 60 mins covering Advanced Quantitative/Reasoning (15 Qs) and 2 Advanced DSA Coding Problems (Java/C++/Python/C).',
      round3: 'Technical, Managerial & HR Round: Face-to-face or video interview focusing on final year project, basic DSA, OOPs, SQL joins, and TCS company values.',
      selectionTips: 'Speed in Quant is crucial. Practice C/Java array manipulation and string reversal for Ninja/Digital coding clearance.'
    },
    pattern: {
      aptitudeDuration: '75 mins',
      dsaQuestions: '2 Coding Problems',
      keyTopics: 'Time & Work, Percentages, Arrays, String Manipulation, Dynamic Programming Basics'
    },
    dsaPlaylists: [
      {
        title: 'TCS NQT Top 20 Most Repeated DSA Problems',
        url: 'https://www.youtube.com/results?search_query=tcs+nqt+dsa+coding+questions',
        topics: ['Array Traversals', 'String Reversal & Palindromes', 'Matrix Operations', 'GCD & Prime Factors'],
        count: '20 Problems'
      },
      {
        title: 'TCS Digital Advanced Coding Track',
        url: 'https://www.youtube.com/results?search_query=tcs+digital+advanced+coding+questions',
        topics: ['Recursion & Backtracking', 'Sorting Algorithms', 'Sliding Window', 'Stack & Queue'],
        count: '15 Problems'
      }
    ],
    aptitudePlaylists: [
      {
        title: 'TCS NQT Quantitative Aptitude Complete Course',
        url: 'https://www.youtube.com/results?search_query=tcs+nqt+aptitude+preparation+playlist',
        topics: ['Speed, Time & Distance', 'Profit & Loss', 'Permutation & Combination', 'Data Interpretation'],
        count: '25 Videos'
      },
      {
        title: 'TCS Logical Reasoning & Pseudo Code Series',
        url: 'https://www.youtube.com/results?search_query=tcs+nqt+logical+reasoning+pseudocode',
        topics: ['Coding-Decoding', 'Blood Relations', 'Syllogism', 'C Pseudo Code'],
        count: '18 Videos'
      }
    ]
  },
  {
    id: 2,
    name: 'Infosys',
    logo: '🌐',
    tagline: 'Infosys Specialist Programmer & System Engineer Track',
    rounds: ['Online Assessment (Mathematical, Logical, Pseudo Code)', 'HackWithInfy / InfyTQ Exam', 'Technical & HR Interview'],
    difficulty: 'Medium',
    selectionProcess: {
      eligibility: '60% or 6.0 CGPA in 10th, 12th, and Diploma/Graduation with no active backlogs.',
      round1: 'Online Test (100 Mins): Mathematical Ability (15 Qs), Reasoning Ability (15 Qs), Verbal Ability (20 Qs), Pseudo Code (5 Qs), Puzzle Solving (4 Qs).',
      round2: 'HackWithInfy / Specialist Programmer Track: 3 Coding Questions ranging from Medium to Hard DSA (DP, Graphs, Trees).',
      round3: 'Technical Interview: In-depth questions on Pseudo Code analysis, Data Structures, Database Normalization, and Operating System Basics.',
      selectionTips: 'Infosys heavily tests Pseudo Code tracing and Logical Puzzles. Master loop execution and recursion output prediction.'
    },
    pattern: {
      aptitudeDuration: '100 mins',
      dsaQuestions: '3 Coding Questions (Easy to Hard)',
      keyTopics: 'Pseudo Code Analysis, Puzzle Solving, Greedy Algorithms, Trees & Graphs'
    },
    dsaPlaylists: [
      {
        title: 'Infosys Pseudo Code & Output Prediction Masterclass',
        url: 'https://www.youtube.com/results?search_query=infosys+pseudo+code+questions',
        topics: ['Loop Tracing', 'Bitwise Operators', 'Pointers in C', 'Recursion Output'],
        count: '30 Videos'
      },
      {
        title: 'HackWithInfy Top DSA Question Series',
        url: 'https://www.youtube.com/results?search_query=hackwithinfy+dsa+questions+playlist',
        topics: ['Dynamic Programming', 'Graph Shortest Path', 'Binary Search', 'Segment Trees'],
        count: '25 Problems'
      }
    ],
    aptitudePlaylists: [
      {
        title: 'Infosys Mathematical Ability & Mathematical Reasoning',
        url: 'https://www.youtube.com/results?search_query=infosys+mathematical+ability+questions',
        topics: ['Divisibility Rules', 'Algebraic Equations', 'Averages & Mixtures', 'Probability'],
        count: '20 Videos'
      },
      {
        title: 'Infosys Puzzle Solving & Critical Reasoning',
        url: 'https://www.youtube.com/results?search_query=infosys+puzzle+questions',
        topics: ['Seating Arrangements', 'Data Sufficiency', 'Venn Diagrams', 'Logical Puzzles'],
        count: '15 Videos'
      }
    ]
  },
  {
    id: 3,
    name: 'Cognizant',
    logo: '⚙️',
    tagline: 'Cognizant GenC & GenC Elevate Placement Kit',
    rounds: ['Communication Test', 'GenC / GenC Elevate Technical Assessment', 'Technical & HR Interview'],
    difficulty: 'Easy to Medium',
    selectionProcess: {
      eligibility: '60% aggregate in 10th, 12th, and UG/PG courses with maximum 1 standing backlog.',
      round1: 'Communication Round (45 Mins): Audio reading, listening comprehension, sentence mastery, and vocabulary check.',
      round2: 'Technical & Aptitude Assessment: Quantitative Aptitude, Logical Reasoning, Pseudo Code, Data Structures, and 2 Coding Questions.',
      round3: 'Technical & HR Interview: Discussion on Object-Oriented Programming (OOPs), SQL Queries, C/Java concepts, and relocation willingness.',
      selectionTips: 'GenC Elevate focuses strongly on Data Structures (Arrays, Strings, Linked Lists) and SQL queries.'
    },
    pattern: {
      aptitudeDuration: '90 mins',
      dsaQuestions: '2 Coding Questions',
      keyTopics: 'Communication Ability, Pseudo Code, SQL Queries, Array Operations'
    },
    dsaPlaylists: [
      {
        title: 'Cognizant GenC Elevate Coding & DSA Questions',
        url: 'https://www.youtube.com/results?search_query=cognizant+genc+elevate+coding+questions',
        topics: ['String Manipulation', 'Array Searching & Sorting', 'Linked List Basics', 'Matrix Rotation'],
        count: '25 Problems'
      },
      {
        title: 'Cognizant Technical Pseudo Code & Debugging Series',
        url: 'https://www.youtube.com/results?search_query=cognizant+genc+pseudo+code+questions',
        topics: ['Error Finding', 'Output Tracing', 'C Syntax Rules', 'Operator Precedence'],
        count: '20 Videos'
      }
    ],
    aptitudePlaylists: [
      {
        title: 'Cognizant Quantitative & Logical Aptitude Course',
        url: 'https://www.youtube.com/results?search_query=cognizant+aptitude+questions+playlist',
        topics: ['Number Series', 'Percentages', 'Data Interpretation', 'Direction Sense'],
        count: '22 Videos'
      },
      {
        title: 'Cognizant Communication Test Preparation',
        url: 'https://www.youtube.com/results?search_query=cognizant+communication+test+preparation',
        topics: ['Pronunciation', 'Grammar Rules', 'Listening Comprehension', 'Sentence Repeat'],
        count: '12 Videos'
      }
    ]
  },
  {
    id: 4,
    name: 'Capgemini',
    logo: '💎',
    tagline: 'Capgemini Excellence & Senior Analyst Hiring Track',
    rounds: ['Technical Test (Pseudo Code + MCQ)', 'English Ability & Game-Based Aptitude', 'Behavioral Competency & Technical Interview'],
    difficulty: 'Easy to Medium',
    selectionProcess: {
      eligibility: '60% throughout academics (10th, 12th, Graduation) with no active backlogs during joining.',
      round1: 'Technical Test (40 mins): Pseudo Code (12 Qs) + Computer Fundamentals (20 Qs on Cloud, OS, DBMS, Networking).',
      round2: 'Game-Based Aptitude & English (45 mins): 4 Interactive Grid Games (Grid Challenge, Motion Challenge, Deductive Reasoning) + English test.',
      round3: 'Technical & HR Interview: One-on-one discussion on Resume projects, Core Java/Python concepts, SQL Queries, and situational questions.',
      selectionTips: 'Capgemini’s Game-Based Aptitude requires quick spatial memory and focus. Practice grid memory games before the exam.'
    },
    pattern: {
      aptitudeDuration: '85 mins',
      dsaQuestions: 'Pseudo Code + 1-2 Coding Questions',
      keyTopics: 'Game-based Aptitude, Spatial Memory, Pseudo Code, CS Fundamentals'
    },
    dsaPlaylists: [
      {
        title: 'Capgemini Coding & Pseudo Code Top Questions',
        url: 'https://www.youtube.com/results?search_query=capgemini+coding+questions+playlist',
        topics: ['Pseudo Code Debugging', 'Array Elements Sum', 'String Pattern Matching', 'Basic Recursion'],
        count: '20 Videos'
      }
    ],
    aptitudePlaylists: [
      {
        title: 'Capgemini Game Based Aptitude Masterclass',
        url: 'https://www.youtube.com/results?search_query=capgemini+game+based+aptitude+questions',
        topics: ['Grid Challenge Memory', 'Motion Challenge', 'Digit Challenge', 'Deductive Logic'],
        count: '18 Videos'
      },
      {
        title: 'Capgemini Technical MCQ & English Revision',
        url: 'https://www.youtube.com/results?search_query=capgemini+technical+mcq+pseudo+code',
        topics: ['Data Communication', 'Software Engineering', 'Synonyms & Antonyms', 'Error Spotting'],
        count: '15 Videos'
      }
    ]
  },
  {
    id: 5,
    name: 'Amazon',
    logo: '📦',
    tagline: 'Amazon SDE Placement Preparation Kit',
    rounds: ['Online Assessment (OA: 2 DSA + Work Style Survey)', 'Technical Interview 1 (DSA)', 'Technical Interview 2 (System Design/Bar Raiser)'],
    difficulty: 'Hard',
    selectionProcess: {
      eligibility: 'B.Tech/M.Tech/MCA/CS background with solid problem solving skills and strong Computer Science foundations.',
      round1: 'Online Assessment (OA - 90 mins): 2 Medium to Hard DSA Coding Questions on Hackerrank + Work Style Assessment (Leadership Principles).',
      round2: 'Technical Interview Round 1 (60 mins): Live coding on DS/Algo (Trees, Graphs, DP) + 1 Leadership Principle question.',
      round3: 'Bar Raiser / System Design Round (60 mins): Object-Oriented Design (OOD), High-Level Design (HLD) basics, and deep behavioral questioning.',
      selectionTips: 'Amazon heavily tests 14 Leadership Principles alongside clean production-ready code with optimal Time/Space complexity.'
    },
    pattern: {
      aptitudeDuration: 'No Aptitude round (100% DSA & Leadership Principles)',
      dsaQuestions: '2 Medium-Hard LeetCode Questions',
      keyTopics: 'Arrays, Trees, Graphs, Dynamic Programming, Heap/Priority Queue, System Design'
    },
    dsaPlaylists: [
      {
        title: 'Amazon Top 50 Most Frequently Asked DSA Problems',
        url: 'https://www.youtube.com/results?search_query=amazon+most+asked+leetcode+questions',
        topics: ['Two Pointers', 'Binary Tree Traversal & LRU Cache', 'Graph BFS/DFS', 'Topological Sort'],
        count: '50 Problems'
      },
      {
        title: 'Amazon Online Assessment (OA) Simulation Series',
        url: 'https://www.youtube.com/results?search_query=amazon+sde+oa+coding+questions',
        topics: ['Kth Largest Element', 'Reorder Data in Log Files', 'Number of Islands', 'Coin Change'],
        count: '30 Videos'
      }
    ],
    aptitudePlaylists: [
      {
        title: 'Amazon Leadership Principles & Behavioral Interview Mastery',
        url: 'https://www.youtube.com/results?search_query=amazon+leadership+principles+interview',
        topics: ['Customer Obsession', 'Ownership', 'Bias for Action', 'STAR Method'],
        count: '12 Videos'
      }
    ]
  },
  {
    id: 6,
    name: 'Microsoft',
    logo: '💻',
    tagline: 'Microsoft Software Engineer Hiring Track',
    rounds: ['Codility Online Test (2-3 DSA Questions)', 'Technical Rounds (DSA, CS Fundamentals)', 'AA Round (Appropriateness & Architecture)'],
    difficulty: 'Medium to Hard',
    selectionProcess: {
      eligibility: 'BE/B.Tech/M.Tech/MS/MCA graduates with strong coding fundamentals and low-level engineering skills.',
      round1: 'Online Codility Test (100 Mins): 3 Algorithmic Coding Problems covering Strings, Linked Lists, Trees, and Array manipulation.',
      round2: 'Technical Interview Rounds (2-3 rounds): In-depth live coding on whiteboard/editor, dry-running edge cases, OS, DBMS, Networks.',
      round3: 'AA Round (As-Appropriate): Senior engineering leader evaluating architectural thinking, growth mindset, and technical depth.',
      selectionTips: 'Write clean code, communicate your thought process out loud, and thoroughly test edge cases before submitting.'
    },
    pattern: {
      aptitudeDuration: 'No Aptitude (Pure Problem Solving)',
      dsaQuestions: '3 Problems in 100 Mins',
      keyTopics: 'Linked Lists, Binary Search Trees, Strings, Arrays, Backtracking'
    },
    dsaPlaylists: [
      {
        title: 'Microsoft Codility & LeetCode Top 40 Questions',
        url: 'https://www.youtube.com/results?search_query=microsoft+leetcode+top+questions',
        topics: ['Reverse Linked List II', 'Validate Binary Search Tree', 'Word Search', 'Group Anagrams'],
        count: '40 Problems'
      }
    ],
    aptitudePlaylists: [
      {
        title: 'Microsoft Core CS Fundamentals Revision (OS, DBMS, Networks)',
        url: 'https://www.youtube.com/results?search_query=core+cs+fundamentals+for+microsoft+interview',
        topics: ['Operating Systems Paging & Virtual Memory', 'SQL Queries & Indexing', 'Computer Networks TCP/IP'],
        count: '15 Videos'
      }
    ]
  },
  {
    id: 7,
    name: 'Wipro',
    logo: '⚡',
    tagline: 'Wipro Elite NTH & Turbo Placement Kit',
    rounds: ['Online Test (Aptitude + English + Essay + Coding)', 'Technical Interview', 'HR Interview'],
    difficulty: 'Easy to Medium',
    selectionProcess: {
      eligibility: '60% in 10th, 12th, and Graduation with no standing backlogs at registration.',
      round1: 'Wipro NLTH Test (128 mins): Quantitative (16 Qs), Logical (14 Qs), English (18 Qs), Essay Writing (1 Q), Coding (2 Qs).',
      round2: 'Technical Interview: Basic programming questions in C/C++/Java/Python, basic SQL queries, and project walkthrough.',
      round3: 'HR Round: Document verification, willingness to work in shifts/locations, communication skills check.',
      selectionTips: 'Essay writing has automated AI grammar checking — ensure proper spelling, paragraph structure, and zero typo errors.'
    },
    pattern: {
      aptitudeDuration: '60 mins',
      dsaQuestions: '2 Basic-Intermediate Coding Questions',
      keyTopics: 'Quant, Logical, English Grammar, Arrays & Strings in C/Java/Python'
    },
    dsaPlaylists: [
      {
        title: 'Wipro Elite NTH Coding Questions Preparation',
        url: 'https://www.youtube.com/results?search_query=wipro+elite+nth+coding+questions',
        topics: ['Palindrome Check', 'Fibonacci Series', 'Armstrong Numbers', 'Array Searching'],
        count: '15 Videos'
      }
    ],
    aptitudePlaylists: [
      {
        title: 'Wipro Elite NTH Aptitude & Verbal Crash Course',
        url: 'https://www.youtube.com/results?search_query=wipro+aptitude+and+verbal+preparation',
        topics: ['Simple & Compound Interest', 'Ratio & Proportion', 'Reading Comprehension', 'Sentence Correction'],
        count: '20 Videos'
      }
    ]
  },
  {
    id: 8,
    name: 'Accenture',
    logo: '🚀',
    tagline: 'Accenture Cognitive & Technical Assessment Track',
    rounds: ['Cognitive & Technical Test (Aptitude, Pseudo Code, CS Modules)', 'Coding Test', 'Communication Test', 'Interview'],
    difficulty: 'Easy to Medium',
    selectionProcess: {
      eligibility: '65% or 6.5 CGPA in current degree with no active backlogs.',
      round1: 'Cognitive & Technical Assessment (90 Mins): Quantitative (18 Qs), Reasoning (18 Qs), Verbal (18 Qs), Pseudo Code (18 Qs), Common Applications & MS Office (12 Qs), Networking & Security (10 Qs).',
      round2: 'Coding Test (45 Mins): 2 Coding Problems evaluating basic language syntax and array/string logic.',
      round3: 'Communication Assessment & Technical Interview: Automated voice test followed by technical discussion on resume projects.',
      selectionTips: 'Cognitive round clearing is mandatory to qualify for coding round. Focus on Pseudo Code and MS Office technical questions.'
    },
    pattern: {
      aptitudeDuration: '90 mins',
      dsaQuestions: '2 Coding Problems',
      keyTopics: 'Pseudo Code, Critical Reasoning, Common Applications, MS Office, Fundamentals'
    },
    dsaPlaylists: [
      {
        title: 'Accenture Coding Questions & Pattern Playlist',
        url: 'https://www.youtube.com/results?search_query=accenture+coding+questions+playlist',
        topics: ['Bitwise Operations', 'Array Transformation', 'String Encryption', 'Basic Math'],
        count: '22 Videos'
      }
    ],
    aptitudePlaylists: [
      {
        title: 'Accenture Cognitive Assessment Complete Series',
        url: 'https://www.youtube.com/results?search_query=accenture+cognitive+and+technical+assessment',
        topics: ['Abstract Reasoning', 'Flowcharts & Logic', 'Network Security Basics', 'Pseudo Code'],
        count: '25 Videos'
      }
    ]
  }
];

// GET /api/companies
async function getCompanyPlaylists(req, res, next) {
  try {
    res.json(COMPANY_PLAYLISTS);
  } catch (err) {
    next(err);
  }
}

module.exports = { getCompanyPlaylists };
