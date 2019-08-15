var express = require('express');
var router = express.Router();
const UserData = require('./userData');

const jwt = require('jsonwebtoken');

// See the react auth blog in which cors is required for access
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});


// MOCKING DB just for test
let users = [
    {
        id: 1,
        username: 'test',
        password: '123'
    },
    {
        id: 2,
        username: 'test2',
        password: '456'
    }
];

function blat(username, password) {
  let data = new UserData();
  // const { id, name, image } = req.body;
  // if ((!id && id !== 0) || !name || !image) {
  //   return res.json({
  //     success: false,
  //     error: 'INVALID INPUTS',
  //   });
  // }

  data.username = username;
  data.password = password;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
}

// LOGIN ROUTE
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Use your DB ORM logic here to find user and compare password
    // let users = UserData.find((err, data) => {
    //     if (err) return res.json({ success: false, error: err });
    //     return res.json({ success: true, data: data });
    //   });
    
    // Finds first username and password match in users array (assumes usernames are unique)
    var user = users.find(u => username == u.username && password == u.password);
    if (user) { // User credentials matched (are valid)
        let token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
        res.json({
            sucess: true,
            err: null,
            token
        });
    } else { // User credentials did not match (are not valid) or no user with this username/password exists
        res.status(401).json({
            sucess: false,
            token: null,
            err: 'Username or password is incorrect'
        });
    }
});

//export this router to use in our index.js
module.exports = router;


