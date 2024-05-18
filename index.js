import app from './app';
import db from './app/models';
import dotenv from 'dotenv';

dotenv.config();

const port = 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const url = `mongodb+srv://${process.env.USERNAME_MONGODB}:${process.env.PASSWORD_MONGODB}@${process.env.CLUSTER_MONGODB}.obqrznz.mongodb.net/${process.env.CLUSTER_MONGODB}`;

db.mongoose
  .connect(url)
  .then(() => {
    console.log('Successfully connect to MongoDB.');
    initial();
  })
  .catch((err) => {
    console.error('Connection error', err);
    process.exit();
  });

function initial() {
  db.role.estimatedDocumentCount()
    .then((count) => {
      if (count === 0) {
        new db.role({ name: 'admin' })
          .save()
          .then(() => console.log("added 'admin' to roles collection"))
          .catch((err) => console.log('error', err));
      }
    })
    .catch((err) => console.log(err));
}
