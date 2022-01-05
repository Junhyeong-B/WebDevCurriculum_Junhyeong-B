# Quest 3 자바스크립트와 DOM

# 1. 자바스크립트는 버전별로 어떻게 변화하고 발전해 왔을까요?

- ES1(1997년 6월) → ES2(1998년 6월) → ES3(1999년 12월) → ES5(2009년 12월)
- ES4의 경우 정치적인 문제로 폐기되었다.
- **ES6 | ECMAScript2015(ES2015)**
    - let, const, Default Parameter, Destructuring Assignment, Arrow function, 객체 리터럴, 클래스, 모듈, Promise, 전개 연산자
- **ECMAScript 2016 (ES2016)**
    - 제곱연산자 추가, Array.prototype.includes
- **ECMAScript 2017 (ES2017)**
    - 함수 표현식의 인자에서 trailing commas 허용, Object values/entries 메소드, async/await 등.
- **ECMAScript 2018 (ES2018)**
    - Promise.finally, Async iteration, object rest/spread property 등.
- **ECMAScript 2019 (ES2019)**
    - Object.fromEntries, flat, flatMap, Symbol.description, optional catch 등.

- 출처: [ECMA스크립트](https://ko.wikipedia.org/wiki/ECMA%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8)

<br />

## 1-1) 자바스크립트의 버전들을 가리키는 ES5, ES6, ES2016, ES2017 등은 무엇을 이야기할까요?

- **ECMA International**에서 정의한 표준화된 스크립트 프로그래밍 언어(ECMAScript)
    - Javscript를 표준화하기 위해 만들어졌고, 액션스크립트, J스크립트 등 다른 구현체도 포함되어 있다.
    - ECMA International은 정보 통신 시스템을 위한 국제적 표준화 기구이다.

<br />

# 2. 자바스크립트의 문법은 다른 언어들과 비교해 어떤 특징이 있을까요?

- 자바스크립트는 **객체(Object)기반** 스크립트 언어이다.
- 자바스크립트는 동적이며 타**입을 명시할 필요가 없는** 인터프리터 언어이다.
    - 컴파일 과정을 거치지 않고 소스 코드를 바로 실행할 수 있다.
- 객체 지향형, 함수형 프로그래밍을 표현할 수 있다.

<br />

## 2-1) 자바스크립트에서 반복문을 돌리는 방법은 어떤 것들이 있을까요?

- `for` 문, `for ... in` 문, `for ... of` 문
- `while`
- `Array.forEach()` 메서드

<br />

# 3. 자바스크립트를 통해 DOM 객체에 CSS Class를 주거나 없애려면 어떻게 해야 하나요?

- 아래의 메서드를 사용하여  DOM 객체에 접근할 수 있다.
    - `document.querySelector`
    - `document.getElementById`
    - `document.getElementsByClassName`
    - `document.getElementByTagName`
- 접근한 Element의 `Element.classList` 또는 `Element.className`를 통해 CSS Class를 주거나 없앨 수 있다.

<br />

# 4. 자바스크립트의 변수가 유효한 범위는 어떻게 결정되나요?

**1) var 키워드**

- var 키워드로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 된다.

<br />

**2) let, const 키워드**

- 함수를 포함한 모든 코드 블록을 지역 스코프로 인정하는 **블록 레벨 스코프**(block-level scope)를 따른다.

<br />

## 4-1) `var`과 `let`으로 변수를 정의하는 방법들은 어떻게 다르게 동작하나요?

### 1) var 키워드

- 변수 이름이 중복되었다면 초기화문이 있는 변수는 var 키워드가 없는 것 처럼 동작하고, 초기화문이 없는 변수는 무시된다.(이 때, 에러 발생은 하지 않는다.)
- 변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작한다.
- 변수 선언문 이전에 참조할 수 있다.(이 때 값은 undefined)

<br />

### 2) let 키워드

- 이름이 같은 변수를 선언하면 `SyntaxError` 가 발생한다.
- **변수 호이스팅이 발생하지 않는 것처럼 동작**한다.
- 변수 선언문 이전에 참조하면 `ReferenceError` 가 발생한다.

<br />

# 5. 자바스크립트의 익명 함수는 무엇인가요?

- function 키워드를 통해 함수를 정의할 수 있는데, 이 때 **식별자를 작성하지 않으면** 익명 함수이다.
- 즉시 실행 함수를 통해 전역 변수의 사용을 최소화하기 위해 함수가 사용될 경우 함수의 식별자를 생략해도 되므로 익명 함수가 사용될 수 있다.

```jsx
const Fn = function () {}
```

<br />

## 5-1) 자바스크립트의 Arrow function은 무엇일까요?

- ES6에서 추가된 함수 선언 방식 중 하나이다.
- `function` 키워드 대신 화살표 (`=>`)를 사용하여 간략하게 함수를 정의할 수 있다.
- 내부 동작도 기존의 함수보다 간략하다.
- 콜백 함수 내부에서 **this가 전역 객체를 가리키는 문제를 해결**하기 위한 대안으로 유용하다.