import React, { useState } from 'react';

import Tabs         from './Tabs';
import TabContents  from './TabContents';

function Explanation (props) {
    const [selected_tab, setSelectedTab] = useState(0);

    const style = {
        root: {},
    };

    const tabs = [
        { id: 0, label: 'React Componet' },
        { id: 1, label: 'Data: Ndoe' },
        { id: 2, label: 'Data: Edge' },
        { id: 3, label: 'Usage' },
    ];

    const callback = (action, data) => {
        if (action==='click-tab') {
            setSelectedTab(data);
            return;
        };
    };

    return (
        <div style={style.root}>
          <div>
            <Tabs tabs={tabs}
                  selected_tab={selected_tab}
                  callback={callback} />
          </div>

          <div>
            <TabContents selected_tab={selected_tab}
                         graph_data={props.graph_data} />
          </div>
        </div>
    );
}

export default Explanation;
