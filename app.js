'use strict';

import express from 'express';
import config from 'config-lite';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import './mongodb/db.js';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import winston from 'winston';
import expressWinston from 'express-winston';
import history from 'connect-history-api-fallback';
import routes from './routes';

const app = express();
const MongoStore = connectMongo(session);
const sessionConfig = config.session;
sessionConfig.store = new MongoStore({
  url: config.url
});

// 对跨域请求进行响应头处理
app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
});

// 配置静态资源目录
app.use(express.static('./public'));
// 压缩响应资源
app.use(compression());
// 对Body部分进行解码
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
// 设置session
app.use(session(sessionConfig));

// 给之后的路由打日志
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)({
          json: true,
          colorize: true
        }),
        new winston.transports.File({
          filename: 'logs/success.log'
        })
    ]
}));

// 路由
routes(app);

// 错误信息打日志
app.use(expressWinston.errorLogger({
    transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        }),
        new winston.transports.File({
          filename: 'logs/error.log'
        })
    ]
}));

//
app.use(history());
// 错误处理
app.use((err, req, res, next)=> {
  res.status(404).send('未找到当前路由');
})

app.listen(config.port, function () {
  console.log(`server is starting at port ${config.port}!`);
});
