import React from 'react';

import Box from '@mui/material/Box';
import S from '@mui/material/Typography';

export default function SectionObjectModel () {
    return (
        <Box>
          <S variant="h4">Object Model</S>

          <Box>
            <pre>{MODEL.join('\n')}</pre>
          </Box>

          <Box sx={{mt:1}}>
            <S variant="h5">?</S>
          </Box>

        </Box>
    );
}

const MODEL = [
    '  +------------------+      +------------------+     +------------------+     +------------------+',
    '  | COLUMNS          |      | COLUMN_INSTANCES |     | ENTITIES         |     | PORT             |',
    '  |==================|      |==================|     |==================|     |==================|',
    '  |- _id             |      |- _id             |     |- _id             |     | _id              |',
    '  |- _class          |      |- _class          |     |- _class          |     | _class           |',
    '  |+ code            |      |+ code            |     |+ code            |     | degree           |',
    '  |+ name            |      |+ physical_name   |     |+ name            |     | cardinality      |',
    '  |+ data_type       |      |+ logical_name    |     |+ description     |     | optionality      |',
    '  |------------------|      |+ data_type       |     |+ position        |     |------------------|',
    '  +------------------+      |+ column_type     |     |+ size            |     +------------------+',
    '                            |+ description     |     |------------------|',
    '                            |------------------|     +------------------+',
    '                            +------------------+',
    '',
    '  +---------------+',
    '  | RELASHONSHIPS |',
    '  |===============|',
    '  |- _id          |           | COLUMN               from: PORT-ER-OUT,     to: PORT-ER-IN,      data_type: FK,',
    '  |- _class       |           | COLUMN-INSTANCE      from: COLUMN-INSTANCE, to: PORT-ER-IN,      data_type: HAVE,',
    '  |  from_id      |           | PORT-ER-IN           from: COLUMN-INSTANCE, to: PORT-ER-OUT,     data_type: HAVE,',
    '  |  from_class   |----+----> | PORT-ER-OUT          from: TABLE,           to: COLUMN-INSTANCE, data_type: HAVE,',
    '  |  to_id        |    |      | TABLE                from: COLUMN,          to: COLUMN-INSTANCE, data_type: INSTANCE-OF,',
    '  |  to_class     |----+',
    '  |  data_type    |---------> | FK',
    '  |  hide: false  |           | HAVE',
    '  |---------------|           | INSTANCE-OF',
    '  +---------------+',
];
