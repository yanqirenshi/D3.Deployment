import React from 'react';

import Box from '@mui/material/Box';
import S from '@mui/material/Typography';

export default function SectionDataModel () {
    return (
        <Box>
          <S variant="h4">Data Model</S>

          <Box>
            <pre>{DATA_MODEL.join('\n')}</pre>
          </Box>

          <Box sx={{mt:1}}>
            <S variant="h5">ENTITIES</S>
          </Box>

          <Box sx={{mt:1}}>
            <S variant="h5">COLUMNS</S>
          </Box>

          <Box sx={{mt:1}}>
            <S variant="h5">COLUMN_INSTANCES</S>
          </Box>

          <Box sx={{mt:1}}>
            <S variant="h5">RELASHONSHIPS</S>
          </Box>

          <Box sx={{mt:1}}>
            <S variant="h5">PORTS</S>
          </Box>

        </Box>
    );
}

const DATA_MODEL = [
    '      +----------------------+',
    '      | ENTITY          | RS |',
    '      |======================|                             +------------------------+',
    '      | code | physical_name |                             | RELASHONSHIPS    | HDR |',
    '      |      | logical_name  |                             |========================|',
    '      |      | description   |                             | R-CODE | physical_name |',
    '      |      | position      |                             |        | logical_name  |',
    '      |      | size          |                             |        | description   |',
    '      +----------------------+                             +------------------------+',
    '         |                                                     |',
    '         |    +-------------------------------------+          |     +-------------------------------------------------+',
    '         |    | SETTING ENITIY                 | EV |---+      |     | RELASHONSHIPS                             | DTL |',
    '         |    |=====================================|   |      |     |=================================================|',
    '         |    | Setting Enitiy Code | physical_name |   |      `---->| R-CODE                     | degree (From)      |',
    '     +---|--->| Entitiy Code        | logical_name  |   +----------->| Setting Enitiy Code (From) | cardinality (From) |',
    '     |   `--->| Column Code         | data_type     |   `----------->| Setting Enitiy Code (To)   | optionality (From) |',
    '     |        |                     | column_type   |                |                            | degree (To)        |',
    '     |        |                     | description   |                |                            | cardinality (To)   |',
    '     |        +-------------------------------------+                |                            | optionality (To)   |',
    '     |                                                               +-------------------------------------------------+',
    '     |',
    '  +----------------------+',
    '  | COLUMNS         | RS |',
    '  |======================|',
    '  | code | physical_name |',
    '  |      | logical_name  |',
    '  |      | data_type     |',
    '  +----------------------+',
];
