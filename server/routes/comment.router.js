const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool`);

// DELETE existing comment
router.delete('/delete', (req, res) => {
  let id = [req.body.data];
  let SQLquery = `DELETE FROM comment
                  WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /delete DELETE ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET comments for this image
router.get('/:id', (req, res) => {
  let id = [req.params.id];
  let SQLquery = `SELECT u.username, u.avatar, c."comment", c.id, c.user_id, c.image_id FROM image i
                  FULL JOIN "comment" c ON i.id = c.image_id
                  FULL JOIN "user" u ON u.id = c.user_id
                  WHERE i.id = $1 AND c."comment" IS NOT NULL;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /:id GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// POST new comment
router.post('/', (req, res) => {
  let id = [req.body.comment, req.body.id, req.user.id];
  let SQLquery = `INSERT INTO comment (comment, image_id, user_id)
                  VALUES($1, $2, $3);`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN / POST ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// PUT route to update image caption
router.put('/caption', (req, res) => {
  let id = [req.body.caption, req.body.id];
  let SQLquery = `UPDATE image
                  SET caption = $1
                  WHERE id = $2;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /caption PUT ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

module.exports = router;