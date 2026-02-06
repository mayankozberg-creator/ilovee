
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AppStage, PartnerConfig } from './types';

const SetupForm: React.FC<{ onComplete: (config: PartnerConfig) => void }> = ({ onComplete }) => {
  const [form, setForm] = useState<PartnerConfig>({
    name: 'סינדי ווינשטיין',
    nickname: 'סינדי שלי',
    relationshipLength: '',
    specialMemory: '',
    vibe: 'deep',
  });
  const [showHint, setShowHint] = useState(false);
  
  const handleSubmit = () => {
    if (!form.relationshipLength.trim()) {
      setShowHint(true);
      return;
    }
    onComplete(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black relative overflow-hidden">
      <div className="glow-orb" style={{ top: '-10%', left: '-10%', background: 'radial-gradient(circle, rgba(255,20,147,0.15) 0%, transparent 70%)' }}></div>
      <div className="max-w-lg w-full glass p-12 rounded-[3.5rem] space-y-10 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)] z-10 transition-all duration-1000">
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1 rounded-full border border-pink-500/20 text-[10px] uppercase tracking-[0.3em] text-pink-500/60 animate-pulse font-bold">MK COMPUTERS Engine v5.0</div>
          <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-white/90">MK COMPUTERS</h1>
          <p className="text-white/30 text-sm font-light tracking-wide">החוויה האישית ביותר שנבנתה אי פעם עבור סינדי</p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-1 relative">
            <label className="block text-[10px] uppercase tracking-widest text-white/20 mr-2">משך הזמן שלכם יחד</label>
            <input 
              type="text" 
              className={`w-full bg-white/[0.02] border ${showHint && !form.relationshipLength ? 'border-pink-500/50' : 'border-white/5'} rounded-2xl px-6 py-5 focus:outline-none focus:border-pink-500/40 transition-all font-light text-lg`} 
              placeholder="למשל: 3 שנים ו-4 חודשים" 
              value={form.relationshipLength} 
              onChange={e => {
                setForm({...form, relationshipLength: e.target.value});
                if(e.target.value) setShowHint(false);
              }} 
            />
            {showHint && !form.relationshipLength && (
              <p className="absolute -bottom-6 right-2 text-[10px] text-pink-500/80 animate-bounce tracking-tight font-bold italic">
                רמז קטן: אולי "תמיד היינו"?
              </p>
            )}
          </div>
          <div className="space-y-1">
            <label className="block text-[10px] uppercase tracking-widest text-white/20 mr-2">זיכרון עוצמתי (שבו הכל התחיל)</label>
            <textarea className="w-full bg-white/[0.02] border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-pink-500/40 transition-all resize-none font-light text-lg" rows={3} placeholder="מה הרגע ששינה הכל?" value={form.specialMemory} onChange={e => setForm({...form, specialMemory: e.target.value})} />
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={!form.specialMemory}
          className="w-full py-7 bg-white text-black rounded-full font-black text-xl hover:bg-pink-500 hover:text-white transition-all duration-500 disabled:opacity-10 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
        >
          בניית העולם של סינדי
        </button>
      </div>
    </div>
  );
};

const Envelope: React.FC<{ onOpen: () => void }> = ({ onOpen }) => (
  <div className="min-h-screen flex items-center justify-center bg-black p-6 overflow-hidden relative">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,20,147,0.08)_0%,_transparent_75%)]"></div>
    <div className="animate-float cursor-pointer relative group" onClick={onOpen}>
      <div className="absolute inset-0 bg-pink-500/20 blur-[150px] opacity-0 group-hover:opacity-100 transition-opacity duration-[1.5s]"></div>
      <div className="glass w-[28rem] h-[20rem] rounded-[4rem] border border-white/10 flex flex-col items-center justify-center p-12 transition-all duration-1000 hover:scale-[1.03] active:scale-90 shadow-2xl">
        <div className="w-24 h-24 border border-pink-500/20 rounded-full flex items-center justify-center mb-10 relative">
           <div className="absolute inset-0 border border-pink-500/40 rounded-full animate-ping"></div>
           <div className="w-3 h-3 bg-pink-500 rounded-full shadow-[0_0_15px_rgba(255,20,147,1)]"></div>
        </div>
        <p className="text-white/20 text-[10px] tracking-[0.8em] uppercase mb-3">MK COMPUTERS | Priority Level: Eternal</p>
        <h2 className="text-4xl font-serif font-light tracking-widest text-white/80">עבור סינדי</h2>
        <div className="mt-12 text-pink-500/40 text-xs tracking-[0.4em] group-hover:text-pink-500 transition-colors uppercase font-bold">Tap to sync souls</div>
      </div>
    </div>
  </div>
);

