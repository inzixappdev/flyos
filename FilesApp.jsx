import React, { useState } from 'react';
import { 
  Folder, 
  File, 
  Image, 
  Music, 
  Video, 
  FileText, 
  Archive,
  Plus,
  Upload,
  Download,
  Trash2,
  Edit,
  Copy,
  Move,
  Search,
  Grid,
  List,
  Home,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FilesApp = () => {
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const folders = [
    { name: 'المستندات', path: '/home/user/Documents', icon: Folder, color: 'text-blue-500', size: '15 عنصر' },
    { name: 'التحميلات', path: '/home/user/Downloads', icon: Folder, color: 'text-green-500', size: '8 عناصر' },
    { name: 'الصور', path: '/home/user/Pictures', icon: Folder, color: 'text-purple-500', size: '42 صورة' },
    { name: 'الفيديوهات', path: '/home/user/Videos', icon: Folder, color: 'text-red-500', size: '12 فيديو' },
    { name: 'الموسيقى', path: '/home/user/Music', icon: Folder, color: 'text-yellow-500', size: '156 أغنية' },
    { name: 'سطح المكتب', path: '/home/user/Desktop', icon: Folder, color: 'text-gray-500', size: '5 عناصر' },
    { name: 'المشاريع', path: '/home/user/Projects', icon: Folder, color: 'text-indigo-500', size: '7 مشاريع' },
  ];

  const files = [
    { name: 'تقرير_المشروع.docx', type: 'document', size: '2.4 MB', modified: '2024-12-09', icon: FileText },
    { name: 'عرض_تقديمي.pptx', type: 'presentation', size: '5.1 MB', modified: '2024-12-08', icon: FileText },
    { name: 'بيانات_المبيعات.xlsx', type: 'spreadsheet', size: '1.8 MB', modified: '2024-12-07', icon: FileText },
    { name: 'صورة_الشعار.png', type: 'image', size: '856 KB', modified: '2024-12-06', icon: Image },
    { name: 'فيديو_تعليمي.mp4', type: 'video', size: '45.2 MB', modified: '2024-12-05', icon: Video },
    { name: 'موسيقى_خلفية.mp3', type: 'audio', size: '4.7 MB', modified: '2024-12-04', icon: Music },
    { name: 'ملف_مضغوط.zip', type: 'archive', size: '12.3 MB', modified: '2024-12-03', icon: Archive },
  ];

  const breadcrumbs = currentPath.split('/').filter(Boolean);

  const getFileIcon = (file) => {
    const iconProps = { className: "w-8 h-8" };
    switch (file.type) {
      case 'image': return <Image {...iconProps} className="w-8 h-8 text-purple-500" />;
      case 'video': return <Video {...iconProps} className="w-8 h-8 text-red-500" />;
      case 'audio': return <Music {...iconProps} className="w-8 h-8 text-yellow-500" />;
      case 'archive': return <Archive {...iconProps} className="w-8 h-8 text-orange-500" />;
      default: return <FileText {...iconProps} className="w-8 h-8 text-blue-500" />;
    }
  };

  const handleItemSelect = (item) => {
    setSelectedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const navigateToFolder = (folderPath) => {
    setCurrentPath(folderPath);
    setSelectedItems([]);
  };

  const filteredItems = [...folders, ...files].filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderGridView = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6">
      {filteredItems.map((item, index) => {
        const isFolder = folders.includes(item);
        const isSelected = selectedItems.includes(item);
        const IconComponent = isFolder ? item.icon : getFileIcon(item);
        
        return (
          <div
            key={index}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
              isSelected 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-transparent hover:bg-gray-50'
            }`}
            onClick={() => handleItemSelect(item)}
            onDoubleClick={() => isFolder && navigateToFolder(item.path)}
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-3">
                {isFolder ? (
                  <item.icon className={`w-12 h-12 ${item.color}`} />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center">
                    {IconComponent}
                  </div>
                )}
              </div>
              <div className="text-sm font-medium text-gray-800 truncate w-full">
                {item.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {isFolder ? item.size : `${item.size} • ${item.modified}`}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderListView = () => (
    <div className="p-6">
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-600">
            <div className="col-span-6">الاسم</div>
            <div className="col-span-2">الحجم</div>
            <div className="col-span-2">النوع</div>
            <div className="col-span-2">آخر تعديل</div>
          </div>
        </div>
        <div className="divide-y">
          {filteredItems.map((item, index) => {
            const isFolder = folders.includes(item);
            const isSelected = selectedItems.includes(item);
            
            return (
              <div
                key={index}
                className={`px-6 py-4 cursor-pointer transition-colors duration-200 ${
                  isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => handleItemSelect(item)}
                onDoubleClick={() => isFolder && navigateToFolder(item.path)}
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-6 flex items-center gap-3">
                    {isFolder ? (
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    ) : (
                      getFileIcon(item)
                    )}
                    <span className="font-medium text-gray-800">{item.name}</span>
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">
                    {isFolder ? '—' : item.size}
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">
                    {isFolder ? 'مجلد' : item.type}
                  </div>
                  <div className="col-span-2 text-sm text-gray-600">
                    {isFolder ? '—' : item.modified}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gray-50" dir="rtl">
      {/* Sidebar */}
      <div className="flex flex-1">
        <div className="w-64 bg-white border-l border-gray-200 p-4">
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">الأماكن المفضلة</h3>
            <div className="space-y-1">
              <div 
                className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => navigateToFolder('/home/user')}
              >
                <Home className="w-5 h-5 text-gray-500" />
                <span className="text-sm">المجلد الرئيسي</span>
              </div>
              {folders.slice(0, 5).map((folder, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => navigateToFolder(folder.path)}
                >
                  <folder.icon className={`w-5 h-5 ${folder.color}`} />
                  <span className="text-sm">{folder.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3">إحصائيات التخزين</h3>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600 mb-2">المساحة المستخدمة</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="text-xs text-gray-600">65 GB من 100 GB</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 ml-2" />
                  جديد
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 ml-2" />
                  رفع
                </Button>
                <Button variant="outline" size="sm" disabled={selectedItems.length === 0}>
                  <Download className="w-4 h-4 ml-2" />
                  تحميل
                </Button>
                <Button variant="outline" size="sm" disabled={selectedItems.length === 0}>
                  <Trash2 className="w-4 h-4 ml-2" />
                  حذف
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="البحث في الملفات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 w-64"
                  />
                </div>
                <div className="flex border rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Home className="w-4 h-4" />
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  <ChevronRight className="w-4 h-4" />
                  <span 
                    className="cursor-pointer hover:text-blue-600"
                    onClick={() => setCurrentPath('/' + breadcrumbs.slice(0, index + 1).join('/'))}
                  >
                    {crumb}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            {viewMode === 'grid' ? renderGridView() : renderListView()}
          </div>

          {/* Status Bar */}
          <div className="bg-white border-t border-gray-200 px-6 py-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{filteredItems.length} عنصر</span>
              {selectedItems.length > 0 && (
                <span>{selectedItems.length} عنصر محدد</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesApp;

