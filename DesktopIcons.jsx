import React from 'react';
import { Globe, Folder, Settings, Palette, Code, Bot } from 'lucide-react';

const DesktopIcons = ({ onOpenApp }) => {
  const apps = [
    { id: 'browser', icon: Globe, label: 'المتصفح', color: 'text-blue-400' },
    { id: 'files', icon: Folder, label: 'الملفات', color: 'text-yellow-400' },
    { id: 'settings', icon: Settings, label: 'الإعدادات', color: 'text-gray-400' },
    { id: 'painter', icon: Palette, label: 'الرسام', color: 'text-pink-400' },
    { id: 'editor', icon: Code, label: 'محرر الكود', color: 'text-green-400' },
    { id: 'quatchire', icon: Bot, label: 'Quatchire AI', color: 'text-purple-400' },
  ];

  return (
    <div className="absolute top-6 right-6 flex flex-col gap-4 z-10" dir="rtl">
      {apps.map((app) => {
        const IconComponent = app.icon;
        return (
          <div
            key={app.id}
            className="flyos-desktop-icon group"
            onDoubleClick={() => onOpenApp(app.id)}
          >
            <div className={`flyos-app-icon ${app.color} group-hover:scale-110 transition-transform duration-200`}>
              <IconComponent size={32} />
            </div>
            <div className="flyos-app-label">{app.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default DesktopIcons;

