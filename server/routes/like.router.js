const express = require(`express`);
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require(`../modules/pool`);

// DELETE like, enable button for individually-selected image
router.delete('/:id', (req, res) => {
  const id = [req.params.id, req.user.id];
  const SQLquery = `DELETE FROM "like"
                    WHERE image_id = $1 AND user_id = $2;`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(200))
  .catch(()=>res.sendStatus(500));
});

// DELETE like, enable button for main feed image
router.delete('/feed/:id', (req, res) => {
  const id = [req.params.id, req.user.id];
  const SQLquery = `DELETE FROM "like"
                    WHERE image_id = $1 AND user_id = $2;`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(200))
  .catch(()=>res.sendStatus(500));
});

// GET likes
router.get('/:id', (req, res) => { ////////////////////////////////////////////// No longer works???
  const id = [req.user.id, req.params.id];
  const SQLquery = `SELECT l.liked, l.user_id, l.image_id, i.image_url FROM "like" l
                    FULL JOIN image i ON i.id = l.image_id
                    FULL JOIN "user" u ON u.id = l.user_id
                    WHERE l.user_id = $1 AND l.image_id = $2;`;
  pool.query(SQLquery, id)
  .then(response=>res.send(response.rows[0]))
  .catch(()=>res.sendStatus(500));
});

// POST like, disable button for individually-selected image
router.post('/', rejectUnauthenticated, (req, res) => {
  const id = [req.body.data, req.user.id];
  const SQLquery = `INSERT INTO "like" (liked, image_id, user_id)
                    VALUES(true, $1, $2);`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(201))
  .catch(()=>res.sendStatus(500));
});

// POST like, disable button for main feed image
router.post('/feed', rejectUnauthenticated, (req, res) => {
  const id = [req.body.data, req.user.id];
  const SQLquery = `INSERT INTO "like" (liked, image_id, user_id)
                    VALUES(true, $1, $2);`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(201))
  .catch(()=>res.sendStatus(500));
});

// PUT route to update like count for individually-selected image
router.put('/add', rejectUnauthenticated, (req, res) => {
  const id = [req.body.data];
  const SQLquery = `UPDATE image
                    SET likes = likes + 1
                    WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(200))
  .catch(()=>res.sendStatus(500));
});

// PUT route to update like count for main feed image
router.put('/feed/add', rejectUnauthenticated, (req, res) => {
  const id = [req.body.data];
  const SQLquery = `UPDATE image
                    SET likes = likes + 1
                    WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(200))
  .catch(()=>res.sendStatus(500));
});

// PUT route to update like count for individually-selected image
router.put('/sub', rejectUnauthenticated, (req, res) => {
  const id = [req.body.data];
  const SQLquery = `UPDATE image
                    SET likes = likes - 1
                    WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(200))
  .catch(()=>res.sendStatus(500));
});

// PUT route to update like count for main feed image
router.put('/feed/sub', rejectUnauthenticated, (req, res) => {
  const id = [req.body.data];
  const SQLquery = `UPDATE image
                    SET likes = likes - 1
                    WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(200))
  .catch(()=>res.sendStatus(500));
});

module.exports = router;