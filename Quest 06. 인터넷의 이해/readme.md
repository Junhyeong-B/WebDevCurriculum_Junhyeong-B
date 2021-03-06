# Quest 06. 인터넷의 이해

# 1. 인터넷은 어떻게 동작하나요? Internet Protocol Suite의 레이어 모델에 입각하여 설명해 보세요.

- **Internet Protocol Suite**: 인터넷에서 컴퓨터들이 서로 정보를 주고받는 데 쓰이는 통신규약(프로토콜)의 모음이다.
- Internet Protocol Suite 중 TCP와 IP가 가장 많이 쓰이기 때문에 **TCP/IP Protocol suite**라고도 불린다.
- TCP/IP는 패킷 통신 방식의 인터넷 프로토콜인 IP(Internet Protocol)와 전송 조절 프로토콜인 TCP(Transmission Control Protocol)로 이루어져 있다.
    - IP: 패킷 전달 여부를 보증하지 않고, 패킷을 보낸 순서와 받는 순서가 다를 수 있다(Unreliable datagram service).
    - TCP: IP에서 동작하는 프로토콜로, 데이터의 전달을 보증하고 보낸 순서대로 받게 해준다.

<br />

## ※ OSI 7계층

### 1. Physical Layer(물리 계층, 1계층)

- 모든 프로그램은 0과 1로 이루어져 있다.
- **두 대의 컴퓨터가 통신하려면** ⇒ 1을 보낼 때 +5V의 전기, 0을 보낼 때 -5V의 전기를 흘려보내면 0과 1의 전송이 가능하다.
    - 즉, 모든 데이터를 전송할 수 있다.
    - 단, 위 경우는 현실에서 정상적으로 작동하지 않는다.
    - 전압의 크기가 일정하지 않고, 이에 따라 주파수의 크기도 일정하지 않기 때문이다.
    - 물리 계층은 전선으로 연결된 두 대의 컴퓨터가 원본 데이터와 신호를 Encode, Decode 하는 과정을 통해 데이터를 전송할 수 있는 계층을 말한다.

**물리 계층**
- 0과 1의 나열을 아날로그 신호로 바꾸어 전선으로 흘려보낸다.**(Encoding)**
- 아날로그 신호가 들어오면 0과 1의 나열로 해석한다.**(Decoding)**
- 물리적으로 연결된 두 대의 컴퓨터가 0과 1의 나열을 주고받을 수 있게 해주는 모듈**(Module)**
- 1계층에 속하는 컴퓨터들은 여러 대의 컴퓨터가 데이터를 통신할 수 없다.

<br />

### 2. Data-Link Layer(데이터 링크 계층, 2계층)

- 두 대 이상의 컴퓨터가 데이터를 주고받고 싶다면, 물리적인 전선을 추가하여 전송이 가능하다.
- 다만, 컴퓨터 수가 늘어나면 그만큼 비효율적으로 비용이 증가한다.
- 따라서, 더미 허브라는 **전선**으로 이루어진 **상자**가 있고, 그 상자를 통해 각각의 컴퓨터를 연결한다면 여러 대의 컴퓨터가 데이터를 주고받을 수 있게 된다.
- 단, 여기서의 데이터는 연결된 모든 컴퓨터가 읽을 수 있는 상태가 되고, 이를 해결하기 위해 **스위치**를 사용한다.
- 만약 두 대의 컴퓨터가 같은 상자에 연결되어 있지 않더라도, 해당 상자끼리 연결이 되어있다면 매 컴퓨터마다 전선을 연결하는 것보다 효율적으로 데이터 통신이 가능해지는데 이러한 역할을 수행하는 것을 **라우터**라고 한다.
    - 라우터와 라우터를 연결해서 전 세계의 컴퓨터들을 연결한 것을 **인터넷**이라고 한다.

**데이터 링크 계층**

- 데이터 링크 계층은 같은 네트워크에있는 **여러 대의 컴퓨터들이 데이터를 주고받기** 위해서 필요한 모듈이다.

<br />

### 3. Network Layer(네트워크 계층, 3계층)

- 각 컴퓨터들이 갖는 고유한 주소를 IP주소 라고 하는데, 어떤 컴퓨터에게 데이터를 전송하고 싶다면 해당 컴퓨터의 IP 주소를 알아야 한다.
- 목적지의 IP 주소를 데이터 앞에 붙이는 것을 **패킷**이라고 한다.
- 특정 컴퓨터로 데이터를 전송할 때 패킷을 통해 데이터를 전송하게 되고, 각 라우터는 연결된 컴퓨터에 해당 IP 주소인 컴퓨터의 존재 유무를 확인하여 데이터를 계속 전송하여 도착지를 찾는다.

**네트워크 계층**

- 수많은 네트워크들의 연결로 이루어진 network에서 어딘가에 있는 목적지 컴퓨터로 데이터를 전송하기 위해 IP주소를 이용해 길을 찾고**(Routing)** 자신 다음의 라우터에게 데이터를 넘겨주는 것**(Forwarding)**이 네트워크 계층이다.

