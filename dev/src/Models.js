import React from 'react';

import Box from '@mui/material/Box';
import S from '@mui/material/Typography';

import SectionObjectModel from './SectionObjectModel.js';
import SectionDataModel from './SectionDataModel.js';

export default function Models () {
    return (
        <Box sx={{mt:3}}>
          <Box sx={{mt:6}}>
            <S variant="h5">Object Model</S>
            <SectionObjectModel/>
          </Box>

          <Box sx={{mt:6}}>
            <S variant="h5">Data Model</S>
            <SectionDataModel/>
          </Box>
        </Box>
    );
}
