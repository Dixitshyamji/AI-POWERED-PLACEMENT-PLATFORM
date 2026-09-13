const pool = require('../config/db');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'demo_key');

// Static question bank — Coding, DSA, Aptitude, Core CS
const QUESTION_BANK = [
  // Coding
  {
    id: 'c1',
    category: 'Coding',
    topic: 'Output & Logic',
    question: 'What will be the output of `console.log(typeof NaN)` in JavaScript?',
    option_a: 'number',
    option_b: 'NaN',
    option_c: 'undefined',
    option_d: 'object',
    correct_option: 'A',
    explanation: 'In JavaScript, `NaN` (Not-a-Number) is technically of type "number".'
  },
  {
    id: 'c2',
    category: 'Coding',
    topic: 'Java Syntax & Basics',
    question: 'Which keyword is used to prevent method overriding in Java?',
    option_a: 'static',
    option_b: 'final',
    option_c: 'abstract',
    option_d: 'super',
    correct_option: 'B',
    explanation: 'The `final` keyword prevents a method from being overridden by subclasses.'
  },
  // DSA
  {
    id: 'd1',
    category: 'DSA',
    topic: 'Time Complexity',
    question: 'What is the worst-case time complexity of QuickSort?',
    option_a: 'O(N log N)',
    option_b: 'O(N)',
    option_c: 'O(N^2)',
    option_d: 'O(log N)',
    correct_option: 'C',
    explanation: 'QuickSort exhibits O(N^2) worst-case time complexity when the pivot selection is poor (e.g., sorted array with first element as pivot).'
  },
  {
    id: 'd2',
    category: 'DSA',
    topic: 'Data Structures',
    question: 'Which data structure is naturally used for Depth First Search (DFS) of a graph?',
    option_a: 'Queue',
    option_b: 'Stack',
    option_c: 'Heap',
    option_d: 'Hash Map',
    correct_option: 'B',
    explanation: 'DFS uses a Stack (or function recursion call stack) to explore branches deeply before backtracking.'
  },
  // Aptitude
  {
    id: 'a1',
    category: 'Aptitude',
    topic: 'Quantitative Speed & Distance',
    question: 'A train 150m long is running at 54 km/h. How many seconds will it take to pass a telegraph post?',
    option_a: '10 sec',
    option_b: '12 sec',
    option_c: '15 sec',
    option_d: '18 sec',
    correct_option: 'A',
    explanation: 'Speed = 54 * (5/18) = 15 m/s. Time = Distance / Speed = 150 / 15 = 10 seconds.'
  },
  {
    id: 'a2',
    category: 'Aptitude',
    topic: 'Logical Reasoning',
    question: 'If CAT is coded as 3120, how is DOG coded?',
    option_a: '4157',
    option_b: '4147',
    option_c: '3157',
    option_d: '4158',
    correct_option: 'A',
    explanation: 'D = 4, O = 15, G = 7, so DOG = 4157.'
  },
  // Core CS
  {
    id: 'cs1',
    category: 'Core CS',
    topic: 'Operating Systems',
    question: 'Which condition is NOT one of the four necessary conditions for Deadlock?',
    option_a: 'Mutual Exclusion',
    option_b: 'Hold and Wait',
    option_c: 'Preemption Allowed',
    option_d: 'Circular Wait',
    correct_option: 'C',
    explanation: 'Deadlock requires "No Preemption". If preemption is allowed, deadlock cannot occur.'
  },
  {
    id: 'cs2',
    category: 'Core CS',
    topic: 'DBMS & SQL',
    question: 'Which SQL command removes a table along with its schema definition permanently?',
    option_a: 'DELETE',
    option_b: 'TRUNCATE',
    option_c: 'DROP',
    option_d: 'REMOVE',
    correct_option: 'C',
    explanation: '`DROP TABLE` deletes both data and schema definition permanently.'
  }
];

