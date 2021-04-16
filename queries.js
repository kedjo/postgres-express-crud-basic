const Pool = require('pg').Pool;


const pool = new Pool({
    user: '',
    host: '',
    password: '',
    database: '',
    port: 5432,
});


const getUsers = (req, res) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (err, results) => {
        if(err){
            throw err;
        }
        res.status(200).json(results.rows);
    })
};

const getUserById = (req, res) => {
    const id = parseInt(req.parmas.id);
    pool.query('SELECT * FROM users WHERE id = $1', {$1: id}, (err, results) => {
        if(err){
            throw err;
        }
        res.status(200).json(results.rows);
    })
}

const createUser = (req, res) => {
    const { name, email } = req.body;
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', {$1: name, $2: email}, function(err, results){
        if(err){
            throw err;
        }
        res.status(201).send("User added with ID: " + results.insertId);
    })
};

const updateUser = (req, res) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body;
  
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };