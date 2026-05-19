# 실시간 채팅 웹 앱 만들기

## 1. 기술 스택 및 개발 환경

프론트엔드: HTML, CSS, JS, React
백엔드: Node.js, express
실시간 통신: Socket.io
DB: PostgreSQL

## 2. 주요 기능

- 닉네임 입력
- 채팅방 입장
- 메세지 전송
- 접속자 표시
- 입장/퇴장알림

## 다운 받은 라이브러리들

- react (개발환경)
- react-router-dom (클라이언트 라우팅 렌더링 관리)
- express (node.js 환경에서 웹 서버를 쉽게 만들어줌)
- cors (서로 다른 도메인 간의 요청 허용)
- pg (기능이 많고 복잡한 쿼리에 강한 db)
- socket.io (서버용 실시간 통신 관리)
- socket.io-client (클라이언트용 실시간 통신 관리)

## 페이지별 구현할 기능

1. login

- 닉네임 입력란 💛💛
- 입장 버튼 클릭 시 db에 닉네임 존재 여부 확인 후 없을 시 닉네임 db에 저장, 있으면 바로 입장 💛💛
- 닉네임 입력 후 chatList 페이지로 이동 💛💛

2. chatList

- 새로고침해도 접속자 유지 (sessionStorage)💛💛
- 닉네임이 담긴 로그인 입장 메시지 💛💛
- 현재 접속자 수 표시 💛💛
- 현재 접속자 닉네임 리스트 표시 (현재 닉네임 안나옴) 💛💛
- 현재 접속자 닉네임 리스트 접속자 퇴장 시 반영되게 하기💔💔 (현재 온라인 상태가 false로 바뀌지 않음) 💛💛
- 방이 이미 존재한다면 db에서 방이름, 가장 최근 메시지, 최근 메세지의 시간 보여주기 💛💛
- 방 만들기 버튼 클릭 시 모달 창 열고 닫기 기능 💛💛
- 방 만들기 기능 (방 이름 설정 가능, 중복 불가) 💛💛
- 방 리스트 클릭 시 socket으로 해당 방 입장 (chatRoom 페이지로 이동)💛💛
- 방 입장 퇴장 전체에게 알림 💛💛

3. chatRoom

- 이전 버튼으로 chatList 페이지로 이동 💛💛
- db에서 이전 메세지 불러오기(시간도 함께) 💛💛
- 메시지 입력란과 전송버튼 기능 💛💛
- 입력한 메시지 db에 저장 후 socket으로 채팅방 리스트에 바로 보여주기 (시간도 함께) 💛💛

## 개발 시 주요사항

2. socket.io 메소드

- io: 전체
- socket: 본인만
- socket.io.method.md 파일에 메서드 정리해둠

3. 서버 코드와 클라이언트 코드 다른 파일에 작성하고 socket도 각각 사용해야 함

- server.js : 서버 코드만 (socket.io)
- socket.js : 클라이언트 코드만 (socket.io-client)

4. 페이지가 바뀌어도 소켓 연결 끊기지 않기 위해 최상위에서 한번만 연결 함

- socket.js에 socket.io-client 연결 후 import해서 사용

5. form 태그 vs div 태그

- form 태그: 엔터기 눌러도 onSubmit 실행됨, 웹 접근성(스크린리더) 좋음, input 태그와 button 태그가 같이 있을 경우 권장
- div 태그: 엔터키 직접 구현해야 함, 단순 클릭 버튼만 있을 경우 권장

6. cors를 socket.io와 express(HTTP 요청) 둘 다 적용해야 함

7. PostgreSQL

- 패키지 이름: pg
- 기본 포트: 5432
- 값 ($1, $2, $3, ...) 형식
- 결과값 얻을 때 result.row로 .row로 접근해야 함
- db.query("SQL문", [])로 사용, 두번째 인자는 배열로 받아서 대괄호로 감싸줘야 함
- Client는 1명 접속할 때 주로 사용하므로 동시 여러 접속자의 요청을 여러 연결로 해결하는 Pool로 사용 권장

8. 클라이언트와 백엔드 서버를 터미널 2개로 나눠서 실행해야 서버 연결이 됨

- npm run dev
- nodemon src/server/server.js

9. db쿼리문은 각걱 try/catch문 방식을 이용해 독립적으로 구조를 만들고 에러 처리를 해야 함

10. 페이지 이동 시 유지돼야 하는 데이터 / 모든 컴포넌트에서 공유해야하는 데이터는 socket 객체에 데이터를 저장해서 사용할 수 있음
    (socket 객체는 각 브라우저에서 실행되는거라 전혀 다른 메모리를 사용해 접속한 사람다가 각자의 socket객체가 생성됨)
    (새로고침하면 브라우저 메모리는 전부 초기화 됨)
    ex) socket.nickname = nickname;

11. sessionStorage 사용 (새로고침해도 로그인 유지 기능)

- localStorage는 탭이나 브라우저를 닫으면 바로 사라지지않고 한동안 남아있어서 채팅앱에는 탭이나 브러우저 닫았을 때 바로 로그아웃 되는 sessionStorage가 더 적합

12. 서버 송신할 땐 io나 socket 모두 사용할 수 있지만 클라이언트 수신 시에는 socket(socket.on)으로만 받음

13. e.stopPropagation() : 이벤트 버블링 막기(부모 요소의 동작 방지)

14. 데이터베이스 쿼리 작성 시 유의사항

- 실행할 코드를 드래그 후 실행해야 제대로 실행 함
- 코드 맨 끝에 커서 올린 후 실행하면 커서 전 까지 코드가 실행 됨
- 팁: 쿼리문에 여러 쿼리문 작성 후 원하는 쿼리문 만 드래그 하기

15. socket.io 기본 발생 이벤트

```js
io.on("connection", function (socket) {
    // 'connection' : socket.io의 기본 이벤트, 사용자가 웹사이트에 접속하면 자동으로 발생하는 이벤트

    socket.on("disconnect", () => {
        // 'disconnect' : 클라이언트와 서버와의 연결이 끊겼을 때 자동으로 발생하는 이벤트
    });
});
```

## 기간

- 기본 html 구조, 서버 연결, db 테이블, 기능 구현: 2026.05.04 - 2026.05.19
- css 적용:

## 3. 데이터베이스 테이블 쿼리문

1. users 테이블
   sql문
   CREATE TABLE IF NOT EXISTS users (
   id SERIAL PRIMARY KEY,
   nickname VARCHAR(20) NOT NULL UNIQUE
   );

2. rooms 테이블
   sql문
   CREATE TABLE IF NOT EXISTS rooms (
   id SERIAL PRIMARY KEY,
   room_name VARCHAR(50) NOT NULL,
   created_by VARCHAR(20) REFERENCES users(nickname) NOT NULL,
   created_at TIMESTAMP DEFAULT NOW() NOT NULL
   );

3. messages 테이블
   CREATE TABLE IF NOT EXISTS messages (
   id SERIAL PRIMARY KEY,
   content TEXT NOT NULL,
   user_name VARCHAR(20) REFERENCES users(nickname) NOT NULL,
   room_name VARCHAR(50) REFERENCES rooms(room_name) NOT NULL,
   created_at TIMESTAMP DEFAULT NOW() NOT NULL
   );
