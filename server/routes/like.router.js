const express = require(`express`);
const router = express.Router();
const pool = require(`../modules/pool`);

// DELETE like, enable button for individually-selected image
router.delete('/:id', (req, res) => {
  let id = [req.params.id, req.user.id];
  let SQLquery = `DELETE FROM "like"
                  WHERE image_id = $1 AND user_id = $2;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /:id DELETE ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// DELETE like, enable button for main feed image
router.delete('/feed/:id', (req, res) => {
  let id = [req.params.id, req.user.id];
  let SQLquery = `DELETE FROM "like"
                  WHERE image_id = $1 AND user_id = $2;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /feed/:id DELETE ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// POST like, disable button for individually-selected image
router.post('/', (req, res) => {
  let id = [req.body.data, req.user.id];
  let SQLquery = `INSERT INTO "like" (liked, image_id, user_id)
                  VALUES(true, $1, $2);`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN / POST ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// POST like, disable button for main feed image
router.post('/feed', (req, res) => {
  let id = [req.body.data, req.user.id];
  let SQLquery = `INSERT INTO "like" (liked, image_id, user_id)
                  VALUES(true, $1, $2);`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN / POST ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// PUT route to update like count for individually-selected image
router.put('/add', (req, res) => {
  let id = [req.body.data];
  let SQLquery = `UPDATE image
                  SET likes = likes + 1
                  WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /add PUT ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// PUT route to update like count for main feed image
router.put('/feed/add', (req, res) => {
  let id = [req.body.data];
  let SQLquery = `UPDATE image
                  SET likes = likes + 1
                  WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /feed/add PUT ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// PUT route to update like count for individually-selected image
router.put('/sub', (req, res) => {
  let id = [req.body.data];
  let SQLquery = `UPDATE image
                  SET likes = likes - 1
                  WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /sub PUT ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

// PUT route to update like count for main feed image
router.put('/feed/sub', (req, res) => {
  let id = [req.body.data];
  let SQLquery = `UPDATE image
                  SET likes = likes - 1
                  WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(response=>{
      res.sendStatus(201);
  })
  .catch(error=>{
    console.log('ERROR IN /feed/sub PUT ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

module.exports = router;