// Use Gemini to generate 2 project-specific questions based on resume projects
async function generateProjectQuestions(projects) {
  if (!projects || projects.length === 0) return [];

  const projectSummary = projects
    .slice(0, 3)
    .map((p, i) => `Project ${i + 1}: "${p.name}" using ${(p.tech || []).join(', ')} — ${p.description || ''}`)
    .join('\n');

  if (process.env.GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-3.6-flash',
        systemInstruction: `You are a technical placement interviewer. Based on the candidate's resume projects, generate exactly 2 multiple-choice questions (MCQ) that test the candidate's conceptual knowledge of the technologies used in their projects. 
Return ONLY a strict JSON array with exactly 2 questions, each following this schema:
[
  {
    "id": "proj1",
    "category": "Project-Based",
    "topic": "<project name> — <concept tested>",
    "question": "<MCQ question text>",
    "option_a": "<option A>",
    "option_b": "<option B>",
    "option_c": "<option C>",
    "option_d": "<option D>",
    "correct_option": "<A or B or C or D>",
    "explanation": "<brief explanation>"
  },
  {
    "id": "proj2",
    ...
  }
]`
      });

      const result = await model.generateContent(
        `Candidate's Resume Projects:\n${projectSummary}\n\nGenerate 2 conceptual MCQ questions about the core technologies used in these projects.`
      );
      const raw = result.response.text().replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.slice(0, 2).map((q, i) => ({ ...q, id: `proj${i + 1}` }));
      }
    } catch (aiErr) {
      console.warn('Project question generation notice:', aiErr.message);
    }
  }

  // Fallback: generate questions from first project's tech
  const fallback = [];
  if (projects[0]) {
    const p = projects[0];
    const tech = (p.tech || ['React'])[0] || 'React';
    fallback.push({
      id: 'proj1',
      category: 'Project-Based',
      topic: `${p.name} — ${tech} Concept`,
      question: `In your project "${p.name}", which lifecycle method in React is commonly used to fetch API data when the component mounts?`,
      option_a: 'componentDidUpdate',
      option_b: 'useEffect with empty dependency array',
      option_c: 'componentWillMount',
      option_d: 'render()',
      correct_option: 'B',
      explanation: 'useEffect(() => { fetchData(); }, []) runs once after the first render, equivalent to componentDidMount — perfect for API calls on mount.'
    });
  }
  if (projects[1] || projects[0]) {
    const p = projects[1] || projects[0];
    fallback.push({
      id: 'proj2',
      category: 'Project-Based',
      topic: `${p.name} — Database Concept`,
      question: `For the "${p.name}" project, if you need to store user sessions and fast-lookup data, which database approach is most suitable?`,
      option_a: 'MySQL with complex JOINs',
      option_b: 'MongoDB for flexible document storage',
      option_c: 'Redis for in-memory key-value cache',
      option_d: 'SQLite for file-based storage',
      correct_option: 'C',
      explanation: 'Redis is ideal for fast session storage and caching because it operates in-memory, providing O(1) read/write speed.'
    });
  }
  return fallback;
}

