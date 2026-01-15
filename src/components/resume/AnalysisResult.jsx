'use client'
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, TrendingUp, TrendingDown, Award, FileText, Sparkles } from 'lucide-react';
import SendEmail from './SendEmail';

const AnalysisResult = ({ data }) => {
  const [displayScore, setDisplayScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!data) return;
    
    // Simulate loading
    setIsLoading(true);
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      
      // Animate score count up
      const duration = 2000;
      const steps = 60;
      const increment = data.overallScore / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setDisplayScore(data.overallScore);
          clearInterval(timer);
        } else {
          setDisplayScore(Math.min(increment * currentStep, data.overallScore));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, [data]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center">
          <FileText className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-400">No analysis data available</p>
        </div>
      </div>
    );
  }

  const result = data;

  const getScoreColor = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-600';
  };

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Resume Analysis</h1>
          <p className="text-zinc-400">Comprehensive breakdown of your resume performance</p>
        </div>

        {/* Overall Score - Hero Card */}
        <Card className={`bg-linear-to-br ${getScoreColor(result.overallScore)} border-0 shadow-2xl overflow-hidden relative`}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <CardContent className="p-10 md:p-16 text-center relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
              <Award className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm md:text-base text-white/90 font-medium uppercase tracking-wider mb-4">
              Overall Resume Score
            </p>
            
            {isLoading ? (
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <p className="text-lg text-white/70">Analyzing your resume...</p>
                <div className="w-full max-w-md mx-auto bg-white/20 rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-6xl md:text-7xl font-bold text-white mb-3">
                  {displayScore.toFixed(0)}
                </h2>
                <p className="text-xl md:text-2xl text-white/70 mb-8">out of 100</p>
                <div className="w-full max-w-md mx-auto bg-white/20 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${displayScore}%` }}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Score Breakdown - Only show if data exists */}
        {result.scoreBreakdown && (result.scoreBreakdown.ats || result.scoreBreakdown.skills || result.scoreBreakdown.content) && (
          <Card className="bg-zinc-900 border border-zinc-800 shadow-xl">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-linear-to-b from-purple-500 to-blue-500 rounded-full"></div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Score Breakdown</h3>
              </div>
              <div className="space-y-4">
                {Object.entries(result.scoreBreakdown).filter(([_, value]) => value !== null).map(([key, value]) => (
                  <div key={key} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm md:text-base font-medium text-zinc-300 capitalize">
                        {key}
                      </span>
                      <span className="text-lg md:text-xl font-bold text-white">{value}</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full bg-linear-to-r ${getScoreColor(value)} rounded-full transition-all duration-500`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* ATS Analysis */}
        {result.ats?.issues && result.ats.issues.length > 0 && (
          <Card className="bg-zinc-900 border border-zinc-800 shadow-xl">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-500/20">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">ATS Analysis</h3>
                  {result.ats.status && (
                    <p className="text-sm text-zinc-400 capitalize">{result.ats.status}</p>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                {result.ats.issues.map((issue, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:border-orange-500/50 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>
                    <p className="text-sm md:text-base text-zinc-300">{issue}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Matched Skills */}
        {result.skills?.matched && result.skills.matched.length > 0 && (
          <Card className="bg-zinc-900 border border-zinc-800 shadow-xl">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/20">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Matched Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {result.skills.matched.map((skill, index) => (
                  <Badge
                    key={skill}
                    className="bg-linear-to-r from-purple-600 to-blue-500 text-white border-0 px-4 py-2 text-sm md:text-base font-medium hover:shadow-lg hover:scale-105 transition-all"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Missing Skills */}
        {result.skills?.missing && result.skills.missing.length > 0 && (
          <Card className="bg-zinc-900 border border-zinc-800 shadow-xl">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/20">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Missing Skills</h3>
              </div>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {result.skills.missing.map((skill, index) => (
                  <Badge
                    key={skill}
                    className="bg-red-500/20 text-red-300 border border-red-500/50 px-4 py-2 text-sm md:text-base font-medium"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Job Match */}
        {result.jobMatch?.matchPercentage && (
          <Card className="bg-zinc-900 border border-zinc-800 shadow-xl">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/20">
                  <Sparkles className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Job Match</h3>
                  <p className="text-sm text-zinc-400">{result.jobMatch.matchPercentage}% Match</p>
                </div>
              </div>
              
              {result.jobMatch.matchedKeywords && result.jobMatch.matchedKeywords.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-medium text-zinc-400 mb-3">Matched Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {result.jobMatch.matchedKeywords.map((keyword, i) => (
                      <Badge key={i} className="bg-green-500/20 text-green-300 border border-green-500/50">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {result.jobMatch.missingKeywords && result.jobMatch.missingKeywords.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-zinc-400 mb-3">Missing Keywords</p>
                  <div className="flex flex-wrap gap-2">
                    {result.jobMatch.missingKeywords.map((keyword, i) => (
                      <Badge key={i} className="bg-red-500/20 text-red-300 border border-red-500/50">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Grammar & Formatting */}
        {result.grammarAndFormatting?.issues && result.grammarAndFormatting.issues.length > 0 && (
          <Card className="bg-zinc-900 border border-zinc-800 shadow-xl">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-500/20">
                  <FileText className="w-5 h-5 text-yellow-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Grammar & Formatting</h3>
              </div>
              <div className="space-y-3">
                {result.grammarAndFormatting.issues.map((issue, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:border-yellow-500/50 transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 shrink-0"></div>
                    <p className="text-sm md:text-base text-zinc-300">{issue}</p>
                  </div>
                ))}
              </div>

              {result.grammarAndFormatting.suggestions && result.grammarAndFormatting.suggestions.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-medium text-zinc-400 mb-3">Suggestions</p>
                  <div className="space-y-2">
                    {result.grammarAndFormatting.suggestions.map((suggestion, i) => (
                      <div key={i} className="flex gap-3 p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                        <CheckCircle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                        <p className="text-sm md:text-base text-zinc-300">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Strengths & Weaknesses Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Strengths */}
          {result.strengths && result.strengths.length > 0 && (
            <Card className="bg-zinc-900 border border-zinc-800 shadow-xl">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/20">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Strengths</h3>
                </div>
                <div className="space-y-3">
                  {result.strengths.map((item, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-green-500/5 rounded-lg border border-green-500/20">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <p className="text-sm md:text-base text-zinc-300">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Weaknesses */}
          {result.weaknesses && result.weaknesses.length > 0 && (
            <Card className="bg-zinc-900 border border-zinc-800 shadow-xl">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-500/20">
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">Weaknesses</h3>
                </div>
                <div className="space-y-3">
                  {result.weaknesses.map((item, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-red-500/5 rounded-lg border border-red-500/20">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <p className="text-sm md:text-base text-zinc-300">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Suggestions */}
        {result.suggestions && (result.suggestions.highImpact || result.suggestions.mediumImpact || result.suggestions.lowImpact) && (
          <Card className="bg-linear-to-br from-zinc-900 to-zinc-800 border border-zinc-700 shadow-xl">
            <CardContent className="p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-linear-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Improvement Suggestions</h3>
              </div>
              <div className="space-y-6">
                {Object.entries(result.suggestions)
                  .filter(([_, items]) => items && items.length > 0)
                  .map(([level, items]) => (
                    <div key={level} className="space-y-3 mt-6">
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={`${
                            level.toLowerCase().includes('high') 
                              ? 'bg-red-500/20 text-red-300 border-red-500/50' 
                              : level.toLowerCase().includes('medium')
                              ? 'bg-yellow-500/20 mt-4 text-yellow-300 border-yellow-500/50'
                              : 'bg-blue-500/20 mt-4 text-blue-300 border-blue-500/50'
                          } border`}
                        >
                          {level.replace("Impact", " Impact")}
                        </Badge>
                      </div>
                      <div className="space-y-2 pl-4">
                        {items.map((item, i) => (
                          <div key={i} className="flex gap-3 p-3 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                            <p className="text-sm md:text-base text-zinc-300">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
        <SendEmail report={data} />
      </div>
    </div>
  );
};

export default AnalysisResult