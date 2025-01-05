const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController')

/* 代办事务列表接口 */
router.get('/todos',todoController.getTodos )

/* 创建代办事务接口 */
router.post('/todo',todoController.createTodo)

/* 更新代办事务信息 */
router.post('/todo/:id',todoController.updateTodo)

/* 修改日程 */
router.post('/schedule',todoController.changeSchedule)


module.exports = router;