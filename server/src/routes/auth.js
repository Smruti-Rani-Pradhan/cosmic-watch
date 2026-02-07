import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

const sendTokenResponse = (user, statusCode, res) => {
  const payload = { user: { id: user.id, role: user.role } };
  
  const token = jwt.sign(
    payload, 
    process.env.JWT_SECRET, 
    { expiresIn: '24h' }
  );

  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), 
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict' 
  };

  res
    .status(statusCode)
    .cookie('token', token, options) 
    .json({ success: true, user: { id: user.id, username: user.username, role: user.role, watchlist: user.watchlist } });
};

router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, email, password, role });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token'); 
  res.json({ msg: 'Logged out successfully' });
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = req.user
    const userId = req.user.id;
    const dbUser = await User.findById(userId).select('-password');
    if(!dbUser){
        return res.status(404).json({ msg: 'User not found' });
    }
    res.json(dbUser);
    
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;