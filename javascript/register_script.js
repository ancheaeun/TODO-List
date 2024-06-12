document.getElementById('id-button').addEventListener('click', function() {
    const username = document.getElementById('아이디').value;

    fetch('/check-username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.exists) {
            alert('아이디가 이미 존재합니다.');
        } else {
            alert('아이디를 사용할 수 있습니다.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('서버 오류가 발생했습니다.');
    });
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('이름').value;
    const username = document.getElementById('아이디').value;
    const password = document.getElementById('비밀번호').value;
    const confirmPassword = document.getElementById('비밀번호 확인').value;

    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Registration successful') {
            alert('회원가입이 성공적으로 완료되었습니다.');
            window.location.href = '/';
        } else {
            alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('서버 오류가 발생했습니다.');
    });
});
