"use client";
import BackButton from "@/components/BackButton";
import ChemAILogo from "@/components/ChemAILogo";
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function TestGeneratorPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [examType, setExamType] = useState("JEE Main");
  const [testStarted, setTestStarted] = useState(false);
  const [testData, setTestData] = useState<any>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes timer for mock

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let timer: any;
    if (testStarted && !submitted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && testStarted && !submitted) {
      handleSubmitTest();
    }
    return () => clearInterval(timer);
  }, [testStarted, submitted, timeLeft]);

  const handleStartTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTestData(null);
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setSubmitted(false);
    setTimeLeft(600);

    try {
      const prompt = `Generate a 4-question chemistry mock test tailored for "${examType}". Return ONLY valid JSON format in this exact structure without markdown ticks:
      {
        "testTitle": "${examType} Chemistry Mock",
        "questions": [
          {
            "id": 1,
            "question": "Sample question text here?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": "Option A",
            "explanation": "Detailed explanation..."
          }
        ]
      }`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });

      if (!response.ok) throw new Error("Failed to generate test");

      const data = await response.json();
      let rawContent = data.content || data.text || "";
      rawContent = rawContent.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(rawContent);
      setTestData(parsed);
      setTestStarted(true);
    } catch (error) {
      console.error(error);
      setTestData({
        testTitle: `${examType} Chemistry Mock`,
        questions: [
          {
            id: 1,
            question: "Which of the following elements has the highest electronegativity?",
            options: ["Fluorine", "Chlorine", "Oxygen", "Nitrogen"],
            answer: "Fluorine",
            explanation: "Fluorine is the most electronegative element on the periodic table."
          }
        ]
      });
      setTestStarted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (questionId: number, option: string) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmitTest = () => {
    if (!testData) return;
    let currentScore = 0;
    testData.questions.forEach((q: any) => {
      if (selectedAnswers[q.id] === q.answer) {
        currentScore += 4; // Standard +4 marking scheme
      }
    });
    setScore(currentScore);
    setSubmitted(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!isMounted) {
    return (
      <div className="flex h-screen bg-slate-950 text-slate-400 items-center justify-center">
        Loading Test Generator...
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', icon: '📊', href: '/dashboard' },
    { name: 'AI Tutor', icon: '🤖', href: '/dashboard/ai-tutor' },
    { name: 'Practice', icon: '✍️', href: '/dashboard/practice' },
    { name: 'Test Generator', icon: '🎯', href: '/dashboard/test-generator', active: true },
    { name: 'NCERT Solver', icon: '📘', href: '/dashboard/ncert-solver' },
    { name: 'Previous Papers', icon: '📄', href: '/dashboard/previous-papers' },
  ];

  const userSpaceLinks = [
    { name: 'Notes', icon: '📓', href: '/dashboard/notes' },
    { name: 'Bookmarks', icon: '🔖', href: '/dashboard/bookmarks' },
    { name: 'Progress', icon: '📈', href: '/dashboard/progress' },
    { name: 'Settings', icon: '⚙️', href: '/dashboard/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 flex-shrink-0 border-r border-slate-800 bg-slate-900 flex flex-col transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <Link href="/" className="transition-opacity hover:opacity-80">
            <ChemAILogo />
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">✕</button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">Menu</div>
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${item.active ? 'bg-indigo-500/10 text-indigo-400 font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}

          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-2 px-3">Your Space</div>
          {userSpaceLinks.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0B0F19]">
        
        <header className="h-16 flex-shrink-0 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <BackButton/>
            <button 
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50 border border-slate-700/50"
            >
              ☰
            </button>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              🎯 Full-Length Mock Test Generator
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {testStarted && !submitted && (
              <div className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-mono font-bold">
                ⏳ {formatTime(timeLeft)}
              </div>
            )}
            <div className="h-8 w-8 flex items-center justify-center">
              <ClerkLoading><div className="h-8 w-8 rounded-full bg-slate-700 animate-pulse" /></ClerkLoading>
              <ClerkLoaded><UserButton afterSignOutUrl="/" /></ClerkLoaded>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-4xl w-full mx-auto space-y-6">
          
          {!testStarted ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-2">Configure Mock Exam</h2>
              <p className="text-slate-400 text-sm mb-6">Select your target exam pattern to generate a timed, full-length test environment.</p>

              <form onSubmit={handleStartTest} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Exam Target</label>
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl px-4 py-3 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="JEE Main">JEE Main Chemistry</option>
                    <option value="JEE Advanced">JEE Advanced Chemistry</option>
                    <option value="NEET UG">NEET UG Chemistry</option>
                    <option value="CBSE Class 12 Board">CBSE Class 12 Board Exam</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-xl text-sm transition-colors shadow-lg disabled:opacity-50"
                >
                  {isLoading ? "Generating Exam Paper..." : "Start Timed Mock Test 🚀"}
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-semibold text-white">{testData.testTitle}</h3>
                {submitted && (
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium">
                    Total Score: {score} Marks
                  </span>
                )}
              </div>

              {!submitted ? (
                <div className="space-y-6">
                  {/* QUESTION NAVIGATOR PILLS */}
                  <div className="flex flex-wrap gap-2">
                    {testData.questions.map((q: any, idx: number) => (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIdx(idx)}
                        className={`h-9 w-9 rounded-lg text-xs font-medium border transition-all ${currentQuestionIdx === idx ? 'bg-indigo-600 border-indigo-500 text-white' : selectedAnswers[q.id] ? 'bg-indigo-950 border-indigo-800 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>

                  {/* ACTIVE QUESTION BOX */}
                  {testData.questions[currentQuestionIdx] && (
                    <div className="space-y-4 bg-slate-950 p-6 rounded-xl border border-slate-800">
                      <p className="text-sm font-semibold text-white">
                        Question {currentQuestionIdx + 1} of {testData.questions.length}: {testData.questions[currentQuestionIdx].question}
                      </p>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {testData.questions[currentQuestionIdx].options.map((opt: string) => {
                          const qId = testData.questions[currentQuestionIdx].id;
                          const isSelected = selectedAnswers[qId] === opt;
                          return (
                            <button
                              key={opt}
                              onClick={() => handleOptionSelect(qId, opt)}
                              className={`p-3.5 rounded-xl border text-xs text-left transition-all ${isSelected ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-medium' : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                      disabled={currentQuestionIdx === 0}
                      className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs disabled:opacity-40"
                    >
                      Previous
                    </button>

                    {currentQuestionIdx < testData.questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIdx((prev) => Math.min(testData.questions.length - 1, prev + 1))}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs"
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitTest}
                        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-medium shadow-lg"
                      >
                        Submit Test Now
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-4">
                    {testData.questions.map((q: any, idx: number) => (
                      <div key={q.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                        <p className="text-xs font-semibold text-white">Q{idx + 1}. {q.question}</p>
                        <p className="text-xs text-slate-400">Your Answer: <span className={selectedAnswers[q.id] === q.answer ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>{selectedAnswers[q.id] || 'Not Answered'}</span></p>
                        <p className="text-xs text-slate-400">Correct Answer: <span className="text-indigo-400 font-semibold">{q.answer}</span></p>
                        <div className="text-xs text-slate-400 bg-slate-900 p-3 rounded-lg border border-slate-800">
                          <strong className="text-indigo-400">Explanation:</strong> {q.explanation}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setTestStarted(false)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl text-sm transition-colors border border-slate-700"
                  >
                    Take Another Mock Test 🔄
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}