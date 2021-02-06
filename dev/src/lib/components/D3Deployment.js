import React, { useState, useEffect } from 'react';

import Measure from "react-measure";

import {Camera} from '@yanqirenshi/assh0le';

import Core from '../js/Core.js';

export {Camera}

const svgid = `D3Deployment-${Math.floor(Math.random() * Math.floor(88888888))}`;

export default function D3Deployment (props) {
    const [core] = useState(new Core({
        selector: '#' + svgid,
        camera: props.camera,
    }));

    useEffect(() => core.focus(), [core]);
    useEffect(() => core.data(props.source));

    return (
        <Measure bounds onResize={(cr) => core.bounds({ ...cr.bounds})}>
          {({ measureRef }) => {
              return <div ref={measureRef}
                          className="grid-inner"
                          style={{width:'100%', height: '100%'}}>
                       <svg id={svgid}>
                       </svg>
                     </div>;
          }}
        </Measure>
    );
}
