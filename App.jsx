import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// Components
import DesktopIcons from './components/DesktopIcons';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import Window from './components/Window';
import QuatchireAI from './components/QuatchireAI';

// Apps
import BrowserApp from './components/apps/BrowserApp';
import FilesApp from './components/apps/FilesApp';

function App() {
  const [windows, setWindows] = useState([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isQuatchireOpen, setIsQuatchireOpen] = useState(false);
  const [nextWindowId, setNextWindowId] = useState(1);
  const [focusedWindowId, setFocusedWindowId] = useState(null);

  // App configurations
  const appConfigs = {
    browser: {
      title: '🌐 المتصفح',
      component: BrowserApp,
      defaultSize: { width: 1000, height: 700 },
      defaultPosition: { x: 100, y: 50 }
    },
    files: {
      title: '📁 مدير الملفات',
      component: FilesApp,
      defaultSize: { width: 900, height: 600 },
      defaultPosition: { x: 150, y: 100 }
    },
    settings: {
      title: '⚙️ الإعدادات',
      component: () => (
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">⚙️</div>
          <h2 className="text-2xl font-bold mb-4">إعدادات النظام</h2>
          <p className="text-gray-600">قريباً... سيتم إضافة إعدادات شاملة للنظام</p>
        </div>
      ),
      defaultSize: { width: 800, height: 600 },
      defaultPosition: { x: 200, y: 150 }
    },
    painter: {
      title: '🎨 الرسام',
      component: () => (
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h2 className="text-2xl font-bold mb-4">تطبيق الرسم</h2>
          <p className="text-gray-600">قريباً... تطبيق رسم احترافي مع أدوات متقدمة</p>
        </div>
      ),
      defaultSize: { width: 1000, height: 700 },
      defaultPosition: { x: 120, y: 80 }
    },
    editor: {
      title: '💻 محرر الكود',
      component: () => (
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">💻</div>
          <h2 className="text-2xl font-bold mb-4">محرر الكود</h2>
          <p className="text-gray-600">قريباً... محرر كود متقدم يشبه VS Code</p>
        </div>
      ),
      defaultSize: { width: 1100, height: 750 },
      defaultPosition: { x: 80, y: 60 }
    },
    quatchire: {
      title: '🤖 Quatchire AI',
      component: () => (
        <div className="p-8 text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h2 className="text-2xl font-bold mb-4">Quatchire AI</h2>
          <p className="text-gray-600">استخدم Shift+Q لفتح Quatchire AI في نافذة منفصلة</p>
        </div>
      ),
      defaultSize: { width: 800, height: 600 },
      defaultPosition: { x: 250, y: 120 }
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Shift + Q for Quatchire AI
      if (e.shiftKey && e.key === 'Q') {
        e.preventDefault();
        setIsQuatchireOpen(true);
      }
      
      // Escape to close modals
      if (e.key === 'Escape') {
        if (isQuatchireOpen) {
          setIsQuatchireOpen(false);
        }
        if (isStartMenuOpen) {
          setIsStartMenuOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isQuatchireOpen, isStartMenuOpen]);

  // Close start menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isStartMenuOpen && !e.target.closest('.flyos-start-menu') && !e.target.closest('.flyos-start-button')) {
        setIsStartMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isStartMenuOpen]);

  const openApp = useCallback((appId) => {
    // Check if app is already open
    const existingWindow = windows.find(w => w.appId === appId);
    if (existingWindow) {
      focusWindow(existingWindow.id);
      return;
    }

    const config = appConfigs[appId];
    if (!config) return;

    const newWindow = {
      id: nextWindowId,
      appId,
      title: config.title,
      component: config.component,
      size: config.defaultSize,
      position: config.defaultPosition,
      isMaximized: false,
      isMinimized: false,
      zIndex: 1000 + nextWindowId
    };

    setWindows(prev => [...prev, newWindow]);
    setFocusedWindowId(nextWindowId);
    setNextWindowId(prev => prev + 1);
  }, [windows, nextWindowId]);

  const closeWindow = useCallback((windowId) => {
    setWindows(prev => prev.filter(w => w.id !== windowId));
    if (focusedWindowId === windowId) {
      const remainingWindows = windows.filter(w => w.id !== windowId);
      setFocusedWindowId(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null);
    }
  }, [windows, focusedWindowId]);

  const minimizeWindow = useCallback((windowId) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMinimized: true } : w
    ));
    if (focusedWindowId === windowId) {
      const visibleWindows = windows.filter(w => w.id !== windowId && !w.isMinimized);
      setFocusedWindowId(visibleWindows.length > 0 ? visibleWindows[visibleWindows.length - 1].id : null);
    }
  }, [windows, focusedWindowId]);

  const maximizeWindow = useCallback((windowId) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  }, []);

  const focusWindow = useCallback((windowId) => {
    setWindows(prev => prev.map(w => 
      w.id === windowId 
        ? { ...w, isMinimized: false, zIndex: Math.max(...prev.map(win => win.zIndex)) + 1 }
        : w
    ));
    setFocusedWindowId(windowId);
  }, []);

  const toggleStartMenu = () => {
    setIsStartMenuOpen(prev => !prev);
  };

  const visibleWindows = windows.filter(w => !w.isMinimized);
  const taskbarWindows = windows.map(w => ({
    id: w.id,
    title: w.title,
    focused: w.id === focusedWindowId && !w.isMinimized
  }));

  return (
    <div className="flyos-desktop">
      {/* Desktop Icons */}
      <DesktopIcons onOpenApp={openApp} />

      {/* Windows */}
      {visibleWindows.map(window => {
        const AppComponent = window.component;
        return (
          <Window
            key={window.id}
            id={window.id}
            title={window.title}
            onClose={closeWindow}
            onMinimize={minimizeWindow}
            onMaximize={maximizeWindow}
            onFocus={focusWindow}
            isMaximized={window.isMaximized}
            initialPosition={window.position}
            initialSize={window.size}
            style={{ zIndex: window.zIndex }}
          >
            <AppComponent />
          </Window>
        );
      })}

      {/* Start Menu */}
      <StartMenu 
        isOpen={isStartMenuOpen}
        onOpenApp={openApp}
        onClose={() => setIsStartMenuOpen(false)}
      />

      {/* Taskbar */}
      <Taskbar 
        onToggleStartMenu={toggleStartMenu}
        openWindows={taskbarWindows}
        onFocusWindow={focusWindow}
      />

      {/* Quatchire AI Modal */}
      <QuatchireAI 
        isOpen={isQuatchireOpen}
        onClose={() => setIsQuatchireOpen(false)}
      />
    </div>
  );
}

export default App;

