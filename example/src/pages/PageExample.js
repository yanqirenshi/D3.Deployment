import React from 'react';

// import ExampleData from '../js/ExampleData.js';

import DeploymentGraph from './DeploymentGraph';
// import Explanation  from './Explanation';

function PageExample () {
    const style = {
        root: {
            background: '#ffffff',
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        graph_area: {
            height: 666,
            marginTop: '22px',
            marginBottom: '22px',
        },
        h1: {
            fontSize: '33px',
            fontWeight: 'bold',
            marginTop: '11px',
        },
    };

    return (
        <div style={style.root}>

          <div>
            <h1 style={style.h1}>Example of React</h1>
          </div>

          <div style={style.graph_area}>
            <DeploymentGraph />
          </div>

        </div>
    );
}

export default PageExample;
