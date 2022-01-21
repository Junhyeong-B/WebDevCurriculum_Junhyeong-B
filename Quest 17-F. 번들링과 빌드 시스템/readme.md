# Quest 17-F. 번들링과 빌드 시스템

# 1. 여러 개로 나뉘어진 자바스크립트나 이미지, 컴포넌트 파일 등을 하나로 합치는 작업을 하는 것은 성능상에서 어떤 이점이 있을까요?

- 같은 타입(HTML, CSS, JS 등)의 파일을 하나로 합쳐 요청 하고 응답을 받기 때문에 네트워크 비용이 감소한다.
- 네트워크 비용이 감소하는 만큼 요청, 응답 속도가 빨라지고, 웹 사이트의 로딩 속도가 높아진다.

<br />

## 1-1) 이미지를 Data URL로 바꾸어 번들링하는 것은 어떤 장점과 단점이 있을까요?

**장점**

- HTTP 요청을 절약할 수 있다.
- HTML 파일로 관리할 수 있다.

<br />

**단점**

- 기존 파일보다 용량이 커진다.
- 미디어 내의 유효하지 않은 파라미터들이나 오타들은 무시되지만 오류가 발생하지 않는다.
- Data URL에 길이 제한이 있는 브라우저도 존재한다.(오페라 11 브라우저는 65,535 제한)

<br />

# 2. Source Map이란 무엇인가요? Source Map을 생성하는 것은 어떤 장점이 있을까요?

- 소스 맵(Source Map): 배포용으로 빌드한 파일과 원본 파일을 서로 연결시켜주는 기능.
- 보통 서버에 배포를 할 때 성능 최적화를 위해 HTML, CSS, JS와 같은 웹 자원들을 압축하는데,
    
    → 압축하여 배포한 파일에서 에러가 발생했을 때 디버깅하기 위해 에러 발생 부분이 원본 소스의 어떤 부분인지 확인하는 기능을 제공한다.
    

<br />

**장점**

- 파일들을 압축하여 배포했을 때 발생할 수 있는 에러를 파악할 수 있다.
- 코드상 위치를 기억하고 알려주기 때문에 라인에서 어떤 오류가 났는지 확인할 수 있다.

<br />

# 3. Webpack의 필수적인 설정은 어떤 식으로 이루어져 있을까요?

### 3-1) Entry

- 웹팩에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 자바스크립트 파일 경로.
- 아래 코드는 `src` 폴더 밑의 `index.js` 을 대상으로 웹팩이 빌드를 수행하는 코드

```jsx
// webpack.config.js
module.exports = {
  entry: './src/index.js'
}
```

- 엔트리 포인트는 1개가 될 수도 있고 여러개가 될 수도 있다.
    - 여러개인 경우 SPA 형태가 아닌 MPA(Multi Page Application)에 적합하다.

<br />

### 3-2) Output

- 웹팩을 돌리고 난 결과물의 파일 경로.
- `entry` 속성과는 다르게 객체 형태로 옵션들을 추가해야 한다.

```jsx
// webpack.config.js
module.exports = {
  output: {
    filename: 'bundle.js'
		path: path.resolve(__dirname, './dist')
  }
}
```

- 최소 `filename`은 지정해줘야 하고, `path` 속성과 함께 정의한다.
    - `filename`: 웹팩으로 빌드한 파일의 의미
    - `path`: 해당 파일의 경로를 의미

<br />

### 3-3) Loader

- 웹팩이 웹 애플리케이션을 해석할 때 **자바스크립트 파일이 아닌 웹 자원**(HTML, CSS, Images, 폰트 등)들을 **변환**할 수 있도록 도와주는 속성.
- `module`라는 이름을 사용한다.

```jsx
// webpack.config.js
module.exports = {
  module: {
    rules: []
  }
}
```

<br />

**Loader가 필요한 이유**

```jsx
// app.js
import './common.css';

console.log('css loaded');
```

```css
/* common.css */
p {
  color: blue;
}
```

```jsx
// webpack.config.js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  }
}
```

⇒ 이렇게 작성한 후 **웹팩으로 빌드**하면 app.js에서 import한 common.css 파일을 해석하기 위해 적절한 로더를 추가해달라는 **에러가 발생**한다.

⇒ 따라서 아래와 같이 CSS 로더를 설치하고 Loader 항목을 추가해주면 해결할 수 있다.

<br />

```
npm i css-loader -D
```

```jsx
// webpack.config.js
module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader']
      }
    ]
  }
}
```

- `test` : 로더를 적용할 파일 유형 (일반적으로 정규 표현식 사용)
- `use` : 해당 파일에 적용할 로더의 이름
- 자주 사용되는 Loader는 다음과 같다.
    - **Babel Loader**
    - **Sass Loader**
    - **File Loader**
    - **Vue Loader**
    - **TS Loader**

<br />

### 3-4) Plugin

- 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성.
- Loader는 파일을 해석하고 변환하는 과정에 관여하는 반면, Plugin은 해당 결과물의 형태를 바꾸는 역할을 한다.

```jsx
// webpack.config.js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.ProgressPlugin()
  ]
}
```

- **HtmlWebpackPlugin:** 웹팩으로 빌드한 결과물로 HTML 파일을 생성해주는 플러그인
- **ProgressPlugin:** 웹팩의 빌드 진행율을 표시해주는 플러그인
- 자주 사용하는 플러그인
    - **split-chunks-plugin**
    - **clean-webpack-plugin**
    - **image-webpack-loader**
    - **webpack-bundle-analyzer-plugin**

<br />

# 4. Webpack을 이용하여 HMR(Hot Module Replacement) 기능을 설정하려면 어떻게 해야 하나요?

- HMR(Hot Module Replacement): 모든 종류의 모듈을 새로고침 할 필요 없이 런타임에 업데이트 할 수 있는 기능.
- webpack-dev-server 설정을 업데이트하고 webpack의 내장 HMR 플러그인을 사용하면 된다.
- `webpack-dev-server` v4.0.0부터 Hot Module Replacement가 기본적으로 활성화되어 있다.

```jsx
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
     app: './src/index.js',
-      print: './src/print.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
+     hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
```