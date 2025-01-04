import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

/**
 * Compare entered password with hashed password in the database.
 * @param {string} passw - The entered password.
 * @returns {Promise<boolean>} - Returns true if passwords match, else false.
 */
UserSchema.methods.comparePassword = async function (passw) { 
  return await bcrypt.compare(passw, this.password); 
}

/**
 * Hash the password before saving the user.
 */
UserSchema.pre('save', async function(next) {
  const saltRounds = 10; // You can adjust the number of salt rounds as needed
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.model('User', UserSchema);