const { pool } = require('../config/database');

class StudentModel {
  static async getAll() {
    const [rows] = await pool.query(`
      SELECT 
        id,
        name,
        email,
        birth_date,
        TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) as age,
        career,
        created_at,
        updated_at
      FROM students 
      ORDER BY id DESC
    `);
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.query(`
      SELECT 
        id,
        name,
        email,
        birth_date,
        TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) as age,
        career,
        created_at,
        updated_at
      FROM students 
      WHERE id = ?
    `, [id]);
    return rows[0];
  }


  static async create(studentData) {
    const { name, email, birth_date, career } = studentData;
    const [result] = await pool.query(
      'INSERT INTO students (name, email, birth_date, career) VALUES (?, ?, ?, ?)',
      [name, email, birth_date, career || null]
    );
    return this.getById(result.insertId);
  }

  static async update(id, studentData) {
    const { name, email, birth_date, career } = studentData;
    const [result] = await pool.query(
      'UPDATE students SET name = ?, email = ?, birth_date = ?, career = ? WHERE id = ?',
      [name, email, birth_date, career, id]
    );
    
    if (result.affectedRows === 0) {
      return null;
    }
    
    return this.getById(id);
  }

  static async delete(id) {
    const student = await this.getById(id);
    if (!student) {
      return null;
    }
    
    await pool.query('DELETE FROM students WHERE id = ?', [id]);
    return student;
  }

  static async emailExists(email, excludeId = null) {
    let query = 'SELECT id FROM students WHERE email = ?';
    let params = [email];
    
    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }
    
    const [rows] = await pool.query(query, params);
    return rows.length > 0;
  }
  /**
   * Obtener estadísticas
   */
  static async getStats() {
    const [countResult] = await pool.query('SELECT COUNT(*) as total FROM students');
    const [avgAgeResult] = await pool.query(`
      SELECT AVG(TIMESTAMPDIFF(YEAR, birth_date, CURDATE())) as avg_age 
      FROM students
    `);
    const [careerStats] = await pool.query(`
      SELECT career, COUNT(*) as count 
      FROM students 
      WHERE career IS NOT NULL 
      GROUP BY career 
      ORDER BY count DESC
    `);

    return {
      total: countResult[0].total,
      avgAge: Math.round(avgAgeResult[0].avg_age || 0),
      byCareer: careerStats
    };
  }
}

module.exports = StudentModel;