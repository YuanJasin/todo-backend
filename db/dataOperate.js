const pool = require('./db');

// TODO数据库操作
class TodoOperate {
    // 获取事务列表
    static async getTodos() {
        let [result] = await pool.query('SELECT * FROM cardInfo');
        return result;
    }

    // 创建事务项
    static async createTodo({completed, description, lockTime}){
        const [result] = await pool.query(
            'INSERT INTO cardInfo (completed, description, lockTime) VALUES (?, ?, ?)',
            [completed, description, lockTime])
        return result.insertId;
    }

    // 更新事务列表
    static async updateTodoById(id,{data}){
        const { completed, description, lockTime } = data;
        if (completed){
            await pool.query(
                'DELETE FROM cardInfo WHERE id = ?',
                [id],
            )
        }else {
           if (typeof description === 'string') {
               await pool.query(
                   'UPDATE cardInfo SET  description = ? WHERE id = ?',
                   [description, id]
               );
           }
           if (typeof lockTime === 'number') {
               await pool.query(
                   'UPDATE cardInfo SET  lockTime = ? WHERE id = ?',
                   [lockTime, id]
               );
           }
        }
    }

    static async getItemById(id) {
        const [rows] = await pool.query('SELECT description,locktime FROM cardInfo WHERE id = ?', [id]);
        return rows;
    }

    static async updateSchedule(description,lockTime,id) {
        await pool.query('UPDATE cardInfo SET description = ?, lockTime = ? WHERE id = ?',
            [description, lockTime, id]);
    }

}

module.exports = TodoOperate;