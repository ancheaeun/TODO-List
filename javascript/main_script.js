document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.getElementById('main-content');
    const todoSection = document.getElementById('todo-section');
    const prevWeekButton = document.getElementById('prev-week');
    const nextWeekButton = document.getElementById('next-week');

    let currentDate = new Date();

    function addTodoSection(date) {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'date';
        dateDiv.textContent = date.toISOString().split('T')[0];

        const todoGrid = document.createElement('div');
        todoGrid.className = 'todo-grid';

        // 여기서 할 일 항목을 추가할 수 있습니다.
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        todoItem.textContent = "할 일을 추가하세요";

        todoGrid.appendChild(todoItem);

        todoSection.appendChild(dateDiv);
        todoSection.appendChild(todoGrid);
        todoSection.appendChild(document.createElement('hr'));
    }

    function loadInitialTodos() {
        for (let i = 0; i < 7; i++) { // 처음에 일주일치 할 일 로드
            addTodoSection(currentDate);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    function loadMoreTodos(days) {
        for (let i = 0; i < days; i++) { // 스크롤 할 때마다 일주일치 추가 로드
            addTodoSection(currentDate);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    prevWeekButton.addEventListener('click', function () {
        currentDate.setDate(currentDate.getDate() - 14); // 이전 7일로 이동
        todoSection.innerHTML = ''; // 기존 할 일 목록 초기화
        loadMoreTodos(7);
    });

    nextWeekButton.addEventListener('click', function () {
        todoSection.innerHTML = ''; // 기존 할 일 목록 초기화
        loadMoreTodos(7);
    });

    loadInitialTodos();
});