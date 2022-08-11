const pool = require('../utils/pool');

module.exports = class Git {
  id;
  git;

  constructor(row) {
    this.id = row.id;
    this.git = row.git;
  }

  static async insert({ git }) {
    const { rows } = await pool.query(
      `INSERT INTO gits (git)
        VALUES ($1)
        RETURNING *`,
      [git]
    );
    return new Git(rows[0]);
  }

  static async selectAll() {
    const { rows } = await pool.query(
      'SELECT * FROM gits'
    );
    return rows.map((row) => new Git(row));
  }
};
