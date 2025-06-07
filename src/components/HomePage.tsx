import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BursaryFormPage from './BursaryFormPage';
import EditBursaryPage from './EditBursaryPage';

const HomePage: React.FC = () => {
  const [mode, setMode] = useState<'home' | 'create' | 'view'>('home');
  const [awards, setAwards] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch awards from API
  const fetchAwards = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/bursaries');
      if (!res.ok) throw new Error('Failed to fetch awards');
      const data = await res.json();
      setAwards(data);
    } catch (e: any) {
      setError(e.message || 'Error fetching awards');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (mode === 'view') fetchAwards();
  }, [mode]);

  // Filter awards by search
  const filteredAwards = awards.filter(a =>
    a.awardName.toLowerCase().includes(search.toLowerCase()) ||
    a.adminUser.toLowerCase().includes(search.toLowerCase()) ||
    String(a.id).includes(search)
  );

  if (mode === 'create') {
    return (
      <Box>
        <Button onClick={() => setMode('home')} sx={{ mb: 2 }}>&larr; Back to Home</Button>
        <BursaryFormPage />
      </Box>
    );
  }

  if (mode === 'view') {
    return (
      <Box>
        <Button onClick={() => setMode('home')} sx={{ mb: 2 }}>&larr; Back to Home</Button>
        <Typography variant="h5" mb={2}>Existing Bursary Awards</Typography>
        <TextField
          label="Search by name, id, or admin user"
          value={search}
          onChange={e => setSearch(e.target.value)}
          sx={{ mb: 2, minWidth: 300 }}
        />
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Admin User</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAwards.map(a => (
                <TableRow key={a.id} hover style={{ cursor: 'pointer' }} onClick={() => setEditId(a.id)}>
                  <TableCell>{a.id}</TableCell>
                  <TableCell>{a.awardName}</TableCell>
                  <TableCell>{a.adminUser}</TableCell>
                </TableRow>
              ))}
              {filteredAwards.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={3} align="center">No awards found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {editId !== null && (
          <EditBursaryPage bursaryId={editId} onBack={() => { setEditId(null); fetchAwards(); }} />
        )}
      </Box>
    );
  }

  // Home screen
  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 8, textAlign: 'center' }}>
      <Typography variant="h4" mb={4}>Bursary Awards</Typography>
      <Button variant="contained" color="primary" sx={{ mb: 3, width: 250 }} onClick={() => setMode('create')}>
        Create New Award
      </Button>
      <br />
      <Button variant="outlined" color="primary" sx={{ width: 250 }} onClick={() => setMode('view')}>
        View Existing Awards
      </Button>
    </Box>
  );
};

export default HomePage;
