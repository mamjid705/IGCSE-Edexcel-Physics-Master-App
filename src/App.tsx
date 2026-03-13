import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Rocket, Bolt, Waves as WavesIcon, Lightbulb, 
  Droplets, Magnet, Radiation, Star,
  LayoutDashboard, BookOpen, PenTool, Target, Trophy,
  ChevronRight, ArrowLeft, Info, CheckCircle2,
  Menu, X, Settings, User, Bell
} from 'lucide-react';
import { chapters } from './data/chapters';
import { masterQuestions } from './data/masterBank';
import { SimulationCanvas } from './components/SimulationCanvas';
import { ViewType, Chapter, StrategistQuestion } from './types';

const App = () => {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedMasterActivity, setSelectedMasterActivity] = useState<StrategistQuestion | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [xp, setXp] = useState(1250);
  const [streak, setStreak] = useState(7);

  // Icon mapping for chapters
  const getChapterIcon = (iconName: string, size = 20) => {
    switch (iconName) {
      case 'Rocket': return <Rocket size={size} />;
      case 'Bolt': return <Bolt size={size} />;
      case 'Waves': return <WavesIcon size={size} />;
      case 'Lightbulb': return <Lightbulb size={size} />;
      case 'Droplets': return <Droplets size={size} />;
      case 'Magnet': return <Magnet size={size} />;
      case 'Radiation': return <Radiation size={size} />;
      case 'Star': return <Star size={size} />;
      default: return <BookOpen size={size} />;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">DASHBOARD</h1>
          <p className="text-slate-400 text-sm">Welcome back, Physicist. Ready to master the universe?</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-slate-800/50 px-4 py-2 rounded-2xl border border-slate-700 flex items-center gap-2">
            <Trophy className="text-yellow-400" size={18} />
            <span className="font-bold text-white">{xp} XP</span>
          </div>
          <div className="bg-slate-800/50 px-4 py-2 rounded-2xl border border-slate-700 flex items-center gap-2">
            <Bolt className="text-orange-400" size={18} />
            <span className="font-bold text-white">{streak} Day Streak</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { id: 'foundation', name: 'Foundation', icon: <BookOpen />, color: 'blue', desc: 'Core concepts & theory' },
          { id: 'builder', name: 'Builder', icon: <PenTool />, color: 'emerald', desc: 'Problem solving skills' },
          { id: 'strategist', name: 'Strategist', icon: <Target />, color: 'purple', desc: 'Exam techniques' },
          { id: 'master', name: 'Master', icon: <Trophy />, color: 'amber', desc: 'Interactive practicals' }
        ].map((mode) => (
          <motion.button
            key={mode.id}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveView(mode.id as ViewType)}
            className={`p-6 rounded-[2rem] bg-slate-900 border border-slate-800 text-left group transition-all hover:border-${mode.color}-500/50 shadow-xl`}
          >
            <div className={`w-12 h-12 rounded-2xl bg-${mode.color}-500/20 flex items-center justify-center text-${mode.color}-400 mb-4 group-hover:scale-110 transition-transform`}>
              {mode.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{mode.name}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{mode.desc}</p>
          </motion.button>
        ))}
      </div>

      <section>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BookOpen className="text-blue-400" size={20} /> Continue Learning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.slice(0, 3).map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => { setSelectedChapter(chapter); setActiveView('master'); }}
              className="p-5 rounded-3xl bg-slate-900/50 border border-slate-800 flex items-center gap-4 hover:bg-slate-800 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-400 transition-colors">
                {getChapterIcon(chapter.icon)}
              </div>
              <div className="flex-1 text-left">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Chapter {chapter.id}</div>
                <div className="font-bold text-white">{chapter.name}</div>
              </div>
              <ChevronRight className="text-slate-600 group-hover:text-white transition-colors" size={18} />
            </button>
          ))}
        </div>
      </section>
    </div>
  );

  const renderMasterView = () => {
    if (selectedMasterActivity) {
      return (
        <div className="h-full flex flex-col space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <header className="flex items-center justify-between">
            <button 
              onClick={() => setSelectedMasterActivity(null)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm"
            >
              <ArrowLeft size={18} /> Back to Activities
            </button>
            <div className="flex items-center gap-2 text-amber-400 text-[10px] font-black uppercase tracking-widest">
              <Trophy size={14} /> <span>Master Practical • {selectedMasterActivity.topic}</span>
            </div>
          </header>

          <div className="flex-1 bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden flex flex-col">
            <div className="p-6 bg-slate-800/30 border-b border-slate-800">
              <h2 className="text-xl font-bold text-white mb-2">{selectedMasterActivity.question}</h2>
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                  6 Marks
                </span>
                <div className="flex items-center gap-1 text-slate-500 text-xs italic">
                  <Info size={14} /> {selectedMasterActivity.hint}
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-6">
              <SimulationCanvas 
                type={selectedMasterActivity.drawType || selectedMasterActivity.type || ''} 
                simType={selectedMasterActivity.simType}
                config={selectedMasterActivity.config}
              />
            </div>

            <div className="p-6 bg-slate-950 border-t border-slate-800">
              <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Mark Scheme Checklist</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedMasterActivity.markScheme.map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800/50">
                    <CheckCircle2 className="text-emerald-500 mt-0.5 shrink-0" size={16} />
                    <span className="text-xs text-slate-300 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    const filteredActivities = selectedChapter 
      ? masterQuestions.filter(q => q.topic === selectedChapter.name)
      : masterQuestions;

    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">MASTER PRACTICALS</h1>
            <p className="text-slate-400 text-sm">
              {selectedChapter ? `Showing activities for ${selectedChapter.name}` : 'Select a chapter to see related practicals'}
            </p>
          </div>
          {selectedChapter && (
            <button 
              onClick={() => setSelectedChapter(null)}
              className="text-xs font-bold text-blue-400 hover:underline"
            >
              Show All Chapters
            </button>
          )}
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity) => (
            <motion.button
              key={activity.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMasterActivity(activity)}
              className="p-6 rounded-[2rem] bg-slate-900 border border-slate-800 text-left flex flex-col h-full hover:border-amber-500/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Trophy size={20} />
                </div>
                <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">ID: {activity.id}</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 flex-1">{activity.question}</h3>
              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase">{activity.topic}</span>
                <ChevronRight className="text-slate-700 group-hover:text-amber-500 transition-colors" size={16} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-[#0f172a] border-r border-slate-800 flex flex-col z-50"
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0">
            <Rocket size={24} />
          </div>
          {isSidebarOpen && (
            <span className="font-black text-lg tracking-tighter text-white">IGCSE MASTER</span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
          {isSidebarOpen && (
            <div className="px-2 mb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Chapters</div>
          )}
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => {
                setSelectedChapter(chapter);
                setActiveView('master');
                setSelectedMasterActivity(null);
              }}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                selectedChapter?.id === chapter.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="shrink-0">
                {getChapterIcon(chapter.icon, 18)}
              </div>
              {isSidebarOpen && (
                <span className="text-sm font-bold truncate">{chapter.name}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-3 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white transition-colors"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-[#0f172a]/50 backdrop-blur-md border-b border-slate-800 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-8">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: <LayoutDashboard size={18} /> },
              { id: 'master', name: 'Master', icon: <Trophy size={18} /> }
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => {
                  setActiveView(view.id as ViewType);
                  if (view.id === 'dashboard') {
                    setSelectedChapter(null);
                    setSelectedMasterActivity(null);
                  }
                }}
                className={`flex items-center gap-2 font-bold text-sm transition-all relative py-2 ${
                  activeView === view.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {view.icon}
                <span>{view.name}</span>
                {activeView === view.id && (
                  <motion.div 
                    layoutId="activeView"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-white transition-colors"><Bell size={20} /></button>
            <button className="p-2 text-slate-500 hover:text-white transition-colors"><Settings size={20} /></button>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400">
              <User size={20} />
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {activeView === 'dashboard' ? renderDashboard() : renderMasterView()}
        </div>
      </main>
    </div>
  );
};

export default App;
