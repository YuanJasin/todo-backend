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
    static async updateTodoById(id,{completed, description, lockTime}){
        await pool.query(
            'UPDATE cardInfo SET completed = ?, description = ?, lockTime = ? WHERE id = ?',
            [completed, description, lockTime, id]
        );
    }

    static async getPositionById(id) {
        const [rows] = await pool.query('SELECT position FROM cardInfo WHERE id = ?', [id]);
        return rows.length ? rows[0].position : null;
    }

    static async updatePositions(updates) {
        const queries = updates.map(
            ({ id, position }) =>
                pool.query('UPDATE cardInfo SET position = ? WHERE id = ?', [position, id])
        );
        await Promise.all(queries);
    }
}

module.exports = TodoOperate;