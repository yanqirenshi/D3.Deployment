import React, { useState } from 'react';

import D3Deployment, {Camera} from '@yanqirenshi/d3.deployment';

import NODE_DATA from './data/NODE_DATA.js';
import EDGE_DATA from './data/EDGE_DATA.js';

function App() {
    const [graph_data] = useState({
        nodes: NODE_DATA,
        edges: EDGE_DATA,
    });
    const [camera] = useState(new Camera({
        look: {
            at: {x:350, y:150},
            scale: 1,
        },
    }));

    return (
        <div style={{padding: 22}}>
          <div style={{height:555, border: '1px solid #eee'}}>
            <D3Deployment source={graph_data} camera={camera} />
          </div>
        </div>
    );
}

export default App;
