// 할 일 추가하면 할 일 리스트 그 날짜에 추가되어야 함

document.getElementById('todoForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {
        date: formData.get('date'),
        title: formData.get('title'),
        type: formData.get('type'),
        memo: formData.get('memo')
    };

    const response = await fetch('/add-todo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Todo added successfully');
    } else {
        alert('Failed to add todo');
    }
});