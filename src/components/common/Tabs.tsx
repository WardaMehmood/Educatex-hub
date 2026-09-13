import React from 'react';

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = ''
}) => {
  return (
    <div className={`tabs-nav ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
          type="button"
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span style={{
                fontSize: '11px',
                padding: '1px 6px',
                borderRadius: '10px',
                backgroundColor: activeTab === tab.id ? 'var(--color-mint-bg)' : '#F5F5F4',
                color: activeTab === tab.id ? 'var(--color-primary-emerald)' : 'var(--color-text-muted)'
              }}>
                {tab.count}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
};
