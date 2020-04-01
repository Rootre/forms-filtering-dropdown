import React from 'react';
import {render} from 'react-dom';

import '@rootre/forms-dropdown/styles.css';

import Component from '../../src';

function App() {
    const items = [
        {label: 'Cat'},
        {label: 'Dog'},
        {label: 'Rabbit'},
        {label: 'Parrot'},
    ];

    return (
        <div>
            <h1>forms-filtering-dropdown component demo</h1>

            <Component
                items={items}
            />
        </div>
    );
}

render(<App/>, document.getElementById('root'));