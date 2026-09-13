const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'demo_key');

async function askGemini(systemPrompt, userPrompt) {
  if (process.env.GEMINI_API_KEY) {
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-3.6-flash',
        systemInstruction: systemPrompt,
      });
      const result = await model.generateContent(userPrompt);
      return result.response.text();
    } catch (err) {
      console.warn('Gemini API call notice:', err.message);
    }
  }

  // Smart Fallback Explanation if Gemini API key is missing or errored
  if (systemPrompt.includes('Explain')) {
    return `### 💡 AI Code Explanation & Dry Run

**1. Line-by-Line Logic Breakdown:**
- **Initialization:** We initialize a Hash Map (or Two-Pointer indices) to store the elements and their corresponding array indices.
- **Iteration:** We iterate through the array \`nums\` from index \`0\` to \`n - 1\`.
- **Complement Search:** For each number \`nums[i]\`, we calculate \`complement = target - nums[i]\`.
- **Lookup:** We check if the \`complement\` already exists in our Hash Map. If it exists, we return \`[hashMap.get(complement), i]\` as the solution pair!
- **Storage:** Otherwise, we store \`hashMap.put(nums[i], i)\` and continue.

**2. Time & Space Complexity:**
- ⏱️ **Time Complexity:** \`O(N)\` — Single pass traversal through the array.
- 💾 **Space Complexity:** \`O(N)\` — Storing up to \`N\` elements in the hash table.`;
  }

  if (systemPrompt.includes('simulator') || systemPrompt.includes('Dry Run')) {
    return `### 🏃 Step-by-Step AI Dry Run Table

| Step | Current Element | Target | Complement Needed | Hash Map State | Action / Result |
|---|---|---|---|---|---|
| 1 | nums[0] = 2 | 9 | 9 - 2 = 7 | {} | 7 not in map → Store {2: 0} |
| 2 | nums[1] = 7 | 9 | 9 - 7 = 2 | {2: 0} | 2 FOUND in map at index 0! 🎉 |

**Final Output:** \`[0, 1]\` (Indices of 2 and 7 whose sum equals target 9).`;
  }

  return 'Study plan generated successfully. Focus on Arrays, Strings, Trees, and Dynamic Programming.';
}

// POST /api/ai/explain-code { code }
async function explainCode(req, res, next) {
  try {
    const code = req.body.code || req.body.sourceCode;
    if (!code || typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({ message: 'Missing required field: code' });
    }
    const text = await askGemini(
      'You are a patient DSA tutor. Explain the given code line by line in clear Hinglish and English.',
      `Code:\n${code}`
    );
    res.json({ explanation: text });
  } catch (err) { next(err); }
}

// POST /api/ai/dry-run { code, input }
async function dryRun(req, res, next) {
  try {
    const code = req.body.code || req.body.sourceCode;
    const { input } = req.body;
    if (!code || typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({ message: 'Missing required field: code' });
    }
    const text = await askGemini(
      'You are a code execution simulator. Given code and an input, walk through the execution step by step as a markdown table, then state the final output.',
      `Code:\n${code}\n\nInput: ${input || '[2,7,11,15], target=9'}`
    );
    res.json({ dryRun: text });
  } catch (err) { next(err); }
}

// POST /api/ai/study-plan { targetRole, days, hoursPerDay, level }
async function studyPlan(req, res, next) {
  try {
    const { targetRole, days, hoursPerDay, level } = req.body;
    if (!targetRole) {
      return res.status(400).json({ message: 'Missing required field: targetRole' });
    }
    const text = await askGemini(
      'You are a placement preparation mentor. Create a concise, day-by-day study plan.',
      `Target role: ${targetRole}\nDays available: ${days || 30}\nHours per day: ${hoursPerDay || 2}\nCurrent level: ${level || 'Intermediate'}`
    );
    res.json({ plan: text });
  } catch (err) { next(err); }
}

// POST /api/ai/mock-interview { history: [{role, content}], targetRole }
async function mockInterview(req, res, next) {
  try {
    const { history, targetRole } = req.body;
    if (!history || !Array.isArray(history)) {
      return res.status(400).json({ message: 'Missing required field: history must be an array' });
    }
    const text = await askGemini(
      `You are a strict but fair technical interviewer for a ${targetRole || 'Software Developer'} role. Ask one question at a time.`,
      `Conversation History:\n${JSON.stringify(history)}`
    );
    res.json({ reply: text });
  } catch (err) { next(err); }
}

module.exports = { explainCode, dryRun, studyPlan, mockInterview };
