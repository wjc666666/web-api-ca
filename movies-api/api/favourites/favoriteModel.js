import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  movieId: { type: Number, required: true },
  title: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;