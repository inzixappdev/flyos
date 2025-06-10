import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Home, Star, Search, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const BrowserApp = () => {
  const [url, setUrl] = useState('https://www.google.com');
  const [currentPage, setCurrentPage] = useState('home');
  const [history, setHistory] = useState(['https://www.google.com']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const bookmarks = [
    { name: 'Google', url: 'https://www.google.com', icon: '🔍' },
    { name: 'YouTube', url: 'https://www.youtube.com', icon: '📺' },
    { name: 'GitHub', url: 'https://www.github.com', icon: '💻' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '📚' },
  ];

  const popularSites = [
    { name: 'Google', url: 'https://www.google.com', icon: '🔍', color: 'bg-blue-500' },
    { name: 'YouTube', url: 'https://www.youtube.com', icon: '📺', color: 'bg-red-500' },
    { name: 'Facebook', url: 'https://www.facebook.com', icon: '📘', color: 'bg-blue-600' },
    { name: 'Twitter', url: 'https://www.twitter.com', icon: '🐦', color: 'bg-sky-500' },
    { name: 'Instagram', url: 'https://www.instagram.com', icon: '📷', color: 'bg-pink-500' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com', icon: '💼', color: 'bg-blue-700' },
    { name: 'Reddit', url: 'https://www.reddit.com', icon: '🤖', color: 'bg-orange-500' },
    { name: 'Wikipedia', url: 'https://www.wikipedia.org', icon: '📖', color: 'bg-gray-600' },
  ];

  const navigate = (newUrl) => {
    setUrl(newUrl);
    setCurrentPage('website');
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newUrl);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setUrl(history[historyIndex - 1]);
      setCurrentPage('website');
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setUrl(history[historyIndex + 1]);
      setCurrentPage('website');
    }
  };

  const refresh = () => {
    // Simulate page refresh
    setCurrentPage('loading');
    setTimeout(() => setCurrentPage('website'), 1000);
  };

  const goHome = () => {
    setUrl('https://www.google.com');
    setCurrentPage('home');
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    let processedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      processedUrl = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    }
    navigate(processedUrl);
  };

  const renderHomePage = () => (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">متصفح FlyOS</h1>
          <p className="text-gray-600">متصفح ويب سريع وآمن مدمج في نظام التشغيل</p>
        </div>

        <div className="mb-8">
          <form onSubmit={handleUrlSubmit} className="flex gap-3 max-w-2xl mx-auto">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="ابحث في Google أو أدخل عنوان موقع..."
              className="flex-1 h-12 text-lg"
              dir="ltr"
            />
            <Button type="submit" size="lg" className="px-8">
              <Search className="w-5 h-5 ml-2" />
              بحث
            </Button>
          </form>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">المواقع الشائعة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularSites.map((site, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer group"
                onClick={() => navigate(site.url)}
              >
                <div className={`w-12 h-12 ${site.color} rounded-lg flex items-center justify-center text-white text-xl mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  {site.icon}
                </div>
                <h3 className="font-semibold text-gray-800">{site.name}</h3>
                <p className="text-sm text-gray-500 truncate">{site.url}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">الإشارات المرجعية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {bookmarks.map((bookmark, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-3"
                onClick={() => navigate(bookmark.url)}
              >
                <div className="text-2xl">{bookmark.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-800">{bookmark.name}</h3>
                  <p className="text-sm text-gray-500 truncate">{bookmark.url}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderWebsite = () => (
    <div className="flex-1 bg-white">
      <iframe
        src={url}
        className="w-full h-full border-none"
        title="Browser Content"
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      />
    </div>
  );

  const renderLoading = () => (
    <div className="flex-1 bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-gray-600">جاري تحميل الصفحة...</p>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col" dir="rtl">
      {/* Navigation Bar */}
      <div className="bg-gray-100 border-b p-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              disabled={historyIndex <= 0}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goForward}
              disabled={historyIndex >= history.length - 1}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={refresh}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={goHome}>
              <Home className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleUrlSubmit} className="flex-1 flex gap-2">
            <div className="flex-1 relative">
              <Shield className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
              <Input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pr-10"
                dir="ltr"
              />
            </div>
            <Button type="submit" size="sm">
              انتقال
            </Button>
          </form>

          <Button variant="ghost" size="sm">
            <Star className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content Area */}
      {currentPage === 'home' && renderHomePage()}
      {currentPage === 'website' && renderWebsite()}
      {currentPage === 'loading' && renderLoading()}
    </div>
  );
};

export default BrowserApp;

