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

// DELETE like, enable button
router.delete('/like/:id', (req, res) => {
  let id = [req.params.id, req.user.id];
  let SQLquery = `DELETE FROM "like"
                  WHERE image_id = $1 AND user_id = $2;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /like DELETE ---------------------------------------->', error);
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
  let SQLquery = `SELECT l.liked, u.username, u.avatar, i.id, i.image_url, i.likes, i.caption, i.user_id FROM image i
                  FULL JOIN "user" u ON u.id = i.user_id
                  FULL JOIN "like" l ON l.image_id = i.id
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

// GET this image to view
router.get('/view/comment/:id', (req, res) => {
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

// POST new comment
router.post('/comment', (req, res) => {
  let id = [req.body.comment, req.body.id, req.user.id];
  let SQLquery = `INSERT INTO comment (comment, image_id, user_id)
                  VALUES($1, $2, $3);`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /comment POST ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// POST like, disable button
router.post('/like', (req, res) => {
  let id = [req.body.data, req.user.id];
  let SQLquery = `INSERT INTO "like" (liked, image_id, user_id)
                  VALUES(true, $1, $2);`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /like POST ---------------------------------------->', error);
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
router.put('/like/add', (req, res) => {
  let id = [req.body.data];
  let SQLquery = `UPDATE image
                  SET likes = likes + 1
                  WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /like/add PUT ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// PUT route to update like count
router.put('/like/sub', (req, res) => {
  let id = [req.body.data];
  let SQLquery = `UPDATE image
                  SET likes = likes - 1
                  WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /like/sub PUT ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

module.exports = router;