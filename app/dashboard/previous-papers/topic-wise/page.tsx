"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ChemistryRenderer from "@/components/chat/ChemistryRenderer";

interface Topic {
  id: string;
  name: string;
  category: string;
  description?: string;
  _count?: { questions: number };
}

interface Question {
  id: string;
  examName: string;
  year: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: string;
}

export default function TopicWisePapersPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/tests/topic-wise")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTopics(data.data);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to load topics:", err));
  }, []);

  const handleSelectTopic = async (topic: Topic) => {
    setSelectedTopic(topic);
    setLoading(true);
    try {
      const res = await fetch(`/api/tests/topic-wise?topicId=${topic.id}`);
      const data = await res.json();
      if (data.success) setQuestions(data.data);
    } catch (err) {
      console.error("Failed to load questions:", err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 text-slate-100 font-sans min-h-screen bg-slate-950">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <Link href="/dashboard/previous-papers" className="text-sm text-blue-400 hover:underline mb-2 inline-block">
            &larr; Back to Previous Papers
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
            <span>📄</span> Topic-Wise Previous Years' Papers
          </h1>
          <p className="text-sm text-slate-400">Practice curated chemistry questions categorized by core syllabus topics.</p>
        </div>
      </div>

      {!selectedTopic ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.id}
              onClick={() => handleSelectTopic(topic)}
              className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl hover:border-blue-500/50 cursor-pointer transition shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {topic.category}
                </span>
                <h3 className="text-lg font-semibold text-white mt-3 mb-1">{topic.name}</h3>
                <p className="text-xs text-slate-400">{topic.description || "Practice standard questions from past examinations."}</p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-4">
                <span>{topic._count?.questions || 0} Questions</span>
                <span className="text-blue-400 font-medium">Start Practice &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900/40 border border-slate-800 p-4 rounded-xl">
            <div>
              <h2 className="text-xl font-bold text-white">{selectedTopic.name}</h2>
              <p className="text-xs text-slate-400">Category: {selectedTopic.category}</p>
            </div>
            <button
              onClick={() => setSelectedTopic(null)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-medium rounded-lg transition text-white"
            >
              Change Topic
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-400">Loading questions...</div>
          ) : questions.length === 0 ? (
            <div className="text-center py-12 text-slate-400 border border-dashed border-slate-800 rounded-xl">
              No questions found for this topic yet.
            </div>
          ) : (
            questions.map((q, idx) => (
              <div key={q.id} className="bg-slate-900/40 border border-slate-800 p-6 rounded-xl space-y-4 shadow-md">
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-purple-500/10 text-purple-400 px-2.5 py-1 rounded-md border border-purple-500/20 font-medium">
                    {q.examName} ({q.year})
                  </span>
                  <span className="capitalize text-amber-400 font-semibold">{q.difficulty}</span>
                </div>

                <div className="text-sm md:text-base font-medium text-slate-100 leading-relaxed">
                  <span className="text-blue-400 font-semibold mr-2">Q{idx + 1}.</span>
                  <ChemistryRenderer content={q.question} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[q.id] === opt;
                    const isCorrect = opt === q.correctAnswer;
                    const answered = selectedAnswers[q.id] !== undefined;

                    let btnStyle = "bg-slate-800/40 border-slate-700/80 text-slate-200 hover:bg-slate-800";
                    if (answered) {
                      if (isCorrect) btnStyle = "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-semibold";
                      else if (isSelected) btnStyle = "bg-rose-500/20 border-rose-500/50 text-rose-300 font-semibold";
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={answered}
                        onClick={() => setSelectedAnswers({ ...selectedAnswers, [q.id]: opt })}
                        className={`p-3.5 text-left text-xs md:text-sm rounded-xl border transition flex items-center justify-between ${btnStyle}`}
                      >
                        <ChemistryRenderer content={opt} />
                        {answered && isCorrect && <span className="text-emerald-400 text-xs ml-2">✓ Correct</span>}
                        {answered && isSelected && !isCorrect && <span className="text-rose-400 text-xs ml-2">✗ Your Answer</span>}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswers[q.id] && (
                  <div className="pt-3 border-t border-slate-800/60 mt-4">
                    <button
                      onClick={() => setShowExplanation({ ...showExplanation, [q.id]: !showExplanation[q.id] })}
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1.5 transition"
                    >
                      <span>{showExplanation[q.id] ? "▾ Hide AI Explanation" : "▸ Show AI Step-by-Step Explanation"}</span>
                    </button>
                    {showExplanation[q.id] && (
                      <div className="mt-3 p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-xs md:text-sm text-slate-300 leading-relaxed">
                        <strong className="text-emerald-400 block mb-2 text-xs uppercase tracking-wider font-semibold">Detailed Explanation:</strong>
                        <ChemistryRenderer content={q.explanation} />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}