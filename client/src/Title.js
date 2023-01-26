import React from 'react';
import { useEffect } from 'react';

const Title = () => {
    useEffect(() => {
    // import the font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    }, []);
    return (
        <div>
            <h1 className="title">Organizing Cluttered Domiciles</h1>
        </div>
    );
};

export default Title;