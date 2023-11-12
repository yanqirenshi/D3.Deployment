import React from 'react';

import Box from '@mui/material/Box';
import S from '@mui/material/Typography';

export default function Views () {

    return (
        <Box sx={{mt:3}}>
          <Box>
            <S variant="h5">関係の種類</S>
          </Box>

          <Box sx={{mt: 8}}>
            <S variant="h5">結線の種類</S>
          </Box>
        </Box>
    );
}
