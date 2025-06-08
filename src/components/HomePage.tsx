import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" mb={4}>Bursary Awards</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 3, width: 250 }} component={Link} to="/create">
        Create New Award
      </Button>
      <br />
      <Button variant="outlined" color="primary" sx={{ width: 250 }} component={Link} to="/search">
        View Existing Awards
      </Button>
    </Box>
  );
};

export default HomePage;
