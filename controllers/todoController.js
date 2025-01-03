const todoOperate = require('../db/dataOperate')

// 获取事务列表
const getTodos = async (req,res) => {
    try {
        const todos = await todoOperate.getTodos();
         todos.map(item => {
            if (item.completed === 1) {
                item.completed = true;
            }else {
                item.completed = false;
            }
        })
        res.json({data:todos,code:200});
    } catch (error) {
        res.status(500).json({error: error,success: false});
    }
}

// 创建事务项
const createTodo = async(req,res) => {
    console.log('Headers:', req.headers); // 打印请求头
    console.log('Body:', req.body); // 打印请求体
    try {
        let { completed, description, lockTime } = req.body;
        if (description.length > 0 && lockTime > 0) {
            const id = await todoOperate.createTodo({ completed, description, lockTime });
            res.status(201).json({success: true,code:200});
        }else {
            res.status(500).json({success: false,message:"未填写事务描述或计划时间"});
        }
    }catch (error) {
        console.error('Error in createTodo:', error);

        // 返回错误响应，确保 `error` 是字符串或对象
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : JSON.stringify(error),
        });
    }
}

// 更新事务项
const updateTodo = async(req,res) => {
    try{
        const id = req.params.id;
        const { completed, description, lockTime } = req.body;
        await todoOperate.updateTodoById(id,{completed,description,lockTime});
        res.status(201).json({success:true});
    }catch (error) {
        res.status(500).json({error: error,success: false});
    }
}

// 修改事务日程
const changeSchedule = async(req,res) => {

}

module.exports = {getTodos,createTodo,updateTodo}