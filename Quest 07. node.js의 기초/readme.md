# Quest 07. node.js의 기초

# 1. node.js는 무엇인가요? node.js의 내부는 어떻게 구성되어 있을까요?

- **Node.js**는 Chrome V8 JavaScript 엔진으로 빌드된 JavaScript **런타임(프로그래밍 언어가 구동되는 환경)**이다.
- Node.js는 **REPL(Read, Eval, Print, Loop)**을 통해서 런타임을 제공한다.
    1. Read: 유저의 입력 값을 받아서 메모리에 저장
    2. Eval: 입력 값의 평가, 실행
    3. Print: Eval로 인해 반환된 값을 출력
    4. Loop: 1~3을 반복.
- 비동기 이벤트 주도 Javascript 런타임으로써 Node는 확장성 있는 네트워크 어플리케이션을 만들 수 있도록 설계되었다.

<br />

# 2.  npm이 무엇인가요? `package.json` 파일은 어떤 필드들로 구성되어 있나요?

- **NPM(Node Packaged Manager)**: Node.js로 만들어진 pakage(module)을 관리해주는 툴
    - 자바스크립트 라이브러리를 설치하고 관리하는 패키지 매니저.
    - NodeJS에서 사용할 수 있는 모듈들을 패키지화하여 모아둔 저장소 역할을 하며 설치/관리를 수행할 수 있는 CLI를 제공한다.
    - npm에서는 **package.json** 파일로 **프로젝트의 정보와 패키지들의 의존성**을 관리한다.

<br />

## 😎 package.json 필드

- **`name`**
    - 프로젝트 이름, 생략할 수 없다.
    - url로 사용되고 url이나 디렉토리에서 사용할 수 없는 이름은 사용할 수 없다.
- **`version`**
    - 프로젝트 버전, 생략할 수 없다.
    - Major Version. Minor Version. Patches 로 구성된다.(SemVer 버전 넘버링)
        - 예) **4.7.6**
- **`description`**
    - 프로젝트 설명, npm search로 검색된 리스트에 표시된다.
- **`keywords`**
    - 프로젝트를 검색할 때 참조되는 키워드
- **`homepage`**
    - 프로젝트 홈페이지 주소
- **`author`**
    - 프로젝트 작성자 정보로 한 사람만 지정한다.
- **`contributors`**
    - 프로젝트에 참여한 공헌자, 여러 사람을 배열로 지정할 수 있다.
- **`repository`**
    - 프로젝트 소스코드를 저장한 저장소의 정보
- **`scripts`**
    - NPM 명령어에 대한 지정
- **`config`**
    - 패키지 스크립트에서 사용될 수 있는 설정 정보
    - 예를 들어 `"config": { "port": "8080" }` 이면 해당 port 참조가 가능하다.
- **`dependencies`**
    - 프로젝트 의존성 관리를 위한 부분으로 프로젝트가 어떤 확장 모듈을 요구하는지 정리
    - 해당 Application을 설치할 때 이 내용을 참조하여 필요한 확장 모듈을 자동으로 설치한다.
- **`devDependencies`**
    - 개발할 때만 의존하는 확장 모듈을 관리
- **`license`**
    - 패키지 사용자들이 특정 패키지를 사용하기 위해 어떠한 권한을 얻는지, 어떤 금기사항이 있는지를 알게 하기 위해 명시하는 곳

<br />

# 3. npx는 어떤 명령인가요? npm 패키지를 `g` 옵션을 통해 글로벌로 저장하는 것과 그렇지 않은 것은 어떻게 다른가요?

- npm의 5.2.0 버전부터 새로 추가된 도구
- npm으로 패키지를 설치할 때 의존성 라이브러리들을 전역이나 로컬에 설치된 채 관리가 되면 전역으로 관리되고 있는 패키지도 업데이트 해주고, 로컬에서 관리되고 있는 패키지도 업데이트 해야 하므로 비효율적이다.
    
    ⇒ 이를 해결하기 위해 **npx**가 등장하였고, 일회성으로 원하는 패키지를 npm 레지스트리에 접근해서 **실행시키고 설치하는 도구**이다.
    
