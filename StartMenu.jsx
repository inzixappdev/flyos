import React from 'react';
import { Globe, Folder, Settings, Palette, Code, Bot, User, Power } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StartMenu = ({ isOpen, onOpenApp, onClose }) => {
  const apps = [
    { id: 'browser', icon: Globe, label: 'المتصفح', description: 'تصفح الإنترنت' },
    { id: 'files', icon: Folder, label: 'مدير الملفات', description: 'إدارة الملفات والمجلدات' },
    { id: 'settings', icon: Settings, label: 'الإعدادات', description: 'إعدادات النظام' },
    { id: 'painter', icon: Palette, label: 'الرسام', description: 'تطبيق الرسم والتصميم' },
    { id: 'editor', icon: Code, label: 'محرر الكود', description: 'محرر نصوص متقدم' },
    { id: 'quatchire', icon: Bot, label: 'Quatchire AI', description: 'المساعد الذكي' },
  ];

  const handleAppClick = (appId) => {
    onOpenApp(appId);
    onClose();
  };

  return (
    <div className={`flyos-start-menu ${isOpen ? '' : 'hidden'}`} dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
        <h2 className="text-xl font-bold mb-1">FlyOS</h2>
        <p className="text-sm opacity-90">نظام التشغيل الويب المتقدم</p>
      </div>
      
      {/* Apps Grid */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">التطبيقات</h3>
        <div className="space-y-1">
          {apps.map((app) => {
            const IconComponent = app.icon;
            return (
              <div
                key={app.id}
                className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100 group"
                onClick={() => handleAppClick(app.id)}
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-200">
                  <IconComponent size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800">{app.label}</div>
                  <div className="text-xs text-gray-500">{app.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* User Profile */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
            <User size={24} />
          </div>
          <div>
            <div className="font-semibold text-gray-800">مستخدم FlyOS</div>
            <div className="text-sm text-gray-500">متصل</div>
          </div>
        </div>
        
        <Button 
          variant="destructive" 
          className="w-full"
          onClick={() => window.location.reload()}
        >
          <Power className="w-4 h-4 ml-2" />
          إعادة تشغيل النظام
        </Button>
      </div>
    </div>
  );
};

export default StartMenu;

