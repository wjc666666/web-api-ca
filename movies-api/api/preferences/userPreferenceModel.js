import mongoose from 'mongoose';

const userPreferenceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  preferredGenres: [{ type: String }],
  preferredLanguage: { type: String },
  // 你可以根据需要添加更多偏好设置字段
});

const UserPreference = mongoose.model('UserPreference', userPreferenceSchema);
export default UserPreference;