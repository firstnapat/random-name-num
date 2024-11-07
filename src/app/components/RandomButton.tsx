// src/app/components/RandomButton.tsx

import React from 'react';

interface RandomButtonProps {
    onClick: () => void;
    isLoading: boolean;
}

const RandomButton: React.FC<RandomButtonProps> = ({ onClick, isLoading }) => {
    return (
        <button onClick={onClick} disabled={isLoading}>
            {isLoading ? "Loading..." : "Randomize"}
        </button>
    );
};

export default RandomButton;