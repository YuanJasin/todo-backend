const todoOperate = require('../db/dataOperate')

// 获取事务列表
const getTodos = async (req,res) => {
    try {
        const todos = await todoOperate.getTodos();
         todos.map(item => {
            item.completed = item.completed === 1;
        })
        res.json({data:todos,code:200});
    } catch (error) {
        res.status(500).json({error: error,success: false});
    }
}

// 创建事务项
const createTodo = async(req,res) => {
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
        const data = req.body;
        await todoOperate.updateTodoById(id,data);
        res.status(201).json({success:true,code:200});
    }catch (error) {
        res.status(500).json({error: error,success: false});
    }
}

// 修改事务日程
const changeSchedule = async (req,res) => {
    try {
        const {fromId,targetId} = req.body;
        const fromResult = await todoOperate.getItemById(fromId)
        const targetResult = await todoOperate.getItemById(targetId)

        const fromDescription = fromResult[0].description;
        const fromLockTime = fromResult[0].locktime;
        const targetDescription = targetResult[0].description;
        const targetLockTime = targetResult[0].locktime;

        await todoOperate.updateSchedule(fromDescription,fromLockTime,targetId)
        await todoOperate.updateSchedule(targetDescription,targetLockTime,fromId)

        const todos = await todoOperate.getTodos();
        todos.map(item => {
            item.completed = item.completed === 1;
        })
        res.status(201).json({data:todos,success:true,code:200});
    } catch (error){
        res.status(500).json({error: error,success: false});
    }
}

module.exports = {getTodos,createTodo,updateTodo,changeSchedule}