// GET /api/readiness/questions
async function getReadinessQuestions(req, res, next) {
  try {
    // Fetch user's latest resume to extract projects
    const [resumeRows] = await pool.query(
      'SELECT ai_feedback FROM resumes WHERE user_id = ? ORDER BY uploaded_at DESC LIMIT 1',
      [req.user.id]
    );

    let projectQuestions = [];
    if (resumeRows.length > 0 && resumeRows[0].ai_feedback) {
      try {
        const feedbackData = typeof resumeRows[0].ai_feedback === 'string'
          ? JSON.parse(resumeRows[0].ai_feedback)
          : resumeRows[0].ai_feedback;

        const projects = feedbackData.extractedProjects || [];
        if (projects.length > 0) {
          projectQuestions = await generateProjectQuestions(projects);
        }
      } catch (parseErr) {
        console.warn('Resume feedback parse error:', parseErr.message);
      }
    }

    // Combine static questions + personalized project questions
    const allQuestions = [...QUESTION_BANK, ...projectQuestions];
    const sanitized = allQuestions.map(({ correct_option, explanation, ...q }) => q);

    res.json({
      questions: sanitized,
      total: sanitized.length,
      hasProjectQuestions: projectQuestions.length > 0,
      projectQuestionsCount: projectQuestions.length
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/readiness/submit
async function submitReadinessTest(req, res, next) {
  try {
    const { answers } = req.body;
    if (!answers || typeof answers !== 'object') {
      return res.status(400).json({ message: 'Answers object is required' });
    }

    // Re-fetch project questions to get correct options for scoring
    const [resumeRows] = await pool.query(
      'SELECT ai_feedback FROM resumes WHERE user_id = ? ORDER BY uploaded_at DESC LIMIT 1',
      [req.user.id]
    );

    let projectQuestions = [];
    if (resumeRows.length > 0 && resumeRows[0].ai_feedback) {
      try {
        const feedbackData = typeof resumeRows[0].ai_feedback === 'string'
          ? JSON.parse(resumeRows[0].ai_feedback)
          : resumeRows[0].ai_feedback;
        const projects = feedbackData.extractedProjects || [];
        if (projects.length > 0) {
          projectQuestions = await generateProjectQuestions(projects);
        }
      } catch (e) {}
    }

    const ALL_QUESTIONS = [...QUESTION_BANK, ...projectQuestions];
    const totalCount = ALL_QUESTIONS.length;

    let correctCount = 0;
    const categoryStats = {
      Coding: { correct: 0, total: 0 },
      DSA: { correct: 0, total: 0 },
      Aptitude: { correct: 0, total: 0 },
      'Core CS': { correct: 0, total: 0 },
      'Project-Based': { correct: 0, total: 0 }
    };
    const weakTopics = [];
    const questionResults = [];

    ALL_QUESTIONS.forEach((q) => {
      const cat = q.category || 'General';
      if (!categoryStats[cat]) categoryStats[cat] = { correct: 0, total: 0 };
      categoryStats[cat].total += 1;

      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.correct_option;

      if (isCorrect) {
        correctCount += 1;
        categoryStats[cat].correct += 1;
      } else {
        if (!weakTopics.includes(q.topic)) weakTopics.push(`${cat}: ${q.topic}`);
      }

      questionResults.push({
        id: q.id,
        category: q.category,
        topic: q.topic,
        question: q.question,
        userAnswer: userAnswer || 'Not Attempted',
        correctOption: q.correct_option,
        isCorrect,
        explanation: q.explanation
      });
    });

    const percentage = Math.round((correctCount / totalCount) * 100);
    const isReady = percentage >= 70;
    const status = isReady ? 'READY' : 'PREPARE';
    const headline = isReady ? 'You are ready for the placement! 🚀🎉' : 'Prepare yourself ⚠️💪';

    const improvements = [];
    if (categoryStats['Coding'].correct < categoryStats['Coding'].total) {
      improvements.push({
        area: 'Coding & Language Fundamentals',
        recommendation: 'Review language edge cases, keywords (final/static/type casting), and basic syntax output predictions.'
      });
    }
    if (categoryStats['DSA'].correct < categoryStats['DSA'].total) {
      improvements.push({
        area: 'Data Structures & Algorithms',
        recommendation: 'Master Time Complexity bounds (Big-O analysis) and Graph exploration techniques (DFS/BFS).'
      });
    }
    if (categoryStats['Aptitude'].correct < categoryStats['Aptitude'].total) {
      improvements.push({
        area: 'Aptitude & Reasoning',
        recommendation: 'Practice speed calculations for Time & Distance and practice alphanumeric coding patterns.'
      });
    }
    if (categoryStats['Core CS'].correct < categoryStats['Core CS'].total) {
      improvements.push({
        area: 'Core Computer Science',
        recommendation: 'Brush up OS deadlock conditions & paging, and SQL DDL vs DML commands (DROP vs TRUNCATE vs DELETE).'
      });
    }
    if ((categoryStats['Project-Based']?.correct || 0) < (categoryStats['Project-Based']?.total || 0)) {
      improvements.push({
        area: 'Project-Based Technology Concepts',
        recommendation: 'Revise the core technologies you have used in your projects — lifecycle methods, state management, database operations, and API design patterns.'
      });
    }

    const dsaScore = Math.round((categoryStats['DSA'].correct / (categoryStats['DSA'].total || 1)) * 100);
    const aptScore = Math.round((categoryStats['Aptitude'].correct / (categoryStats['Aptitude'].total || 1)) * 100);
    const csScore = Math.round((categoryStats['Core CS'].correct / (categoryStats['Core CS'].total || 1)) * 100);

    await pool.query(
      'INSERT INTO readiness_tests (user_id, score, total, percentage, status, category_breakdown, weak_topics) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.id, correctCount, totalCount, percentage, status, JSON.stringify(categoryStats), JSON.stringify(weakTopics)]
    );

    await pool.query(
      'UPDATE student_progress SET dsa_score = ?, aptitude_score = ?, core_cs_score = ?, readiness_score = ? WHERE user_id = ?',
      [dsaScore, aptScore, csScore, percentage, req.user.id]
    );

    res.json({
      score: correctCount,
      total: totalCount,
      percentage,
      status,
      headline,
      categoryStats,
      weakTopics,
      improvements,
      questionResults
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { getReadinessQuestions, submitReadinessTest };
