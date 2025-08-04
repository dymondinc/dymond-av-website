import React from 'react';

const Logo = ({ className = "", size = "default" }) => {
  const sizes = {
    small: { width: "120", height: "60" },
    default: { width: "200", height: "100" },
    large: { width: "300", height: "150" }
  };

  const currentSize = sizes[size] || sizes.default;

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Your actual SVG logo */}
      <img 
        src="/dymond_av.svg" 
        alt="Dymond Audio/Visual" 
        width={currentSize.width}
        height={currentSize.height}
        className="mb-2"
        style={{ 
          filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.5))',
          maxWidth: '100%',
          height: 'auto'
        }}
      />
    </div>
  );
};

export default Logo;