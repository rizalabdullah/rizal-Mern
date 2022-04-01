require(`dotenv`).config();
const { MongoClient } = require('mongodb');
//user:pwd mongodb
const url = process.env.MONGO_URL;
const client = new MongoClient(url);

(async () => {
   try{
    await client.connect();
    console.log('koneksi ke mongodb berhasil');
   }
   catch(e){
    console.log(e);
   }
})();

const db = client.db(`mongodb-native`);

module.exports = db;