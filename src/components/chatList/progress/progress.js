import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

function CircProgress() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <CircularProgress />
      <Typography variant="subtitle2" gutterBottom>
        Try to find some messages...
      </Typography>
    </div>
  );
}

export default CircProgress;
