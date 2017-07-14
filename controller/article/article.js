'use strict';

import ArticleModel from '../../models/article/article';
import BaseComponent from '../../prototype/baseComponent';

class Article extends BaseComponent {
  constructor() {
    super();
  }
  /**
   * @api {POST} /api/articles
   * @apiPermission Adminer
   * @apiVersion 1.0.0
   * @apiName 发表文章
   */
  async addArticle(req, res) {
    const {
      article
    } = req.body;
    try {
      const ret = await ArticleModel.insertArticle(article);
      if (ret) {
        return res.json({
          code: 0,
          msg: '恭喜亲，文章发表成功!'
        });
      }
    } catch (err) {
      return res.json({
        code: 1,
        msg: '亲，服务器睡熟了，再提交一次把！'
      });
    }
  }

  /**
   * @api {GET} /api/articles
   * @apiPermission Adminer
   * @apiVersion 1.0.0
   * @apiName 获取文章列表
   * @apiStatement query:{groupName: typeName}  根据类名获取分类文章
   * @apiStatement query:{status: 'publish'/'draft'}  根据状态不同获取不同的文章列表
   * @apiStatement query:{articleId: ObjectId }  根据ObjectId来获取具体的文章
   */
  async getArticle(req, res) {
    const {
      groupName,
      status,
      articleId
    } = req.query;
    if (groupName === 'typeName') {
      try {
        const ret = await ArticleModel.groupArticlesByTypename();
        return res.json({
          code: 0,
          data: ret
        });
      } catch (err) {
        return res.json({
          code: 1,
          msg: '亲，服务器睡着了，再叫醒他一次吧！'
        });
      }
    } else if (status) {
      try {
        const ret = await ArticleModel.findArticlesByStatusInDesc(status);
        return res.json({
          code: 0,
          data: ret
        });
      } catch (err) {
        return res.json({
          code: 1,
          msg: '亲，服务器睡着了，再叫醒他一次吧！'
        });
      }
    } else if (articleId) {
      try {
        const ret = await ArticleModel.findArticleById(articleId);
        return res.json({
          code: 0,
          data: ret
        });
      } catch (err) {
        return res.json({
          code: 1,
          msg: '亲，服务器睡着了，再叫醒他一次吧！'
        });
      }
    }
  }

  /**
   * @api {PUT} /api/articles
   * @apiPermission Adminer
   * @apiVersion 1.0.0
   * @apiName 根据id更新文章
   */
  async updateArticle(req, res) {
    const {
      articleId
    } = req.query;
    const newArticle = req.body.article;
    try {
      if (articleId) {
        const ret = await ArticleModel.updateArticleById(articleId, newArticle);
        if (ret.ok === 1) {
          return res.json({
            code: 0,
            msg: '文章更新成功，赞！'
          });
        } else {
          throw new Error();
        }
      }
    } catch (err) {
      return res.json({
        code: 1,
        msg: '文章更新失败，再来一次可能就好了！'
      });
    }
  }

  /**
   * @api {DELETE} /api/articles
   * @apiPermission Adminer
   * @apiVersion 1.0.0
   * @apiName 根据id删除文章
   */
  async deleteArticle(req, res) {
    const {
      articleId
    } = req.query;
    try {
      if (articleId) {
        const ret = await ArticleModel.removeArticleById(articleId);
        console.log(ret);
        if (ret.result.ok === 1) {
          return res.json({
            code: 0,
            msg: '文章删除成功，赞！'
          });
        } else {
          throw new Error();
        }
      }
    } catch (err) {
      return res.json({
        code: 1,
        msg: '文章删除失败，再来一次可能就好了！'
      });
    }
  }
}

export default new Article();