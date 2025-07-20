import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server on port ${PORT}`));
  })
  .catch(console.error);
