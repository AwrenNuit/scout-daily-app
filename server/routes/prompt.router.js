const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET daily photography prompt
router.get('/', (req, res) => {
  let id = [new Date()];
  const SQLquery = `SELECT * FROM prompt 
                    LIMIT 1;`;
  pool.query(SQLquery)
  .then(result=>{
    res.send(result.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /prompt GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

module.exports = router;