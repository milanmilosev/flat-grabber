import { connect, connection } from 'mongoose';

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}?retryWrites=true`;

function getDb() {
  // connect to the Atlas cloud DB
  connect(MONGODB_URI, { useNewUrlParser: true });
  connection.on("error", console.error.bind(console, "db connection error"));
  connection.once("open", function() {
    console.log("connected to db");
  });
}

module.exports = getDb;
