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

### 페이지별 구현할 기능

1. login

- 닉네임 입력란 💛
- 입장 버튼 클릭 시 db에 닉네임 존재 여부 확인 후 없을 시 닉네임 db에 저장, 있으면 바로 입장 💛
- 닉네임 입력 후 chatList 페이지로 이동 💛

2. chatList

- 새로고침해도 접속자 유지
- 로그인 입장 메세지
- 접속자 수, 접속자 닉네임 리스트 표시
- 방 만들기 기능 (방 이름 설정 가능)
- 방이 이미 존재한다면 db에서 가장 최근 메시지 불러와 보여주기 (시간도 함께)
- 방 리스트 클릭 시 socket으로 해당 방 입장 (chatRoom 페이지로 이동)

3. chatRoom

- 컴포넌트로 형식으로 제작
- 이전 버튼으로 chatList 페이지로 이동
- db에서 이전 메세지 불러오기
- 메시지 입력란과 전송버튼 기능
- 입력한 메시지 db에 저장 후 socket으로채팅방 리스트에 바로 보여주기 (시간도 함께)

### 개발 시 주요사항

1. 다운 받은 라이브러리들

- react (개발환경)
- react-router-dom (클라이언트 라우팅 렌더링 관리)
- express (node.js 환경에서 웹 서버를 쉽게 만들어줌)
- cors (서로 다른 도메인 간의 요청 허용)
- pg (기능이 많고 복잡한 쿼리에 강한 db)
- socket.io (서버용 실시간 통신 관리)
- socket.io-client (클라이언트용 실시간 통신 관리)

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

### 기간

2026.05.04 -

## 3. 데이터베이스 테이블 쿼리문

1. users 테이블
   sql문
   CREATE TABLE IF NOT EXISTS users (
   id SERIAL PRIMARY KEY,
   nickname VARCHAR(50) NOT NULL UNIQUE
   );

2. rooms 테이블
   sql문
   CREATE TABLE IF NOT EXISTS rooms (
   id SERIAL PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   created_by INT REFERENCES users(id),
   created_at TIMESTAMP DEFAULT NOW()
   );

3. messages 테이블
   CREATE TABLE IF NOT EXISTS messages (
   id SERIAL PRIMARY KEY,
   content TEXT NOT NULL,
   user_id INT REFERENCES users(id),
   room_id INT REFERENCES rooms(id),
   created_at TIMESTAMP DEFAULT NOW()
   );
