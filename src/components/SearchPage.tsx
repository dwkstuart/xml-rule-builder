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
import { useNavigate } from 'react-router-dom';

interface Award {
  id: number;
  awardName: string;
  adminUser: string;
  xmlString: string;
}

const ROWS_PER_PAGE = 10;

const SearchPage: React.FC = () => {
  const [awards, setAwards] = useState<Award[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  // Fetch awards from API
  const fetchAwards = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/bursaries');
      if (!res.ok) throw new Error('Failed to fetch awards');
      const data: Award[] = await res.json();
      setAwards(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error fetching awards');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  // Filter awards by search
  const filteredAwards = awards.filter(a =>
    a.awardName.toLowerCase().includes(search.toLowerCase()) ||
    a.adminUser.toLowerCase().includes(search.toLowerCase()) ||
    String(a.id).includes(search)
  );

  // Pagination logic
  const pageCount = Math.ceil(filteredAwards.length / ROWS_PER_PAGE);
  const paginatedAwards = filteredAwards.slice(page * ROWS_PER_PAGE, (page + 1) * ROWS_PER_PAGE);

  // Reset to first page on search change
  useEffect(() => {
    setPage(0);
  }, [search]);

  return (
    <Box>
      <Button onClick={() => navigate('/')} sx={{ mb: 2 }}>&larr; Back to Home</Button>
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
            {paginatedAwards.map(a => (
              <TableRow key={a.id} hover style={{ cursor: 'pointer' }} onClick={() => navigate(`/edit/${a.id}`)}>
                <TableCell>{a.id}</TableCell>
                <TableCell>{a.awardName}</TableCell>
                <TableCell>{a.adminUser}</TableCell>
              </TableRow>
            ))}
            {paginatedAwards.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={3} align="center">No awards found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
        <Button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          sx={{ mr: 2 }}
        >
          Previous
        </Button>
        <Typography>
          Page {page + 1} of {pageCount === 0 ? 1 : pageCount}
        </Typography>
        <Button
          onClick={() => setPage(p => Math.min(pageCount - 1, p + 1))}
          disabled={page >= pageCount - 1}
          sx={{ ml: 2 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default SearchPage;
