# socket.io 메서드 정리

- io: 전체
- socket: 본인만

1. 이벤트 송신 (emit)

- 괄호 안 기본 구조: .emit("이벤트이름", 데이터)
  => 데이터가 여러개일 때 .emit("이벤트이름", {키: 값, 키: 값, ...})

- io.emit() 접속한 전체에게 전송
- socket.emit() 특정 클라이언트(본인)에게만 전송
- socket.broadcast.emit() 본인 제외 전체에게 전송
- socket.emitWithAck() 나(본인)만전송 후 응답 올 때까지 대기

2. 이벤트 수신 (on)

- io.on("connection") 클라이언트 접속 감지
- socket.on() 특정 이벤트 수신
- socket.once() 특정 이벤트 딱 한 번만 수신
- socket.onAny() 들어오는 모든 이벤트 수신
- socket.onAnyOutgoing() 나가는 모든 이벤트 수신

3. 이벤트 제거 (off)

- socket.off() 특정 이벤트 리스너 제거
- socket.offAny() onAny 리스너 전체 제거
- socket.offAnyOutgoing() onAnyOutgoing 리스너 전체 제거
- socket.removeAllListeners() 모든 리스너 제거

4. 방 관련(room)

- socket.join(방이름) 방 입장
- socket.leave(방) 방 퇴장
- io.to(방).emit() 특정 방 전체에게만 전송
- io.except(방).emit() 특정 방 제외하고 전송
- socket.broadcast.to(방).emit() 나 빼고 방 안에만 전송

5. 연결 관련

- socket.id 소켓 고유 ID
- socket.connected 연결 여부 (true/false)
- socket.disconnect() 연결 강제 종료
- socket.recovered 연결 복구 성공 여부
- socket.handshake 연결 시 주고받은 정보
- socket.handshake.auth 연결 시 보낸 인증 정보

6. 타임아웃 관련

- socket.timeout(ms) 응답 대기 시간 설정
- socket.timeout(ms).emitWithAck() 시간 초과 시 에러 발생

7. 서버 정보 조회

- io.sockets.sockets 접속한 전체 소켓 목록
- io.engine.clientsCount 현재 접속자 수
