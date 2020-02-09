const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// DELETE user follow
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const id = [req.user.id, req.params.id];
  const SQLquery = `DELETE FROM following
                    WHERE user_id = $1 AND connection_id = $2;`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(200))
  .catch(()=>res.sendStatus(500));
});

// GET other user's details
router.get('/details/:id', (req, res) => {
  const id = [req.params.id];
  const SQLquery = `SELECT * FROM "user"
                    WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>res.send(response.rows[0]))
  .catch(()=>res.sendStatus(500));
});

// GET following table data
router.get('/details', rejectUnauthenticated, (req, res) => {
  const id = [req.user.id];
  const SQLquery = `SELECT * FROM following
                    WHERE user_id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>res.send(response.rows))
  .catch(()=>res.sendStatus(500));
});

// POST user follow
router.post('/', rejectUnauthenticated, (req, res) => {
  const id = [req.user.id, req.body.data];
  const SQLquery = `INSERT INTO following (user_id, connection_id)
                    VALUES($1, $2);`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(201))
  .catch(()=>res.sendStatus(500));
});

module.exports = router;