// src/app/components/NameGrid.tsx

import React from 'react';

interface NameGridProps {
    items: { name: string; number: number }[];
}

const NameGrid: React.FC<NameGridProps> = ({ items }) => {
    return (
        <div className="name-grid">
            {items.map((item, index) => (
                <div key={index} className="name-box">
                    {item.name}<br />{item.number}
                </div>
            ))}
        </div>
    );
};

export default NameGrid;