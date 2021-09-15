const express = require('express')
const shell = require('shelljs');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  const match = req.query.match === 'true';
  const message = {
    aps: {
      alert: {
        title: 'Test',
        body: 'Test',
      },
      tokens: match ? ['something'] : ['another'],
    }
  }
  shell.exec(`echo '${JSON.stringify(message)}' | xcrun simctl push booted com.example.pushnotification -`);
  res.send('')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})