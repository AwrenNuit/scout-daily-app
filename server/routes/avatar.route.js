const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET all followed user's avatars
router.get('/following', (req, res) => {
  let id = [req.user.id];
  let SQLquery = `SELECT * FROM "following" f
                  FULL OUTER JOIN "user" u ON u.id = f.connection_id
                  WHERE f.user_id = $1
                  ORDER BY lower(username);`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /following/avatar GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// PUT (update) current user's avatar
router.put('/', (req, res) => {
  let id = [req.body.data, req.user.id];
  let SQLquery = `UPDATE "user"
                  SET avatar = $1
                  WHERE id = $2;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /avatar PUT ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

module.exports = router;