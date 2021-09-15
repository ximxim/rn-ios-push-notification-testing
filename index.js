const express = require('express')
const shell = require('shelljs');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  const match = req.query.match === 'true';
  const message = {
    notification: {
      title: 'Test',
      body: 'Test',
    },
    tokens: match ? ['something'] : ['another'],
  }
  shell.exec(`echo '{ "aps": { "alert": ${JSON.stringify(message.notification)}, "tokens": ${JSON.stringify(message.tokens)} } }' | xcrun simctl push booted com.example.pushnotification -`);
  res.send('')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})