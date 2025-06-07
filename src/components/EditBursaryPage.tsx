import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import BursaryRuleBuilder from './BursaryRuleBuilder';
import { xmlToRules } from '../utils/xmlToRules'; // import the utility


interface EditBursaryPageProps {
  bursaryId: number;
  onBack: () => void;
}

const EditBursaryPage: React.FC<EditBursaryPageProps> = ({ bursaryId, onBack }) => {
  const [awardName, setAwardName] = useState('');
  const [adminUser, setAdminUser] = useState('');
  const [xmlString, setXmlString] = useState('');
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialRules, setInitialRules] = useState<any>(null);


  // Fetch bursary by id
  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/bursaries`)
      .then(res => res.json())
      .then((bursaries) => {
        const bursary = bursaries.find((b: any) => b.id === bursaryId);
        if (bursary) {
          setAwardName(bursary.awardName);
          setAdminUser(bursary.adminUser);
          setXmlString(bursary.xmlString);
          setInitialRules(xmlToRules(bursary.xmlString));

        } else {
          setFormError('Bursary not found');
        }
        setLoading(false);
      })
      .catch(() => {
        setFormError('Failed to load bursary');
        setLoading(false);
      });
  }, [bursaryId]);

  // Reset state when bursaryId or component unmounts
  useEffect(() => {
    setAwardName('');
    setAdminUser('');
    setXmlString('');
    setFormError('');
    setSubmitted(false);
    setLoading(true);
    setInitialRules(null);
  }, [bursaryId]);

  const handleXmlChange = (xml: string) => {
    setXmlString(xml);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSubmitted(false);
    if (!awardName.trim() || !adminUser.trim() || !xmlString.trim()) {
      setFormError('All fields and rules are required.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:4000/bursaries/${bursaryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ awardName, adminUser, xmlString })
      });
      if (!response.ok) {
        const err = await response.json();
        setFormError(err.error || 'Failed to update bursary.');
        return;
      }
      setSubmitted(true);
    } catch (err) {
      setFormError('Network or server error.');
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, border: '1px solid #eee', borderRadius: 2, background: '#fafafa' }}>
      <Button onClick={onBack} sx={{ mb: 2 }}>&larr; Back</Button>
      <Typography variant="h5" mb={2}>Edit Bursary Award</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Bursary Name"
          value={awardName}
          onChange={e => setAwardName(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Admin User"
          value={adminUser}
          onChange={e => setAdminUser(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Box sx={{ my: 3 }}>
          <BursaryRuleBuilder initialRules={initialRules} onXmlChange={handleXmlChange} />
        </Box>
        {formError && <Typography color="error" sx={{ mb: 2 }}>{formError}</Typography>}
        {submitted && <Typography color="success.main" sx={{ mb: 2 }}>Bursary updated!</Typography>}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save Changes
        </Button>
      </form>
    </Box>
  );
};

export default EditBursaryPage;
