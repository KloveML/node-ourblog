'use strict';

import express from 'express';
import Admin from '../controller/admin/admin';

const router = express.Router();

// 登录
router.post('/admin/login', Admin.checkLogin);

export default router;
