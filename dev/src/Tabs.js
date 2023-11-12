import React from 'react';

import MaterialTabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Tabs (props) {
    const tabs = props.tabs;
    const onChange = props.onChange;

    const handleChange = (event, newValue) => {
        const new_tabs = {...tabs};
        new_tabs.selected = newValue;
        onChange(new_tabs);
    };

    return (
        <MaterialTabs value={tabs.selected}
                      onChange={handleChange}
                      centered>
          {tabs.list.map(tab=> {
              return (
                  <Tab value={tab.code}
                       label={tab.label}/>
              );
          })}
        </MaterialTabs>
    );
}
