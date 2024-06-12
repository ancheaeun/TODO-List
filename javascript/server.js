const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const http_port = 4000;

// app.listen(http_port, () =>{
//     console.log(http_port+'번 포트에서 대기중');
// });

// MySQL 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mayile-2259', // MySQL 비밀번호
    database: 'todo_db' // 데이터베이스 이름
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

app.get('/', (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;

    console.log('Received login request:', username, password);

    const query = 'SELECT * FROM UserInfo WHERE ID = ? AND PW = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            res.status(500).json({ message: 'Server error' });
            return;
        }

        if (results.length > 0) {
            console.log('Login successful for user:', username);
            res.json({ message: 'Login successful' });
        } else {
            console.log('Invalid username or password for user:', username);
            res.json({ message: 'Invalid username or password' });
        }
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 로그인 엔드포인트
// app.post('/login', (req, res) => {
   
// });

app.listen(http_port, () => {
    console.log(`Server running on port ${http_port}`);
});
