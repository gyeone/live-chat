# PostgreSQL sql 쿼리 정리

1. 데이터 조회(DQL): SELECT
2. 데이터 조작(DML): INSERT(삽입), UPDATE(수정), DELETE(삭제)
3. 데이터 정의(DDL): CREATE(생성)
4. 자주 사용하는 함수

- SELECT COUNT(\*) FROM messages; : 전체 행 수
- SELECT COUNT(user_id) FROM messages; : user_id 있는 행 수
- SELECT SUM(id) FROM messages; : id 합계
- SELECT AVG(id) FROM messages; : id 평균
- SELECT MAX(created_at) FROM messages; : 가장 최신 시간
- SELECT MIN(created_at) FROM messages; : 가장 오래된 시간

5. 제약 조건

- PRIMARY KEY: 기본키, 중복/NULL 불가
- UNIQUE: 중복 불가
- NOT NULL: NULL 불가
- DEFAULT: 기본값 설정
- REFERENCES: 외래키 (다른 테이블 참조)

6. 데이터 타입

- SERIAL : 자동증가 정수 (PG전용) 1, 2, 3
- INT : 정수 100
- FLOAT : 소수 3.14
- VARCHAR(n) : 최대 n자 문자열 "철수"
- TEXT: 길이제한 없는 문자열 긴 메시지
- BOOLEAN : 참/거짓 true, false
- TIMESTAMP : 날짜+시간 2024-01-01 12:00:00
- DATE : 날짜만 2024-01-01
- JSON : JSON 데이터 {"name": "철수"}
- JSONB : JSON (인덱싱 가능, PG전용) {"name": "철수"}

## pgAdmin4에서 쿼리 작성 하는 방법

1. pgAdmin4 실행
2. 왼쪽 트리에서 Servers → PostgreSQL 클릭
3. 비밀번호 입력 (설치할 때 설정한 비밀번호)
4. Databases 우클릭 → Create → Database
5. Database 이름에 "baekChat" 입력 → Save
6. baekChat 클릭 → Schemas → Tables
7. 상단 Tools → Query Tool 클릭
8. 아래 SQL 붙여넣고 실행 (▶ 버튼)
