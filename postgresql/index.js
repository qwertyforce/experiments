const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://zzwufcsagzcngp:a8ed8d355eaa59b122f89a4b5c999ab6bd04d1347173413530f82ee41539e17e@ec2-54-228-246-214.eu-west-1.compute.amazonaws.com:5432/d5d6ampj64oaot",
  ssl: true,
});

client.connect();

client.query('SELECT * FROM "Test Table";', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});


const query = {
  text: 'INSERT INTO "Test Table"(asdf, asdf2) VALUES($1, $2)',
  values: ['12454', '125125'],
}

// callbackS
client.query(query, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res)
  }
})


  client.query(`DELETE FROM "Test Table" WHERE asdf='5';`, (err, res) => {
  if (err) throw err;
  console.log(res)
  client.end();
});

const query1 = {
  text: `UPDATE "Test Table"
	SET asdf=$1, asdf2=$2
	WHERE asdf='44';`,
  values: ['3333', '7777'],
}

// callbackS
client.query(query1, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res)
  }
})
 