const SyncStage: React.FC<{ onComplete: () => void; nickname: string }> = ({ onComplete, nickname }) => {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isHolding) {
      timerRef.current = window.setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(timerRef.current!);
            onComplete();
            return 100;
          }
          return p + 1.2;
        });
      }, 40);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(p => Math.max(0, p - 4));
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isHolding, onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-6 space-y-24 relative overflow-hidden">
      <div className={`absolute inset-0 transition-all duration-1000 ${isHolding ? 'bg-pink-500/5' : 'bg-transparent'}`}></div>
      
      <div className="text-center space-y-8 z-10 px-4">
        <h1 className="text-5xl md:text-7xl font-serif font-light leading-tight transition-all duration-700" style={{ opacity: 0.3 + progress/140, transform: `scale(${0.95 + progress/500})` }}>
          {nickname}, <br /> <span className="text-pink-500/80">הסתנכרנות עצבית...</span>
        </h1>
        <p className="text-white/20 text-xs tracking-[0.6em] uppercase animate-pulse">החזיקי את הלב כדי לחשוף את הנצח</p>
      </div>

      <div className="relative flex items-center justify-center z-10">
        <div className="absolute w-[400px] h-[400px] border border-white/[0.03] rounded-full animate-[spin_30s_linear_infinite]"></div>
        <div className="absolute w-[350px] h-[350px] border border-pink-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
        <div 
          onMouseDown={() => setIsHolding(true)}
          onMouseUp={() => setIsHolding(false)}
          onTouchStart={() => setIsHolding(true)}
          onTouchEnd={() => setIsHolding(false)}
          className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-700 cursor-none select-none ${isHolding ? 'scale-125 shadow-[0_0_120px_rgba(255,20,147,0.3)] bg-white/5' : 'scale-100 border border-white/10'}`}
        >
          <div className={`text-6xl transition-transform duration-700 ${isHolding ? 'scale-125' : 'scale-100 opacity-50'}`}>🤍</div>
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle cx="96" cy="96" r="92" fill="none" stroke="rgba(255,20,147,0.5)" strokeWidth="4" strokeDasharray="578" strokeDashoffset={578 - (progress * 5.78)} strokeLinecap="round" className="transition-all duration-150" />
          </svg>
        </div>
      </div>

      <div className="text-pink-500/20 text-[10px] tracking-[1.5em] uppercase z-10 font-bold">Bio-Metric Alignment: {Math.floor(progress)}%</div>
    </div>
  );
};

const Question: React.FC<{ onYes: () => void; nickname: string }> = ({ onYes, nickname }) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);
  const [noCount, setNoCount] = useState(0);

  const moveNo = useCallback(() => {
    const x = (Math.random() - 0.5) * window.innerWidth * 0.8;
    const y = (Math.random() - 0.5) * window.innerHeight * 0.8;
    setNoPos({ x, y });
    setNoScale(prev => Math.max(0, prev - 0.12));
    setNoCount(prev => prev + 1);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black space-y-32 p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(255,20,147,0.05)_0%,_transparent_60%)]"></div>
      <h1 className="text-6xl md:text-9xl font-serif text-center font-light leading-tight px-4 max-w-6xl transition-all duration-1000 z-10 drop-shadow-2xl">
        {noCount === 0 ? `סינדי, ${nickname}, את אוהבת אותי?` : noCount < 4 ? "אופס, לחצת במקום הלא נכון..." : "את יודעת שאין לזה סוף, נכון?"}
      </h1>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-20 w-full max-w-2xl relative h-64 z-10">
        <button onClick={onYes} className="px-24 py-10 bg-white text-black rounded-full text-4xl font-black transition-all active:scale-90 hover:scale-110 hover:shadow-[0_0_100px_rgba(255,20,147,0.5)] shadow-2xl">
          ברור שכן!
        </button>
        
        <button 
          onMouseEnter={moveNo} onTouchStart={moveNo}
          style={{ transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${noScale})`, opacity: noScale < 0.1 ? 0 : 1 }}
          className="px-14 py-6 bg-white text-black rounded-full transition-all duration-300 absolute whitespace-nowrap text-2xl font-bold shadow-[0_0_35px_rgba(255,255,255,0.9)] hover:shadow-[0_0_60px_rgba(255,255,255,1)]"
        >
          לא
        </button>
      </div>
    </div>
  );
};

