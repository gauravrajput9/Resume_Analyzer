import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Resume from "../../../../../models/resume.model";
import { callAI } from "@/lib/ai";
import { connectDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { generateResumeHash } from "@/lib/GenerateHash";

export async function POST(req) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { text, options, jobDescription, reAnalyze  } = await req.json();

    if (!text) {
      return NextResponse.json(
        { error: "No resume text provided" },
        { status: 400 }
      );
    }

    /* ---------------- HASH GENERATION ---------------- */
    const resumeHash = generateResumeHash(text);

    /* ---------------- DUPLICATE CHECK ---------------- */
    const existingResume = await Resume.findOne({
      userId: session.user.id,
      resumeHash,
    });

    //same hash found, and user do not want to analyze the resume, then return the id of the existing one
    if (existingResume && reAnalyze===false) {
      return NextResponse.json({
        reused: true,
        result: existingResume.result,
        resultId: existingResume._id.toString(),
      });
    }

    /* ---------------- AI ANALYSIS ---------------- */
    const truncatedText =
      text.length > 8000 ? text.substring(0, 8000) + "... (truncated)" : text;

    const prompt = `
      You are an enterprise-grade ATS resume analysis engine used in hiring platforms.

      Your task is to analyze the resume STRICTLY based on:
      - User-selected analysis options
      - The provided resume text
      - The job description (ONLY if provided)

      You must produce:
      - Deterministic
      - Resume-anchored
      - Evidence-based
      - UI-safe results

      Return STRICT JSON ONLY. 
      Do NOT include explanations, markdown, or extra text.

      ----------------------------------
      USER SELECTED ANALYSIS OPTIONS
      ----------------------------------
      ATS Score: ${options.atsScore}
      Skill Gap Analysis: ${options.skillGapAnalysis}
      Grammar & Formatting: ${options.grammarAndFormatting}
      Job Description Match: ${options.jobDescriptionMatch}

      ----------------------------------
      MANDATORY OUTPUT STRUCTURE
      ----------------------------------
      {
        "overallScore": number (0–100),

        "scoreBreakdown": {
          "ats": number | null,
          "skills": number | null,
          "content": number | null
        },

        "ats": {
          "status": "Excellent" | "Good" | "Average" | "Poor" | null,
          "issues": string[] | null
        },

        "skills": {
          "matched": string[] | null,
          "missing": string[] | null
        },

        "jobMatch": {
          "matchPercentage": number | null,
          "matchedKeywords": string[] | null,
          "missingKeywords": string[] | null
        },

        "grammarAndFormatting": {
          "issues": string[] | null,
          "suggestions": string[] | null
        },

        "strengths": string[],
        "weaknesses": string[],

        "suggestions": {
          "highImpact": string[],
          "mediumImpact": string[],
          "lowImpact": string[]
        }
      }

      ----------------------------------
      CRITICAL RULES (MUST FOLLOW)
      ----------------------------------
      1. If an analysis option is FALSE:
        - Set ALL related fields to null
        - Do NOT infer, estimate, or fabricate data

      2. Resume Anchoring (MANDATORY):
        - Every issue, missing skill, and suggestion MUST reference
          a specific section, wording issue, or explicit absence
        - Generic advice is NOT allowed

      3. No Empty Arrays:
        - If no items exist, return null (never [])

      4. Skills Analysis:
        - "matched" = exact keywords explicitly present in resume
        - "missing" = ATS-relevant keywords NOT present
        - Use concrete tools/technologies only (React, MySQL, REST APIs)
        - Do NOT use abstract phrases (e.g., "experience with databases")

      5. ATS Analysis:
        - Focus on section structure, headings, bullet clarity,
          keyword density, and action verbs
        - Each issue must be resume-specific

      6. Grammar & Formatting:
        - Identify concrete problems (tense mismatch, symbols, bullets)
        - Each suggestion must map directly to a listed issue
        - Do NOT duplicate ATS issues here

      7. Job Description Match:
        - If Job Description Match is FALSE → jobMatch = null
        - If TRUE but no job description provided → jobMatch = null
        - If TRUE and job description provided:
            • Extract matched and missing keywords
            • Calculate realistic matchPercentage
            • If matchPercentage = 0 → missingKeywords MUST NOT be null

      8. Scoring (STRICT):
        - scoreBreakdown values are RAW scores (0–100)
        - overallScore is a weighted average of ENABLED sections ONLY
        - Weights:
            • ATS: 35%
            • Skills: 40%
            • Content: 25%
        - Disabled sections are excluded from calculation

      9. Strengths vs Weaknesses:
        - Strengths = high-level positives
        - Weaknesses = summarized themes
        - Do NOT duplicate ATS or grammar issues verbatim

      ----------------------------------
      SUGGESTION PRIORITY RULES
      ----------------------------------
      High Impact:
      - Missing keywords
      - Missing critical sections
      - Direct ATS improvements

      Medium Impact:
      - Skill reinforcement via projects
      - Content clarity improvements

      Low Impact:
      - Minor formatting or polish

      ----------------------------------
      IMPORTANT CONSTRAINTS
      ----------------------------------
      - Base analysis ONLY on resume text
      - Do NOT hallucinate experience or skills
      - No duplicated points across sections
      - Concise, UI-friendly language
      - Output MUST be valid JSON
      - Do NOT wrap output in code blocks

      ----------------------------------
      JOB DESCRIPTION
      ----------------------------------
      ${jobDescription || "Not provided"}

      ----------------------------------
      RESUME TEXT
      ----------------------------------
      ${truncatedText}
      `;


    const rawResult = await callAI(prompt);

    let parsedResult;
    try {
      parsedResult = JSON.parse(rawResult);
    } catch {
      return NextResponse.json(
        { error: "Invalid AI JSON output" },
        { status: 500 }
      );
    }

    /* ---------------- SAVE RESULT ---------------- */
    const doc = await Resume.create({
      userId: new mongoose.Types.ObjectId(session.user.id),
      resumeHash,
      result: parsedResult,
      options,
      jobDescription,
      analyzedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      reused: false,
      result: parsedResult,
      resultId: doc._id.toString(),
    });

  } catch (error) {
    console.error("Error in analyze route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze resume" },
      { status: 500 }
    );
  }
}






