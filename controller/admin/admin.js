'use strict';

// import ArticleModel from '../../models/article/article';
import BaseComponent from '../../prototype/baseComponent';
import crypto from 'crypto';
import formidable from 'formidable';
import config from 'config-lite';
class Admin {
  constructor(){
    // babel转换es6有问题,必须给checkLogin绑定this，才可以在checkLogin中使用其他实例方法
    this.checkLogin = this.checkLogin.bind(this);
  }
  /**
   *获取管理员信息
   *
   * @param {any} uname - 管理员名
   * @param {any} pass - 管理员密码
   * @returns {object} 指定管理员信息
   */
  findAdminer(uname, pass) {
    const adminers = config.adminers;
    return adminers.find((value, index) => {
      return uname === value.name && pass === value.password;
    });
  }

  /**
   * @api {POST} /api/login
   * @apiPermission Adminer
   * @apiVersion 1.0.0
   * @apiName 登录验证
   */
  checkLogin(req, res) {
    const ses = req.session;
    const uname = req.body.uname;
    const adminer = this.findAdminer(uname, req.body.password);
    if (adminer) {
      ses.regenerate(err => {
        if (err) {
          return res.json({
            code: 1,
            msg: '登录失败'
          });
        }
        req.session.adminer = uname;
        return res.json({
          code: 0,
          msg: '登录成功'
        });
      });
    } else {
      return res.json({
        code: 2,
        msg: '账号或密码不正确'
      });
    }
  }
}

export default new Admin();