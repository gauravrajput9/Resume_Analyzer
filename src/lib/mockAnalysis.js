export const mockResumeAnalysis = {
  score: 78,
  ats: {
    status: "Good",
    issues: [
      "Missing keywords related to React and Redux",
      "Experience section lacks quantified achievements",
    ],
  },
  skills: {
    matched: ["JavaScript", "React", "HTML", "CSS"],
    missing: ["Redux", "TypeScript", "Testing"],
  },
  suggestions: [
    "Add a dedicated Skills section with relevant technologies",
    "Mention measurable results in work experience",
    "Use more action verbs like 'Developed', 'Optimized', 'Led'",
  ],
};
