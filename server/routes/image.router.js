const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool`);


// DELETE this image
router.delete('/:id', (req, res) => {
  let id = [req.params.id];
  let SQLquery = `DELETE FROM image
                  WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(200);
  })
  .catch(error=>{
    console.log('ERROR IN /:id DELETE ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET all images
router.get('/all', (req, res) => {
  let id = [req.user.id];
  let SQLquery = `SELECT * FROM image
                  WHERE user_id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /all GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET all followed user's avatars
router.get('/following/avatar', (req, res) => {
  let id = [req.user.id];
  let SQLquery = `SELECT * FROM "following" f
                  FULL OUTER JOIN "user" u ON u.id = f.connection_id
                  WHERE f.user_id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /following/avatar GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET all followed user's images
router.get('/following/feed', (req, res) => {
  let id = [req.user.id];
  let SQLquery = `SELECT * FROM "following" f
                  FULL OUTER JOIN "user" u ON u.id = f.user_id
                  FULL OUTER JOIN "image" i ON i.user_id = f.connection_id
                  WHERE f.user_id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /following/feed GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET this image to edit
router.get('/:id', (req, res) => {
  let id = [req.params.id];
  let SQLquery = `SELECT * FROM image
                  WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows[0]);
  })
  .catch(error=>{
    console.log('ERROR IN /:id GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET this image to view
router.get('/view/:id', (req, res) => {
  let id = [req.params.id, req.user.id];
  let SQLquery = `SELECT * FROM image
                  WHERE id = $1 AND user_id = $2;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows[0]);
  })
  .catch(error=>{
    console.log('ERROR IN /view/:id GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// POST new image
router.post('/', (req, res) => {
  let id = [req.body.image, req.body.caption];
  let SQLquery = `INSERT INTO image (image_url, caption)
                  VALUES($1, $2);`;
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

// PUT route to update like count
router.put('/like', (req, res) => {
  let id = [eq.body.id];
  let SQLquery = `UPDATE image
                  SET likes = likes+1
                  WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /like PUT ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

module.exports = router;