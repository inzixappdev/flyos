import React, { useState, useRef, useEffect } from 'react';
import { Minus, Square, X } from 'lucide-react';

const Window = ({ 
  id, 
  title, 
  children, 
  onClose, 
  onMinimize, 
  onMaximize, 
  onFocus,
  isMaximized = false,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 800, height: 600 }
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && !isMaximized) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isMaximized]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-control')) return;
    
    onFocus(id);
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const windowStyle = isMaximized 
    ? { top: 0, left: 0, width: '100%', height: 'calc(100vh - 60px)' }
    : { 
        left: position.x, 
        top: position.y, 
        width: size.width, 
        height: size.height 
      };

  return (
    <div
      ref={windowRef}
      className={`flyos-window ${isMaximized ? 'maximized' : ''}`}
      style={windowStyle}
      onClick={() => onFocus(id)}
    >
      {/* Window Header */}
      <div 
        className="flyos-window-header"
        onMouseDown={handleMouseDown}
      >
        <div className="font-semibold">{title}</div>
        <div className="flex items-center gap-2">
          <button
            className="window-control w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center hover:bg-yellow-400 transition-colors"
            onClick={() => onMinimize(id)}
          >
            <Minus size={12} className="text-yellow-900" />
          </button>
          <button
            className="window-control w-6 h-6 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-400 transition-colors"
            onClick={() => onMaximize(id)}
          >
            <Square size={10} className="text-green-900" />
          </button>
          <button
            className="window-control w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-400 transition-colors"
            onClick={() => onClose(id)}
          >
            <X size={12} className="text-red-900" />
          </button>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="flex-1 overflow-hidden bg-white">
        {children}
      </div>
    </div>
  );
};

export default Window;

