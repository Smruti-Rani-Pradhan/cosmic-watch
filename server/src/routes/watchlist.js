import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if(!user){
        return res.status(404).json({ msg: 'User not found' });
    }
    const { asteroidId, name } = req.body;

    if (user.watchlist.some(item => item.asteroidId === asteroidId)) {
      return res.status(400).json({ msg: 'Asteroid already in watchlist' });
    }

    user.watchlist.unshift({ asteroidId, name });
    await user.save();
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if(!user){
        return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if(!user){
        return res.status(404).json({ msg: 'User not found' });
    }
    user.watchlist = user.watchlist.filter(item => item.asteroidId !== req.params.id);
    await user.save();
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;