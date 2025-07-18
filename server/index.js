const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const FormData = require('form-data');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const dataFile = path.join(__dirname, 'clocks.json');
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const uniqueName = req.body.uniqueName?.replace(/[^a-zA-Z0-9_-]/g, '') || 'clock';
    const ext = path.extname(file.originalname);
    const safeFileName = `${uniqueName}_${Date.now()}${ext}`;
    cb(null, safeFileName);
  }
});

const upload = multer({ storage });

let clocks = fs.existsSync(dataFile) ? JSON.parse(fs.readFileSync(dataFile)) : {};

const REMOVE_BG_API_KEY = 'YOUR_REMOVE_BG_API_KEY'; // 🔁 Replace this with your actual API key

app.post('/api/clock', upload.single('photo'), async (req, res) => {
  const { name, uniqueName } = req.body;

  if (clocks[uniqueName]) {
    return res.status(400).json({ error: 'Unique name already exists' });
  }

  const uploadedPath = req.file.path;
  const ext = path.extname(req.file.originalname);
  const transparentFileName = `${uniqueName}_${Date.now()}${ext}`;
  const transparentFilePath = path.join(uploadsDir, transparentFileName);

  try {
    const formData = new FormData();
    formData.append('image_file', fs.createReadStream(uploadedPath));
    formData.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      body: formData,
      headers: {
        'X-Api-Key': 'd2ohpFsrSwcjRmgAZo9zeQys',
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: 'Remove.bg failed', details: errorText });
    }

    const buffer = await response.buffer();

    // Save the transparent image
    fs.writeFileSync(transparentFilePath, buffer);

    // Delete original uploaded image
    fs.unlinkSync(uploadedPath);

    const photoUrl = `/uploads/${transparentFileName}`;
    clocks[uniqueName] = { name, photoUrl };
    fs.writeFileSync(dataFile, JSON.stringify(clocks, null, 2));

    res.json({ link: `/clock/${uniqueName}` });

  } catch (err) {
    console.error('Background removal error:', err);
    res.status(500).json({ error: 'Failed to process image' });
  }
});

app.get('/api/clock/:uniqueName', (req, res) => {
  const data = clocks[req.params.uniqueName];
  if (!data) return res.status(404).json({ error: 'Clock not found' });
  res.json(data);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
