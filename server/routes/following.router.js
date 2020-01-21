const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// DELETE user follow
router.delete('/:id', (req, res) => {
  let id = [req.user.id, req.params.id];
  let SQLquery = `DELETE FROM following
                  WHERE user_id = $1 AND connection_id = $2;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /:id DELETE ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET other user's details
router.get('/details/:id', (req, res) => {
  let id = [req.params.id];
  let SQLquery = `SELECT * FROM "user"
                  WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows[0]);
  })
  .catch(error=>{
    console.log('ERROR IN /details/:id GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET following table data
router.get('/details', (req, res) => {
  let id = [req.user.id];
  let SQLquery = `SELECT * FROM following
                  WHERE user_id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /details GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// POST user follow
router.post('/', (req, res) => {
  let id = [req.user.id, req.body.data];
  let SQLquery = `INSERT INTO following (user_id, connection_id)
                  VALUES($1, $2);`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN / POST ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

module.exports = router;
