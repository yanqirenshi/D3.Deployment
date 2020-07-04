import React, { useState, useEffect } from 'react';

import D3Deployment from '../js/D3Deployment.js';

import NODE_DATA from '../data/NODE_DATA.js';
import EDGE_DATA from '../data/EDGE_DATA.js';

let last_effect = null;


function DeploymentGraph (props) {
    const [d3deployment] = useState(new D3Deployment());

    useEffect(() => {
        if(!last_effect)
            d3deployment.init({
                svg: {
                    selector: '#deployment-graph',
                    w: 1024,
                    h: 333,
                },
            });

        d3deployment.data({
            nodes: NODE_DATA,
            edges: EDGE_DATA,
        });

        last_effect = new Date();
    });

    const style = {
        root: {
            background: '#f3f3f3',
            width: '100%',
            height: '333px',
        },
        operators: {
            marginTop: '11px',
        },
    };

    return (
        <>
          <div style={style.root}>
            <svg id='deployment-graph'
                 width='1024px'
                 height='333px' />

          </div>
          <div style={style.operators}>
          </div>
        </>
    );
}

export default DeploymentGraph;
