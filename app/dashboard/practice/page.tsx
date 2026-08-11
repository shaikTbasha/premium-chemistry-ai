"use client";
import BackButton from "@/components/BackButton";
import ChemAILogo from "@/components/ChemAILogo";
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PracticePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [topic, setTopic] = useState("Organic Chemistry");
  const [difficulty, setDifficulty] = useState("Medium");
  const [quizData, setQuizData] = useState<any>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleGenerateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setQuizData(null);
    setSelectedAnswers({});
    setSubmitted(false);

    try {
      const prompt = `Generate a 3-question multiple-choice chemistry quiz on the topic "${topic}" with difficulty level "${difficulty}". Return ONLY valid JSON format in this exact structure without markdown ticks:
      {
        "questions": [
          {
            "id": 1,
            "question": "Question text here?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "answer": "Option A",
            "explanation": "Why this is correct..."
          }
        ]
      }`;

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });

      if (!response.ok) throw new Error("Failed to generate quiz");

      const data = await response.json();
      let rawContent = data.content || data.text || "";
      
      // Clean up markdown code blocks if AI returns them
      rawContent = rawContent.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(rawContent);
      setQuizData(parsed);
    } catch (error) {
      console.error(error);
      // Fallback fallback quiz if JSON parsing fails
      setQuizData({
        questions: [
          {
            id: 1,
            question: "What is the primary product of the reaction between an alkene and bromine water?",
            options: ["Vicinal dibromide", "Alkyl halide", "Alcohol", "Carboxylic acid"],
            answer: "Vicinal dibromide",
            explanation: "Addition of bromine across the double bond yields a vicinal dibromide."
          }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (questionId: number, option: string) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleSubmitQuiz = () => {
    if (!quizData) return;
    let currentScore = 0;
    quizData.questions.forEach((q: any) => {
      if (selectedAnswers[q.id] === q.answer) {
        currentScore += 1;
      }
    });
    setScore(currentScore);
    setSubmitted(true);
  };

  if (!isMounted) {
    return (
      <div className="flex h-screen bg-slate-950 text-slate-400 items-center justify-center">
        Loading Practice Arena...
      </div>
    );
  }

  const navLinks = [
    { name: 'Dashboard', icon: '📊', href: '/dashboard' },
    { name: 'AI Tutor', icon: '🤖', href: '/dashboard/ai-tutor' },
    { name: 'Practice', icon: '✍️', href: '/dashboard/practice', active: true },
    { name: 'Test Generator', icon: '🎯', href: '/dashboard/test-generator' },
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
              ✍️ Practice Arena & Quiz Generator
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 flex items-center justify-center">
              <ClerkLoading><div className="h-8 w-8 rounded-full bg-slate-700 animate-pulse" /></ClerkLoading>
              <ClerkLoaded><UserButton afterSignOutUrl="/" /></ClerkLoaded>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-4xl w-full mx-auto space-y-6">
          
          {/* QUIZ CONFIGURATION CARD */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-2">Configure Practice Quiz</h2>
            <p className="text-slate-400 text-sm mb-6">Select your chemistry topic and difficulty to generate a personalized practice test.</p>

            <form onSubmit={handleGenerateQuiz} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Topic</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl px-4 py-3 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Organic Chemistry">Organic Chemistry</option>
                    <option value="Physical Chemistry">Physical Chemistry</option>
                    <option value="Inorganic Chemistry">Inorganic Chemistry</option>
                    <option value="Chemical Thermodynamics">Chemical Thermodynamics</option>
                    <option value="Electrochemistry">Electrochemistry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-slate-950 text-white rounded-xl px-4 py-3 text-sm border border-slate-800 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard / Advanced</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3.5 rounded-xl text-sm transition-colors shadow-lg disabled:opacity-50"
              >
                {isLoading ? "Generating Custom Quiz..." : "Generate Practice Quiz 🚀"}
              </button>
            </form>
          </div>

          {/* QUIZ DISPLAY AREA */}
          {quizData && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-semibold text-white">Quiz: {topic} ({difficulty})</h3>
                {submitted && (
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full text-xs font-medium">
                    Score: {score} / {quizData.questions.length}
                  </span>
                )}
              </div>

              <div className="space-y-6">
                {quizData.questions.map((q: any, idx: number) => (
                  <div key={q.id || idx} className="space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800/80">
                    <p className="text-sm font-semibold text-white">
                      Q{idx + 1}. {q.question}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {q.options.map((opt: string) => {
                        const isSelected = selectedAnswers[q.id] === opt;
                        const isCorrect = submitted && opt === q.answer;
                        const isWrong = submitted && isSelected && opt !== q.answer;

                        let btnStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800";
                        if (isSelected) btnStyle = "bg-indigo-600/20 border-indigo-500 text-indigo-300";
                        if (isCorrect) btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300";
                        if (isWrong) btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";

                        return (
                          <button
                            key={opt}
                            onClick={() => handleOptionSelect(q.id, opt)}
                            className={`p-3 rounded-lg border text-xs text-left transition-all ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {submitted && (
                      <div className="mt-2 text-xs text-slate-400 bg-slate-900 p-3 rounded-lg border border-slate-800">
                        <strong className="text-indigo-400">Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!submitted ? (
                <button
                  onClick={handleSubmitQuiz}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl text-sm transition-colors shadow-lg"
                >
                  Submit Answers & View Score
                </button>
              ) : (
                <button
                  onClick={handleGenerateQuiz}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl text-sm transition-colors border border-slate-700"
                >
                  Generate New Quiz 🔄
                </button>
              )}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}