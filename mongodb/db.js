'use strict';

import mongoose from 'mongoose';
import config from 'config-lite';

mongoose.Promise = global.Promise;

// Mongoose数据库连接
(async function connectMongoose() {
  try{
    const db = await mongoose.connect(config.url, {
      useMongoClient: true
    });
    console.log('连接数据库成功');
    db.on('error', (err) => {
      console.error(`Error in MongoDB connection: ${err}`);
      mongoose.disconnect();
    });

    db.on('close', () => {
      console.log('数据库断开，重新连接数据库');
      mongoose.connect(config.url, {
        server: {
          auto_reconnect: true
        }
      });
    });
  }catch(err){
    console.log(`Error in MongoDB connection: ${err}`);
  }
}())

// mongoose.connect(config.url, {
//   server: {
//     auto_reconnect: true
//   }
// });


// 通过mongoose.connection来获取当前连接的数据库
// const db = mongoose.connection;

// db.once('open', () => {
//   console.log('连接数据库成功');
// });

// db.on('error', (err) => {
//   console.error(`Error in MongoDB connection: ${err}`);
//   mongoose.disconnect();
// });

// db.on('close', () => {
//   console.log('数据库断开，重新连接数据库');
//   mongoose.connect(config.url, {
//     server: {
//       auto_reconnect: true
//     }
//   });
// });

// export default db;