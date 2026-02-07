import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema(
  {
    asteroidId: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxLength: 2000,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: false }
);

// Index for fetching recent messages for an asteroid
ChatSchema.index({ asteroidId: 1, createdAt: -1 });

// Remove old messages after 30 days (optional TTL)
ChatSchema.index({ createdAt: 1 }, { expireAfterSeconds: 2592000 });

export default mongoose.model('Chat', ChatSchema);
