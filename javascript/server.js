const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path'); 

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, 'login', 'todo_login.html'));
    // 파일을 보내는 부분과 데이터베이스 쿼리를 실행하는 부분이 분리되어야 합니다.
});

// 사용자 로그인 처리
app.post('/login', (req, res) => {
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
            // 로그인 성공 시 응답으로 성공 메시지를 보냅니다.
            console.log('로그인 성공');
            res.json({ message: 'Login successful' });
        } else {
            console.log('Invalid username or password for user:', username);
            res.status(401).json({ message: 'Invalid username or password' });
        }
    });
});

app.get('/todo-register.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login', 'todo_register.html'));
});

app.get('/todo_main.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login', 'todo_main.html'));
});

// 서버를 시작합니다.
app.listen(http_port, () => {
    console.log(`Server running on port ${http_port}`);
});