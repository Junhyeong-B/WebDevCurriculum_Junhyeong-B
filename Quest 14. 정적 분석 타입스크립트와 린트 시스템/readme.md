# Quest 14. 정적 분석: 타입스크립트와 린트 시스템

# 1. 코드를 린팅하는 것의 장점은 무엇일까요?

- 협업을 통해 코드를 작성하게 되면 코딩 컨벤션을 지키는 것이 중요해진다.
- 린팅하지 않으면 불규칙적인 문법이 남용되고, 추후 유지 보수 시에 불편함이 많아진다.

<br />

**장점**

- 코드의 가독성을 높여준다.
- 유지 보수가 원활해진다.
- 에러나 버그가 줄어든다.

<br />

# 2. 타입스크립트는 어떤 언어인가요?

- 자바스크립트 기반 정적 타입 문법을 추가한 프로그래밍 언어.
- 자바스크립트는 동적 타입의 인터프리터 언어로 런타임에서 오류를 발견할 수 있다.
- 타입스크립트는 정적 타입의 컴파일 언어로 컴파일러 또는 바벨 등으로 자바스크립트 코드로 변환된다.
    
    
- 타입스크립트는 자바스크립트 기본 문법에 타입스크립트 문법을 추가한 언어이다.
- 타입스크립트는 ES6에서 추가된 문법을 포함하고 있고, 클래스, 인터페이스, 상속, 모듈 같은 객체 지향 프로그래밍 패턴을 제공한다.

<br />

## 2-1) 타입스크립트를 사용했을 때 얻을 수 있는 장점은 무엇인가요?

- 코드 작성 단계에서 타입을 체크해 오류를 확인할 수 있다.
- 미리 타입을 결정하기 때문에 속도가 빠르다.
- 코드 자동완성이나 실행 전 피드백을 제공하여 작업과 동시에 디버깅이 가능해 생산성을 높일 수 있다.

<br />

## 2-2) 타입스크립트를 사용하면서 타입이 없는 라이브러리나 프레임워크를 사용해야 할 경우에는 어떻게 해야 할까요?

- type, interface 등의 키워드를 통해 타입을 지정해 사용한다.
- 불가피한 경우 unknown, any 타입을 적절하게 사용한다.
- 자바스크립트와 100% 호환되므로 타입 작성이 불가능한 경우 우선적으로 자바스크립트를 기반으로 작성하고 점진적으로 타입스크립트로 전환한다.

<br />

## 2-3) any 타입을 남용하는 것은 왜 좋지 않을까요?

- any 타입은 해당 변수나 반환문에 대해 더이상 타입 검사를 진행하지 않는 것을 의미한다.
- any 타입을 남용하는 것은 결국 자바스크립트에서 코드량만 늘어난 것과 다르지 않다.
- 타입 검사를 하지 않기 때문에 개발자 입장에서 문제가 없는 코드라고 판단할 수 있고, 문제가 발생할 상황을 예측하기 어려워진다.

<br />

# 3. 린트와 빌드 등의 과정을 개발 싸이클에서 편하게 수행하려면 어떻게 하는 것이 좋을까요?

- ESLint, prettier 라이브러리를 적용하고, 규칙을 적절하게 작성하여 사용한다.