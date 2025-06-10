import React, { useState, useEffect } from 'react';
import { Rocket, Clock } from 'lucide-react';

const Taskbar = ({ onToggleStartMenu, openWindows, onFocusWindow }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="flyos-taskbar" dir="rtl">
      <div 
        className="flyos-start-button group"
        onClick={onToggleStartMenu}
      >
        <Rocket className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
        <span className="font-bold">FlyOS</span>
      </div>
      
      <div className="flex-1 flex items-center gap-2 mx-4">
        {openWindows.map((window) => (
          <div
            key={window.id}
            className={`px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
              window.focused 
                ? 'bg-white/30 text-white' 
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
            onClick={() => onFocusWindow(window.id)}
          >
            <span className="text-sm font-medium">{window.title}</span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-4 text-white">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4" />
          <span className="font-medium">{formatTime(currentTime)}</span>
        </div>
        <div className="text-xs bg-white/10 px-2 py-1 rounded opacity-80">
          Shift+Q للذكاء الاصطناعي
        </div>
      </div>
    </div>
  );
};

export default Taskbar;

