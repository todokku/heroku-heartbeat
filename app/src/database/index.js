import mongoose from 'mongoose';

export default {
  disconnect: () => mongoose.connection.close(),
  connect: () => mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }),
};
