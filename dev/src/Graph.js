import React, { useState, useEffect } from 'react';

import D3Deployment, { Rectum } from './lib/index.js';

import DATA from './data/DATA.js';

const rectum = new Rectum({
    transform: {
        k: 0.5,
        x: 100.0,
        y: 200.0,
    },
});

const style = {
    width:  800 + (22*2),
    height: 300 + (22*2),
    background: '#eee',
    padding: 22,
    borderRadius: 5,
};

export default function Graph () {
    const [graph_data] = useState(DATA);

    useEffect(()=> rectum.data(graph_data), [graph_data]);

    return (
          <div style={style}>
            <D3Deployment rectum={rectum} />
          </div>
    );
}