const ClimaxStage: React.FC<{ nickname: string }> = ({ nickname }) => {
  const [hearts, setHearts] = useState<{ id: number, x: number, y: number, size: number, delay: number }[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev.slice(-40), 
        { 
          id: Math.random(), 
          x: Math.random() * 100, 
          y: Math.random() * 100, 
          size: 20 + Math.random() * 60,
          delay: Math.random() * 2 
        }
      ]);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Hearts Rain */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map(h => (
          <div 
            key={h.id} 
            className="absolute animate-float opacity-30 blur-[2px]"
            style={{ 
              top: `${h.y}%`, 
              left: `${h.x}%`, 
              fontSize: `${h.size}px`,
              animationDelay: `${h.delay}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="z-10 text-center space-y-12 px-6">
        <div className="inline-block px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] tracking-[1.5em] text-white/40 uppercase font-black animate-pulse">
          MK COMPUTERS SUCCESSFUL SYNC
        </div>
        
        <h1 className="text-[8rem] md:text-[15rem] font-serif font-black text-white leading-none drop-shadow-[0_0_80px_rgba(255,255,255,0.4)] animate-[pop_0.6s_cubic-bezier(0.175,0.885,0.32,1.275)]">
          ישששש
        </h1>
        
        <div className="flex justify-center gap-4 text-7xl md:text-9xl animate-bounce">
          <span>❤️</span>
          <span>❤️</span>
          <span>❤️</span>
        </div>

        <p className="text-white/30 text-2xl md:text-4xl font-light tracking-[0.5em] mt-20 italic">
          {nickname}, את כל העולם שלי.
        </p>
      </div>

      <div className="absolute bottom-10 text-white/10 text-[10px] tracking-[1em] uppercase font-bold italic">
        עשייה MK COMPUTERS
      </div>

      <style>{`
        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; filter: blur(20px); }
          100% { transform: scale(1); opacity: 1; filter: blur(0); }
        }
        .animate-float {
          animation: float_up 10s linear infinite;
        }
        @keyframes float_up {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          20% { opacity: 0.3; }
          80% { opacity: 0.3; }
          100% { transform: translateY(-20vh) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default function App() {
  const [stage, setStage] = useState<AppStage>('setup');
  const [config, setConfig] = useState<PartnerConfig | null>(null);

  const handleSetup = (data: PartnerConfig) => { setConfig(data); setStage('envelope'); };
  const handleOpen = () => setStage('sync');
  const handleSync = () => setStage('question');
  const handleYes = () => setStage('climax');

  return (
    <div className="transition-all duration-1000 ease-in-out">
      {stage === 'setup' && <SetupForm onComplete={handleSetup} />}
      {stage === 'envelope' && <Envelope onOpen={handleOpen} />}
      {stage === 'sync' && config && <SyncStage onComplete={handleSync} nickname={config.nickname} />}
      {stage === 'question' && config && <Question onYes={handleYes} nickname={config.nickname} />}
      {stage === 'climax' && config && <ClimaxStage nickname={config.nickname} />}
    </div>
  );
}
