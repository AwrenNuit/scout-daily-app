const express = require(`express`);
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require(`../modules/pool`);

// DELETE existing comment
router.delete('/delete/:id', rejectUnauthenticated, (req, res) => {
  const id = [req.params.id];
  const SQLquery = `DELETE FROM comment
                    WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(200))
  .catch(()=>res.sendStatus(500));
});

// GET comments for this image
router.get('/:id', (req, res) => {
  const id = [req.params.id];
  const SQLquery = `SELECT u.username, u.avatar, c."comment", c.id, c.user_id, c.image_id FROM image i
                    FULL JOIN "comment" c ON i.id = c.image_id
                    FULL JOIN "user" u ON u.id = c.user_id
                    WHERE i.id = $1 AND c."comment" IS NOT NULL
                    ORDER BY c.id;`;
  pool.query(SQLquery, id)
  .then(response=>res.send(response.rows))
  .catch(()=>res.sendStatus(500));
});

// POST new comment
router.post('/', rejectUnauthenticated, (req, res) => {
  const id = [req.body.comment, req.body.id, req.user.id];
  const SQLquery = `INSERT INTO comment (comment, image_id, user_id)
                    VALUES($1, $2, $3);`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(201))
  .catch(()=>res.sendStatus(500));
});

// PUT route to update image caption
router.put('/caption', rejectUnauthenticated, (req, res) => {
  const id = [req.body.caption, req.body.id];
  const SQLquery = `UPDATE image
                    SET caption = $1
                    WHERE id = $2;`;
  pool.query(SQLquery, id)
  .then(()=>res.sendStatus(200))
  .catch(()=>res.sendStatus(500));
});

module.exports = router;