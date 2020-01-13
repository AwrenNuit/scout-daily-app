const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool`);

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

router.get('/following', (req, res) => {
  let id = [req.user.id];
  let SQLquery = `SELECT * FROM following
                  WHERE user_id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /following GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

router.get('/:id', (req, res) => {
  let id = [req.params.id];
  let SQLquery = `SELECT * FROM image
                  WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /:id GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

router.post('/', (req, res) => {
  console.log('req.body-----------------------------------------', req.body);
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

module.exports = router;