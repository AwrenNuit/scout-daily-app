const express = require(`express`);
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
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
router.get('/following/feed', rejectUnauthenticated, (req, res) => {
  let id = [req.user.id];
  let SQLquery = `SELECT DISTINCT l.liked, u2.username, u2.avatar, i.id, i.image_url, i.likes, i.caption, i.user_id
                  FROM "following" f
                  JOIN "user" u1 ON u1.id = f.user_id
                  JOIN "user" u2 ON f.connection_id = u2.id
                  JOIN "image" i ON i.user_id = u2.id
                  LEFT JOIN "like" l ON l.image_id = i.id AND l.user_id = u1.id
                  WHERE u1.id = $1
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
router.get('/:id', rejectUnauthenticated, (req, res) => {
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
router.post('/', rejectUnauthenticated, (req, res) => {
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