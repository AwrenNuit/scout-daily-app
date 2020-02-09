const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET all followed user's avatars
router.get('/following', (req, res) => {
  const id = [req.user.id];
  const SQLquery = `SELECT * FROM "following" f
                    FULL OUTER JOIN "user" u ON u.id = f.connection_id
                    WHERE f.user_id = $1
                    ORDER BY lower(username);`;
  pool.query(SQLquery, id)
  .then(response=>res.send(response.rows))
  .catch(()=>res.sendStatus(500));
});

// PUT (update) current user's avatar
router.put('/', rejectUnauthenticated, (req, res) => {
  const id = [req.body.data, req.user.id];
  const SQLquery = `UPDATE "user"
                    SET avatar = $1
                    WHERE id = $2;`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(200))
  .catch(()=>res.sendStatus(500));
});

module.exports = router;