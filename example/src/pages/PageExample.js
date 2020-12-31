import React, { useState } from 'react';
import {Button} from 'react-bulma-components';

import D3Deployment, {Camera} from './components/D3Deployment.js';

import Head from './Head.js';
import style from './Style.js';

import NODE_DATA from '../data/NODE_DATA.js';
import EDGE_DATA from '../data/EDGE_DATA.js';

function PageExample () {
    const [camera] = useState(new Camera({
        look: {
            at: {x:400, y:100},
            scale: 1,
        },
    }));

    const graph_data = {
        nodes: NODE_DATA,
        edges: EDGE_DATA,
    };

    const click = (e) => {
        const action = e.target.getAttribute('action');
        if (action==='up')         camera.move({y: -100}).focus();
        else if (action==='down')  camera.move({y:  100}).focus();
        else if (action==='left')  camera.move({x: -100}).focus();
        else if (action==='right') camera.move({x:  100}).focus();
        else if (action==='z+')    camera.zoom(+1).focus();
        else if (action==='z-')    camera.zoom(-1).focus();
    };

    return (
        <div style={style.root}>
          <Head />

          <div style={style.graph_area}>
            <D3Deployment source={graph_data} camera={camera} />
          </div>

          <div>
            <Button action="up"    onClick={click}>Up</Button>
            <Button action="down"  onClick={click}>Down</Button>
            <Button action="left"  onClick={click}>Left</Button>
            <Button action="right" onClick={click}>Right</Button>
            <Button action="z+"    onClick={click}>Zoom(+)</Button>
            <Button action="z-"    onClick={click}>Zoom(-)</Button>
          </div>
        </div>
    );
}

export default PageExample;
