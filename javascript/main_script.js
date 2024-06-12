document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.getElementById('main-content');
    const todoSection = document.getElementById('todo-section');
    const prevWeekButton = document.getElementById('prev-week');
    const nextWeekButton = document.getElementById('next-week');
    const quoteElement = document.getElementById('quote');
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');

    let currentDate = new Date();

    function getKSTDate() {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const kst = new Date(utc + (9 * 3600000));
        return kst;
    }

    currentDate = getKSTDate();

    const quotes = [
        "삶이 있는 한 희망은 있다. - 키케로",
        "산다는 것 그것은 치열한 전투이다. - 로망로랑",
        "하루에 3시간을 걸으면 7년 후에 지구를 한 바퀴 돌 수 있다. - 사무엘존슨",
        "언제나 현재에 집중할 수 있다면 행복할 것이다. - 파울로 코엘료",
        "진정으로 웃으려면 고통을 참아야 하며, 나아가 고통을 즐길 줄 알아야 해. - 찰리 채플린",
        "고난의 시기에 동요하지 않는 것, 그것은 진정 칭찬받을 만한 인물의 증거다. - 베토벤",
        "힘든 순간마다 나는 더 강해진다. - 오프라 윈프리",
        "당신이 실패했다고 해서 낙심하지 마라. 실수하지 않는 사람은 하나도 없다. - 토마스 에디슨",
        "노력은 배신하지 않는다. - 일본 속담",
        "성공은 영원하지 않고 실패는 치명적이지 않다. - 마이크 디트카",
        "미래를 예측하는 가장 좋은 방법은 미래를 창조하는 것이다. - 피터 드러커",
        "문제는 목표를 달성하는 데 없어서는 안 되는 한 과정이다. - 오프라 윈프리",
        "당신이 두려워하는 일을 하라. 그러면 두려움은 사라질 것이다. - 랄프 왈도 에머슨",
        "위대한 일들은 결코 힘에 의해서 이루어지지 않는다. 오직 인내와 노력에 의해서 이루어진다. - 새뮤얼 존슨",
        "한 번도 실패하지 않았다는 것은 새로운 것을 시도해보지 않았다는 것이다. - 아인슈타인",
        "행복은 우리 자신에게 달려 있다. - 아리스토텔레스",
        "기회는 모든 사람에게 온다. 그러나 그것을 붙잡는 사람은 준비된 사람뿐이다. - 조셉 머피",
        "지금 걷고 있는 길이 힘들더라도, 그 끝에 도달하면 기쁨이 기다리고 있을 것이다. - 로버트 슐러",
        "성공의 비밀은 목적의 일관성에 있다. - 벤자민 디즈레일리",
        "용기는 공포를 이기는 것이지, 공포가 없는 것이 아니다. - 마크 트웨인",
        "고통이 없으면 얻는 것도 없다. - 벤저민 프랭클린",
        "하루하루 최선을 다해 살다 보면, 어느새 훌륭한 삶이 된다. - 헬렌 켈러",
        "실패는 성공으로 가는 디딤돌이다. - 토마스 에디슨",
        "하늘이 무너져도 솟아날 구멍은 있다. - 한국 속담",
        "성공은 작은 노력이 반복된 결과이다. - 로버트 콜리어",
        "어두운 밤일수록 별이 빛난다. - 윌리엄 셰익스피어",
        "결단력은 성공의 시작이다. - 애나 패블로바",
        "긍정적인 생각은 긍정적인 결과를 가져온다. - 마하트마 간디",
        "당신이 가는 길이 힘들다면, 그것이 올바른 길일 가능성이 크다. - 헨리 포드",
        "변화는 어렵지만 필수적이다. - 존 맥스웰",
        "작은 일에 최선을 다하는 것이 큰 성공을 이끈다. - 링컨",
        "시간은 가장 공평한 재산이다. - 베토벤",
        "비록 천천히 걷더라도 멈추지 않는다면 결국 목표에 도달할 것이다. - 공자",
        "모든 위대한 꿈은 꿈꾸는 자의 용기에서 시작된다. - 해리엇 터브먼",
        "시작이 반이다. - 아리스토텔레스",
        "하루를 헛되이 보내지 마라. 시간이야말로 가장 소중한 자산이다. - 아인슈타인",
        "자신을 믿어라. 그러면 어떤 어려움도 극복할 수 있다. - 헬렌 켈러",
        "큰 꿈을 꾸어라. 작은 꿈은 사람의 마음을 움직이지 않는다. - 괴테",
        "최고가 되기 위해서는 최악의 상황에서도 포기하지 않아야 한다. - 릭 플래어",
        "작은 성공을 축하하라. 그것이 큰 성공의 밑거름이다. - 오프라 윈프리",
        "변화는 저항 없이 이루어질 수 없다. - 마틴 루터 킹 주니어",
        "한 번의 실패는 영원한 실패를 의미하지 않는다. - F. 스콧 피츠제럴드",
        "당신의 한계를 믿지 마라. 한계는 오직 당신의 생각 속에만 존재한다. - 테오도르 루즈벨트",
        "미래는 지금 당신이 무엇을 하는가에 달려 있다. - 마하트마 간디",
        "도전하지 않는다면, 당신은 이미 패배한 것이다. - 조지 S. 패튼",
        "인내는 쓰지만 그 열매는 달다. - 장 자크 루소",
        "실패는 일시적인 것이다. 포기는 영원한 것이다. - 랜스 암스트롱",
        "행복은 방향이지 목적지가 아니다. - 사이먼 시넥",
        "모든 위대한 일은 작은 도전에서 시작된다. - 에이브러햄 링컨",
        "성공은 준비된 자에게 기회가 찾아왔을 때 이루어진다. - 조지 S. 클라슨",
        "내 과제인생에서 이렇게 많은 터미널 화면을 볼 줄은 몰랐어. -안채은",
        "디자인이 제일 재밌었다. -장슬기",
        "지렁이도 꿈틀댈 수 있다는걸 보여주는중 -윤지호"
    ];

    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex];
    }

    displayRandomQuote();

    toggleDarkModeButton.addEventListener('click', function () {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            toggleDarkModeButton.textContent = '라이트 모드';
        } else {
            toggleDarkModeButton.textContent = '다크 모드';
        }
    });

    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

    function formatDate(date) {
        const year = date.getFullYear();
        const month = ("0" + (date.getMonth() + 1)).slice(-2);
        const day = ("0" + date.getDate()).slice(-2);
        const dayName = dayNames[date.getDay()];
        return `${year}-${month}-${day} (${dayName})`;
    }


    function addTodoSection(date) {
        const dateDiv = document.createElement('div');
        dateDiv.className = 'date';
        dateDiv.textContent = formatDate(date);

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