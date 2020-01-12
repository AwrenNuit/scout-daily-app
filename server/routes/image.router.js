const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool`);

router.get('/', (req, res) => {
  let SQLquery = `SELECT * FROM images;`;
  pool.query(SQLquery)
  .then(response=>{
      res.send(response.rows);
  })
  .catch(error=>{
    console.log('ERROR IN / GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

router.post('/', (req, res) => {
  console.log('req.body-----------------------------------------', req.body);
  let id = [req.body.data];
  let SQLquery = `INSERT INTO images (image_url)
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