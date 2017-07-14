'use strict';

module.exports = {
  port: 3333,
  url: 'mongodb://localhost:27017/kkclblog',
  session: {
    name: 'skey',
    secret: 'kkcl',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 30 * 60 * 1000
    }
  },
  qiniu: {
    imgBaseUrl: 'http://osvd56ijz.bkt.clouddn.com/',
    bucket: 'kk-rsc',
    ACCESS_KEY: 'GIRVJtDWRe81TYXHXX3ilw1veszImM6Bt8GrUt5r',
    SECRET_KEY: 'Fl91Sv4KWw8ndsd9T1ekgHt-lGIb-MfpgtuWpi5N'
  },
  adminers: [{
      name: 'kk',
      password: '123456'
    },
    {
      name: 'cl',
      password: '123456'
    }
  ]
}