<br />

### 4. Transprot Layer(전송 계층, 4계층)

- 네트워크를 통해 여러 데이터들을 받았고, 이를 실행중인 프로그램(프로세스)에 전달하려고 할 때, 프로세스들은 포트번호를 갖고 있어야 한다.
- **포트 번호**는 하나의 컴퓨터에서 동시에 실행되고 있는 **프로세스들이** 서로 겹치지 않게 **가져야하는 정수 값**이다.
- 각 데이터들은 포트 번호를 갖고 있고, 컴퓨터는 프로세스의 포트 번호를 알고 있다.
- 따라서 해당 포트 번호를 통해 각 프로세스들에게 데이터를 전달하게 된다.

**전송 계층**

- 포트 번호를 이용하여 도착지 컴퓨터의 프로세스에 데이터가 도달하게 하는 **모듈**

<br />

### 5. Application Layer(응용 계층, 7계층)

- 현대의 인터넷은 OSI 모델이 아닌 TCP/IP 모델을 따르고 있다.
- TCP/IP 모델도 네트워크 시스템에 대한 모델이다.

<div align="center">
    <img src="https://user-images.githubusercontent.com/85148549/148728661-c4df594c-79bb-424a-bc63-436f0b945802.png">
</div>

- TCP/IP 소켓 프로그래밍
    - 운영체제의 Transport Layer에서 제공하는 API를 활용해서 통신 가능한 프로그램을 만드는 것
    - 해당 소켓 프로그래밍으로 클라이언트, 서버 프로그램을 따로 만들어서 동작 시킬 수 있다.
- 대표적인 Application Layer의 프로토콜은 **HTTP** 이다.

<br />

# 2. 우리가 브라우저의 주소 창에 `www.knowre.com` 을 쳤을 때, 어떤 과정을 통해 서버의 IP 주소를 알게 될까요?

1. 브라우저의 URL 파싱
    - **어떤 프로토콜을 통해 해당 URL에 요청할 것인지**(https 등)
    - **어떤 URL로 요청할 것인지**(여기선 www.knowre.com)
    - **어떤 포트로 요청할 것인지**(:443 등)
        - 명시적으로 **포트**를 선언하지 않았다면 브라우저에서는 설정된 기본값을 이용해 요청한다.
        - HTTP라면 80 포트, HTTPS라면 443 포트를 기본 값으로 요청

<br />

2. HSTS 목록 조회
    - HSTS(HTTP Strict transport security): HTTP를 허용하지 않고 HTTPS를 사용하는 연결만 허용하는 기능
    - 브라우저에서는 이 **HSTS 목록 조회**를 통해 해당 요청을 HTTPS로 보낼지 판단 후 **HSTS목록에 해당 URL이 존재한다면** 명시적으로 HTTP를 통해 요청한다 해도 브라우저가 이를 **HTTPS로 요청**한다.

<br />

3. URL을 IP주소로 변환
    - URL을 컴퓨터가 읽을 수 있는 IP주소로 변환해야 서로 통신이 가능하다.
    - 도메인 주소를 IP주소로 변환해주는 DNS(Domain Name System) 서버에 요청하여 해당 URL을 IP주소로 변환한다.

<br />

4. 라우터를 통해 해당 서버의 게이트웨이까지 이동
    - IP주소로 가야 하는 것은 알지만 어떻게 가야 할지 경로는 알 수 없다.
    - 따라서 이 요청이 네트워크를 타고 어떻게 이동할지는 네트워크 장비인 라우터의 라우팅을 통해 이루어진다.

<br />

5. ARP를 통해 IP주소를 MAC주소로 변환
    - 실질적인 통신을 하기 위해서는 논리 주소인 IP주소를 물리 주소인 MAC 주소로 변환해야 한다.
    - 이를 위해 해당 네트워크 내에서 ARP를 브로드 캐스팅하고, 해당 IP주소를 가지고 있는 노드는 자신의 MAC 주소를 응답한다.

<br />

6. 대상 서버와 TCP 소켓 연결
    - 대상 서버와 통신하기 위해 TCP 소켓 연결을 진행한다.
    - 소켓 연결은 3-way-handshake라는 과정을 통해 이루어진다.

<br />

7. HTTP(HTTPS) 프로토콜로 요청, 응답
    - 이제 연결이 확정되었으니 해당 페이지 **url**을 달라고 서버에게 요청한다.
    - 서버에서 해당 요청을 받고, 이 요청을 수락할 수 있는지 검사한다.
    - 서버는 이 요청에 대한 응답을 생성하여 브라우저에게 전달한다.

<br />

8. 브라우저에서 응답을 해석
- 서버에서 응답한 내용은 HTML, CSS, Javascript 등으로 이루어져 있는데, 브라우저는 이를 해석하고 페인팅하여 보여준다.

출처: [브라우저에 URL을 입력했을 때 발생하는 일들](https://deveric.tistory.com/97)