- **npx(Node Package eXecute)**: 노드 패키지 실행 담당
- `-g` 옵션 사용하지 않으면 node_modules 폴더가 만들어지면서 정의된 모든 패키지가 다운로드 된다.
- `-g` 옵션을 사용하면 node.js 설치 경로(`C:\Users\User\AppData\Roaming\npm`)에 전역으로 패키지가 다운로드 된다.

<br />

# 4. 자바스크립트 코드에서 다른 파일의 코드를 부르는 시도들은 지금까지 어떤 것이 있었을까요? CommonJS 대신 ES Modules가 등장한 이유는 무엇일까요?

- 최초의 Javascript는 간단한 모듈 시스템만 제공했다.
    - `<script src="./javascript.js"></script>`
    - 이러한 방식은 스크립트를 로드한 전역 컨텍스트에서 각 모듈 간 충돌이 발생할 수 있는 문제점이 있었다. ⇒ 모듈 간 스코프가 구분 되지 않는 문제
    - 이러한 문제점으로 인해 Javascript 모듈을 표준화하기 위해 **CommonJS**, **AMD(Asynchronous Module Definition)**이 등장한다.
- **CommonJS**는 Javascript, 브라우저, 서버 사이드 애플리케이션 등 범용적인 용도로 사용하기 위한 모듈 시스템 방법이다.

<br />

### CommonJS

- 모든 **종속성**이 **로컬 환경에 존재**해서 필요한 모듈을 바로 사용할 수 있는 환경을 전제했고, **동기적으로 모듈을 호출**하는 방식을 선택했다.
- 그러나 비동기 방식보다 느리고, 순환 잠조에 취약했다.

<br />

### AMD

- 문법이 다소 복잡하지만, 비동기적으로 모듈을 호출하는 방식을 선택했다.
- CommonJS보다 성능이 높고, 브라우저와 서버 사이드에서 모두 호환되는 방식이다.

<br />

### UMD

- CommonJS, AMD는 서로 지향하는 목적이 달랐고, CommonJS, AMD의 호환성 문제를 해결하기 위해 UMD가 등장했다.
- 두 방법의 코드를 모두 호환할 수 있다.
- 다만, CommonJS, AMD, UMD 모두 모듈 시스템의 부재로 근본적인 문제를 해결하지는 못했다. ⇒ 이를 해결하기 위해 ES6에서 모듈 시스템이 명세되었다.

<br />

### ES6

- Javascript는 언어 자체에서 모듈 시스템을 지원해야 한다는 필요성을 느끼고, 2015년 ES6 사양에서 표준 모듈 시스템이 명세되었다.
- 동기/비동기를 모두 지원하고, 문법도 단순하다.
- 실제 객체/함수를 바인딩하기 때문에 순환 참조 관리도 수월하다.
- 

```jsx
// ES6
import foo from "bar";

export default qux;
```

<br />

# 5. ES Modules는 기존의 `require()`와 동작상에 어떤 차이가 있을까요? CommonJS는 할 수 있으나 ES Modules가 할 수 없는 일에는 어떤 것이 있을까요?

- require()는 CommonJS를 사용하는 node.js문이지만, import()는 ES6에서만 사용된다.
- require()는 프로그램의 어느 지점에서나 호출할 수 있지만, import()는 파일의 시작 부분에서만 실행할 수 있다.
- ES6 Modules는 비교적 최근에 정의된 문법이어서 IE 같은 구형 브라우저에서는 제대로 동작하지 않는다는 문제가 있었다. ⇒ 이를 해결하기 위해 **트랜스파일러**가 등장하였다.
    - 트랜스파일러(Transpiler): 한 번 컴파일하면 구형 브라우저에서도 동작하는 Javascript 코드가 나오게 만드는 도구
    - **바벨(Babel)** 등이 트랜스파일러이다.