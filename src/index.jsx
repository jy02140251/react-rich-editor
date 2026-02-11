import React, { useState, useRef, useEffect } from 'react';

export const useClickOutside = (callback) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [callback]);
  
  return ref;
};

export const Dropdown = ({ trigger, children, position = 'bottom' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useClickOutside(() => setIsOpen(false));
  
  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div style={{
          position: 'absolute',
          [position]: '100%',
          left: 0,
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}>
          {children}
        </div>
      )}
    </div>
  );
};

export const Tabs = ({ tabs, defaultIndex = 0 }) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  
  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '1px solid #ddd' }}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            style={{
              padding: '8px 16px',
              border: 'none',
              background: 'none',
              borderBottom: activeIndex === i ? '2px solid #007bff' : 'none',
              color: activeIndex === i ? '#007bff' : '#666'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={{ padding: '16px' }}>
        {tabs[activeIndex]?.content}
      </div>
    </div>
  );
};

export default { useClickOutside, Dropdown, Tabs };