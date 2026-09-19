'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Music, Mail, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractiveProposal() {
  // Stages: 'loader' -> 'envelope' -> 'notes' -> 'interactive' -> 'final'
  const [stage, setStage] = useState<'loader' | 'envelope' | 'notes' | 'interactive' | 'final'>('loader');
  const [progress, setProgress] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);
  const [rejectAttempts, setRejectAttempts] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [secondsTogether, setSecondsTogether] = useState(0);

  // Initial Loading Progress
  useEffect(() => {
    if (stage === 'loader') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStage('envelope'), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 40);
      return () => clearInterval(interval);
    }
  }, [stage]);

  // Together Counter & Confetti Effect
  useEffect(() => {
    if (stage === 'final') {
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      const interval = setInterval(() => {
        setSecondsTogether((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const notesList = [
    {
      title: "Hey Jaan...",
      body: "Pata hai... Main ye sab normally bol nahi pata... Lekin aaj dil ne kaha... Risk le le... Kyuki kuch log baar baar nahi milte."
    },
    {
      title: "Online Moments",
      body: "Jab bhi tum online aati ho... Mera mood automatically better ho jata hai."
    },
    {
      title: "Notifications",
      body: "Tumhare messages... Mere din ka favourite notification hote hain."
    },
    {
      title: "Honestly...",
      body: "Tum meri life ki sabse pyari coincidence ho."
    }
  ];

  const rejectTexts = [
    "SHAYAD NAHI 🥺",
    "Please Soch Lo ❤️",
    "Nahi Na 🥺",
    "Sure? 🥹",
    "Ek Baar Aur 😭",
    "Aisa Mat Karo 💔"
  ];

  const days = Math.floor(secondsTogether / (3600 * 24));
  const hours = Math.floor((secondsTogether % (3600 * 24)) / 3600);
  const minutes = Math.floor((secondsTogether % 3600) / 60);
  const seconds = secondsTogether % 60;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-pink-950/40 to-slate-950 text-white font-sans flex flex-col items-center justify-center p-4 relative overflow-hidden">

      {/* Music Toggle Button */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium hover:bg-white/20 transition-all shadow-lg"
        >
          <Music className={`w-4 h-4 text-pink-400 ${isPlaying ? 'animate-spin' : ''}`} />
          <span>{isPlaying ? 'Playing Music...' : 'Play Music'}</span>
        </button>
      </div>

      {/* STAGE 1: LOADER */}
      {stage === 'loader' && (
        <div className="z-10 max-w-sm w-full bg-slate-900/60 border border-white/10 p-8 rounded-3xl backdrop-blur-xl text-center space-y-6 shadow-2xl">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-semibold">Initializing Love.exe</span>
            <p className="text-sm text-zinc-400">Searching for the prettiest smile...</p>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-white/5">
            <div className="bg-gradient-to-r from-pink-500 to-rose-400 h-2.5 rounded-full transition-all duration-100" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="font-mono text-xs text-pink-300 font-bold">
            {progress}% {progress === 100 && '• Found 1 Result ❤️'}
          </div>
        </div>
      )}

      {/* STAGE 2: ENVELOPE */}
      {stage === 'envelope' && (
        <div className="z-10 max-w-sm w-full text-center space-y-6">
          <div className="bg-gradient-to-b from-pink-500/20 to-rose-500/10 border border-pink-500/30 p-10 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-pink-500/20 border border-pink-400/40 rounded-2xl flex items-center justify-center shadow-inner">
              <Mail className="w-10 h-10 text-pink-400 animate-bounce" />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight">A Letter Arrived 💌</h2>
              <p className="text-xs text-zinc-400 mt-1">Tap the envelope to open it</p>
            </div>
            <button
              onClick={() => setStage('notes')}
              className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg uppercase tracking-wider"
            >
              Open Letter →
            </button>
          </div>
        </div>
      )}

      {/* STAGE 3: NOTE CARDS */}
      {stage === 'notes' && (
        <div className="z-10 max-w-sm w-full bg-slate-900/70 border border-pink-500/30 p-8 rounded-3xl backdrop-blur-xl space-y-6 text-center shadow-2xl">
          <span className="text-[10px] font-mono text-pink-400 uppercase tracking-widest bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full">For You</span>
          <div className="space-y-3 min-h-[120px] flex flex-col justify-center">
            <h3 className="text-lg font-bold text-white">{notesList[noteIndex].title}</h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-light">{notesList[noteIndex].body}</p>
          </div>
          <div>
            {noteIndex < notesList.length - 1 ? (
              <button onClick={() => setNoteIndex(noteIndex + 1)} className="w-full bg-pink-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg">Next Card →</button>
            ) : (
              <button onClick={() => setStage('interactive')} className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs py-3 rounded-xl shadow-lg uppercase">Continue ❤️</button>
            )}
          </div>
        </div>
      )}

      {/* STAGE 4: PROPOSAL QUESTION */}
      {stage === 'interactive' && (
        <div className="z-10 max-w-sm w-full bg-slate-900/80 border border-pink-500/40 p-8 rounded-3xl backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto text-pink-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight text-white">Kya Tum Mere lye special person bano gay ? ❤️</h2>
            <p className="text-xs text-zinc-400">Choose your response below</p>
          </div>
          <div className="space-y-3 pt-4">
            <button
              onClick={() => setStage('final')}
              className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-bold text-sm py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>YES, I ACCEPT! ✨</span>
            </button>
            <button
              onClick={() => setRejectAttempts((prev) => (prev + 1) % rejectTexts.length)}
              className="w-full bg-slate-800/80 border border-white/10 text-zinc-400 text-xs py-3 rounded-xl"
            >
              {rejectTexts[rejectAttempts]}
            </button>
          </div>
        </div>
      )}

      {/* STAGE 5: CELEBRATION & TOGETHER COUNTER */}
      {stage === 'final' && (
        <div className="z-10 max-w-md w-full text-center space-y-6">
          <div className="bg-slate-900/80 border border-pink-500/50 p-8 rounded-3xl backdrop-blur-2xl space-y-6 shadow-2xl">
            <h1 className="text-4xl font-black bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">Yayyyyyyyyy 🎉❤️</h1>
            <div className="bg-black/40 border border-white/10 p-6 rounded-2xl space-y-3 font-mono">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Together Since</span>
              <div className="grid grid-cols-4 gap-2 pt-2">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-white/5">
                  <span className="text-xl font-bold text-pink-400">{days}</span>
                  <span className="text-[9px] text-zinc-500 block uppercase">Days</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-white/5">
                  <span className="text-xl font-bold text-pink-400">{hours}</span>
                  <span className="text-[9px] text-zinc-500 block uppercase">Hours</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-white/5">
                  <span className="text-xl font-bold text-pink-400">{minutes}</span>
                  <span className="text-[9px] text-zinc-500 block uppercase">Mins</span>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-white/5">
                  <span className="text-xl font-bold text-pink-400">{seconds}</span>
                  <span className="text-[9px] text-zinc-500 block uppercase">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
        }
