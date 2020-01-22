const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool`);

// DELETE this image
router.delete('/delete/:id', (req, res) => {
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

// GET all user images
router.get('/all', (req, res) => {
  let id = [req.user.id];
  let SQLquery = `SELECT * FROM image
                  WHERE user_id = $1
                  ORDER BY id;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /all GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET all other user images
router.get('/all/:id', (req, res) => {
  let id = [req.params.id];
  let SQLquery = `SELECT * FROM image
                  WHERE user_id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /all/:id GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// GET all followed user's images
router.get('/following/feed', (req, res) => {
  let id = [req.user.id];
  let SQLquery = `SELECT l.liked, u.username, u.avatar, i.id, i.image_url, i.likes, i.caption, i.user_id FROM "following" f
                  FULL JOIN "user" u ON u.id = f.connection_id
                  FULL JOIN "image" i ON i.user_id = f.connection_id
                  FULL JOIN "like" l ON l.image_id = i.id
                  WHERE f.user_id = $1 AND i.id IS NOT NULL
                  ORDER BY i.id DESC;`;
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
  let id = [req.params.id];
  let SQLquery = `SELECT u.username, u.avatar, i.id, i.image_url, i.likes, i.caption, i.user_id FROM image i
                  FULL JOIN "user" u ON u.id = i.user_id
                  WHERE i.id = $1;`;
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
  let id = [req.body.image, req.body.caption, req.user.id];
  let SQLquery = `INSERT INTO image (image_url, caption, user_id)
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

module.exports = router;