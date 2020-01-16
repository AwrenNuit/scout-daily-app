const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool`);

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

router.get('/all', (req, res) => {
  let SQLquery = `SELECT * FROM image;`;
  pool.query(SQLquery)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /all GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

router.get('/following/avatar', (req, res) => {
  let id = [req.user.id];
  let SQLquery = `SELECT * FROM following
                  WHERE user_id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /following/avatar GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

router.get('/following/feed', (req, res) => {
  let id = [req.user.id];
  let SQLquery = `SELECT * FROM image
                  WHERE user_id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /following/feed GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

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

router.post('/', (req, res) => {
  let id = [req.body.data];
  let SQLquery = `INSERT INTO image (image_url)
                  VALUES($1);`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN / POST ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

router.post('/test', (req, res) => {
  let id = [req.body.data];
  let SQLquery = `INSERT INTO image (image_url)
                  VALUES($1);`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN / POST ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

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