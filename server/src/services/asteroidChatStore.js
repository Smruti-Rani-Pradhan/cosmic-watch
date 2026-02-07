import Chat from '../models/Chat.js';

// Fetch recent messages for an asteroid (last 100 messages)
async function getMessages(asteroidId, limit = 100) {
  try {
    const messages = await Chat.find({ asteroidId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    
    // Return messages in chronological order (oldest first)
    return messages.reverse();
  } catch (err) {
    console.error('Error fetching messages:', err);
    return [];
  }
}

// Add a new message to the database
async function addMessage(asteroidId, { userId, userName, text }) {
  try {
    const msg = new Chat({
      asteroidId,
      userId: userId || null,
      userName: userName || 'Anonymous',
      text: (text || '').trim().slice(0, 2000),
    });
    
    await msg.save();
    
    // Return message as plain object for socket emission
    return {
      id: msg._id.toString(),
      asteroidId: msg.asteroidId,
      userId: msg.userId?.toString() || null,
      userName: msg.userName,
      text: msg.text,
      createdAt: msg.createdAt.toISOString(),
    };
  } catch (err) {
    console.error('Error adding message:', err);
    throw err;
  }
}

export { getMessages, addMessage };
