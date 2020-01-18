const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const CronJob = require('cron').CronJob;

let num = 0;
const job = new CronJob('00 00 00 * * *', function() {
  num = num+1;
});
job.start();

router.get('/', (req, res) => {
  console.log('num----------------------', num);
  let id = [num];
  const SQLquery = `SELECT * FROM prompt 
                    WHERE id = $1;`;
  pool.query(SQLquery, id)
  .then(result=>{
    res.send(result.rows);
  })
  .catch(error=>{
    console.log('ERROR IN /prompt GET ---------------------------------------->', error);
    res.sendStatus(500);
  });
});

module.exports = router;