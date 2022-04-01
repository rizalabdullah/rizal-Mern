const mongoose = require(`mongoose`);

mongoose.connect(`mongodb://rizal:12345@cluster0-shard-00-00.qpqe0.mongodb.net:27017,cluster0-shard-00-01.qpqe0.mongodb.net:27017,cluster0-shard-00-02.qpqe0.mongodb.net:27017/mongoose?ssl=true&replicaSet=atlas-ueqe1o-shard-0&authSource=admin&retryWrites=true&w=majority`);

const db = mongoose.connection;
db.on(`error`, console.error.bind(console, `connection error:`));
db.once(`open`, () => console.log(`server database terhubung`));