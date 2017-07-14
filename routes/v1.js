'use strict';

import express from 'express';
import Article from '../controller/article/article';

const router = express.Router();

// 添加文章 
router.post('/article', Article.addArticle);
// 获取文章
router.get('/article', Article.getArticle);
// 更新文章
router.put('/article', Article.updateArticle);
// 删除文章
router.delete('/article', Article.deleteArticle);

export default router;