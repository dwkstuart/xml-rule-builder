const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4000;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Helper to read and write db.json
function readDb() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}
function writeDb(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// POST /bursaries - create a new bursary
app.post('/bursaries', (req, res) => {
  const { awardName, adminUser, xmlString } = req.body;
  console.log(`[POST /bursaries] Received:`, { awardName, adminUser, xmlStringLength: xmlString ? xmlString.length : 0 });
  if (!awardName || !adminUser || !xmlString) {
    console.warn('[POST /bursaries] Missing required fields');
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const db = readDb();
  const bursaries = db.bursaries || [];
  const newId = bursaries.length > 0 ? Math.max(...bursaries.map(b => b.id)) + 1 : 1;
  const newBursary = { id: newId, awardName, adminUser, xmlString };
  bursaries.push(newBursary);
  db.bursaries = bursaries;
  writeDb(db);
  console.log(`[POST /bursaries] Saved new bursary with id ${newId}`);
  res.json({ id: newId });
});

// GET /bursaries - return all bursaries
app.get('/bursaries', (req, res) => {
  const db = readDb();
  res.json(db.bursaries || []);
});

// PUT /bursaries/:id - update a bursary
app.put('/bursaries/:id', (req, res) => {
  const { id } = req.params;
  const { awardName, adminUser, xmlString } = req.body;
  if (!awardName || !adminUser || !xmlString) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const db = readDb();
  let bursaries = db.bursaries || [];
  const idx = bursaries.findIndex(b => b.id === Number(id));
  if (idx === -1) {
    return res.status(404).json({ error: 'Bursary not found' });
  }
  bursaries[idx] = { ...bursaries[idx], awardName, adminUser, xmlString };
  db.bursaries = bursaries;
  writeDb(db);
  console.log(`[PUT /bursaries/${id}] Updated bursary`);
  res.json({ success: true });
});

app.get('/bursaries/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const bursary = (db.bursaries || []).find(b => b.id === Number(id));
  if (!bursary) {
    return res.status(404).json({ error: 'Bursary not found' });
  }
  res.json(bursary);
});

// --- User registration ---
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  try {
    const db = readDb();
    const users = db.users || [];
    const existing = users.find(user => user.username === username);
    if (existing) {
      return res.status(409).json({ error: 'Username already exists' });
    }
    // Basic hash (not for production!)
    const hash = Buffer.from(password).toString('base64');
    db.users = [...users, { username, password: hash }];
    writeDb(db);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// --- User login ---
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  try {
    const db = readDb();
    const users = db.users || [];
    const hash = Buffer.from(password).toString('base64');
    const user = users.find(user => user.username === username && user.password === hash);
    console.log(`[POST /login] Attempting login for user: ${username}`);  
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ success: true, username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});



app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
