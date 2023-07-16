import React, { useState, Children } from 'react';
import '../../assets/css/dropdown.css';

const Dropdown = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const [header, content] = Children.toArray(children);

    return (
        <div className="drop-container">
            <div className="header" onClick={handleToggle}>
                {header}
            </div>
            <div className={`content ${isOpen ? 'open' : ''}`}>{content}</div>
        </div>
        
    );
};

export default Dropdown;