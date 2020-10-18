import React, { useState, useEffect } from 'react';

import D3Deployment from '../js/D3Deployment.js';

import NODE_DATA from '../data/NODE_DATA.js';
import EDGE_DATA from '../data/EDGE_DATA.js';

function DeploymentGraph (props) {
    const [d3deployment] = useState(new D3Deployment().init({
        svg: {
            selector: '#deployment-graph',
        },
    }));

    useEffect(() => {
        d3deployment.focus();
        d3deployment.data({
            nodes: NODE_DATA,
            edges: EDGE_DATA,
        });
    });

    const style = {
        root: {
            background: '#f3f3f3',
            height: '100%',
            width: '100%',
        },
    };

    return (
        <>
          <div style={style.root}>
            <svg id='deployment-graph' />
          </div>
        </>
    );
}

export default DeploymentGraph;
