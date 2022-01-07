# [Quest 2 CSS의 기초와 응용](https://github.com/Knowre-Dev/WebDevCurriculum/tree/master/Quest02)

# 1. CSS를 HTML에 적용하는 세 가지 방법은 무엇일까요?

1. HTML 태그에 `Inline` CSS 코드 작성
2. HTML 문서 내 `<style></style>` 태그 내부에 CSS 코드 작성
3. .css 파일 등을 생성하여 `<link>` 태그로 연결

<br />

## 1-1) 세 가지 방법 각각의 장단점은 무엇일까요?

1. Inline 방식
    - 속성과 값만 입력하면 되므로 간결하다.
    - 자손, 형제 태그들을 선택할 때 한계가 있다.
    - `id`, `class`, `tag` 보다 우선순위가 높아 의도하지 않는 스타일을 적용시킬 수 있다.
2. `<style></style>` 태그 CSS 작성
    - HTML 문서 어디에 작성해도 작동한다.
    - HTML 문서 내의 여러 요소를 한 번에 꾸밀 수 있다.
    - 재사용이 불가능하다.
3. .css 파일
    - HTML 문서 내의 여러 요소를 한 번에 꾸밀 수 있다.
    - 여러 HTML 문서에 사용할 수 있다.

<br />

# 2. CSS 규칙의 우선순위는 어떻게 결정될까요?

- CSS 규칙의 우선순위는 다음과 같다.
    - `!impotant` > `inline style` > `#id` 선택자 > `.class` | `pseudo class` > `tag` 선택자
- 아래 우선순위 점수를 선택자의 개수에 따라 합산하여 많은 점수를 받은 선택자가 우선된다.
    - `inline` 1000점
    - `id` 100점
    - `class` | `Pseudo-classes` 10점
    - `tag` 1점

<br />

# 3. CSS의 박스모델은 무엇일까요? 박스가 화면에서 차지하는 크기는 어떻게 결정될까요?

<div align="center">
  <img src="https://user-images.githubusercontent.com/85148549/148014581-9b247c70-458c-4d27-bddc-0fd194350861.png" />
</div>

- 출처: [TCPschool](http://www.tcpschool.com/css/css_boxmodel_boxmodel)
- 박스 모델은 HTML 요소를 content, padding, border, margin로 구분하여 크기가 결정된다.
    - **content**: 텍스트나 이미지가 들어있는 내용
    - **padding**: content와 border 사이의 간격
    - **border**: content, padding을 모두 감싸는 테두리
    - **margin**: border와 이웃하는 요소 사이의 간격

<br />

# 4. `float` 속성은 왜 좋지 않을까요?

- float 속성을 사용하면 해당 요소는 block 요소로 바뀐다.
- 의도치 않게 float 속성을 부여한 요소와 부여하지 않은 요소가 겹쳐보일 수 있다.
- float 속성을 해제하기 위해 clear 속성을 사용하여  float을 부여하고 싶은 요소, 부여하고 싶지 않은 요소를 구분하여 속성을 부여해야 한다.

<br />

# 5. Flexbox(Flexible box)와 CSS Grid의 차이와 장단점은 무엇일까요?

- Flex는 1차원 레이아웃 구조를 작업할 때 사용한다.
- Grid는 2차원 레이아웃 구조를 작업할 때 사용한다.

<br />

# 6. CSS의 비슷한 요소들을 어떤 식으로 정리할 수 있을까요?

- 의미론적으로 비슷한 구조를 갖고 있다면 **class** 속성을 동일하게 부여하여 정리할 수 있다.
- BEM 방법론을 사용하여 코드를 간결하게 작성할 수 있다.
- 이미 기본값이 적용되어 있는 코드는 작성하지 않는다. (block 요소에 width: 100%)
- 부모 요소에 적용하면 자식 요소에도 적용되는 속성들은 중복해서 작성하지 않는다.

<br />

# 7. CSS가 브라우저에 의해 해석되고 적용되기까지 내부적으로 어떤 과정을 거칠까요?

1) 브라우저는 HTML을 로드한다.
2) HTML을 DOM으로 변환한다,
3) HTML 문서에 연결된 이미지, 비디오 등의 리소스와 CSS를 가져온다.
4) 가져온 CSS를 분석하고 선택자 유형별로 정렬한다.(Render tree 파싱, 배치)
5) 페이지의 시각적 표시를 화면에 표시한다.(Painting)

<div align="center">
  <img src="https://user-images.githubusercontent.com/85148549/148014731-b72c25fa-9c69-4641-97d8-529911788678.png" />
</div>

- 출처: [mozilla CSS 작동 방식](https://developer.mozilla.org/ko/docs/Learn/CSS/First_steps/How_CSS_works)