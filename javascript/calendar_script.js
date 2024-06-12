// 월 정보 가져오기
month = document.getElementById("month");
function printMonth() {
    // 현재 날짜를 나타내는 Date 객체 생성
    var currentDate = new Date();

    // 현재 월 정보
    var currentMonth = currentDate.getMonth();

    // 월 이름을 영어로 바꾸기
    var monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    var currentMonthName = monthNames[currentMonth];

    month.innerHTML = "<p>" + currentMonthName + "</p>";
}

// 달력 그리기
calendar_box = document.getElementById("calendar");
function printCalendar(y, m) {

    //현재 날짜와 현재 달에 1일의 날짜 객체 생성
    var date = new Date(); //날짜 객체 생성
    var nowY = date.getFullYear(); //현재 연도
    var nowM = date.getMonth(); //현재 월
    var nowD = date.getDate(); //현재 일
    //연도, 월을 입력받지 않은 경우에는 현재 날짜의 연도, 월 정보를 사용함
    y = (y != undefined) ? y : nowY;
    m = (m != undefined) ? m - 1 : nowM;

    //현재 월의 1일 정보 
    var theDate = new Date(y, m, 1);
    var theDay = theDate.getDay();


    //1월부터 12월까지 마지막 일을 배열로 저장
    var last = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //윤년 계산
    if (y % 4 == 0 && y % 100 != 0 || y % 400 == 0) lastDate = last[1] = 29;

    //현재 월의 마지막 일 정보
    var lastDate = last[m]; //현재 월의 마지막이 몇일인지 구함


    //현재 월의 달력에 필요한 행의 개수
    var row = Math.ceil((theDay + lastDate) / 7);


    //요일 행 생성   
    var calendar = "<table border='1'>";
    calendar += "<tr>";
    calendar += "<th>MON</th>";
    calendar += "<th>TUE</th>";
    calendar += "<th>WED</th>";
    calendar += "<th>THU</th>";
    calendar += "<th>FRI</th>";
    calendar += "<th>SAT</th>";
    calendar += "<th>SUN</th>";
    calendar += "</tr>";

    //1일부터 기록
    var dNum = 1;
    //이중 for문을 이용해 달력 테이블 생성
    for (var i = 1; i <= row; i++) {
        calendar += "<tr>"; //행 생성

        for (var k = 1; k <= 7; k++) {//열 생성 (td 태그 생성)        
            //빈 날짜는 빈칸으로 표기
            if (i == 1 && k < theDay || dNum > lastDate) {
                calendar += "<td> &nbsp; </td>";
            }
            else {
                //오늘 날짜
                if (dNum === nowD) {
                    calendar += "<td id='today'>" + dNum + "</td>";
                }
                //오늘이 아닌 날짜
                else {
                    calendar += "<td>" + dNum + "</td>";
                }
                //일 증가
                dNum++;
            }
        }
        calendar += "<tr>";
    }

    //innerHTML값을 달력 테이블으로 변경
    calendar_box.innerHTML = calendar;
}

// 년 정보 가져오기
year = document.getElementById("year");
function printYear() {
    // 현재 날짜를 나타내는 Date 객체 생성
    var currentDate = new Date();

    // 현재 월 정보
    var currentYear = currentDate.getFullYear();

    year.innerHTML = "<p>" + currentYear + "</p>";
}

printYear();
printMonth();
printCalendar();