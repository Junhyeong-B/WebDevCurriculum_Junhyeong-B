# Quest 13. 웹 API의 응용과 GraphQL

# 1. GraphQL API는 무엇인가요? REST의 어떤 단점을 보완해 주나요?

- GrapyhQL: API용 쿼리 언어로 데이터 베이스 시스템에 저장된 데이터를 효율적으로 가져오는 것이 목적으로 작성되었다.
    - REST API 를 통해서 GET 요청한다고 가정할 때 해당 API를 통해 받아올 수 있는 모든 데이터를 가져온다면, GraphQL을 통해 GET 요청한다면 필요한 데이터만 받아올 수 있다.

<br />

- REST API: URL, METHOD 등을 조합하여 다양한 EndPoint가 존재하고, 각 EndPoint마다 데이터베이스 쿼리가 달라진다.
- GraphQL: 단 하나의 EndPoint가 존재하고, 불러오는 데이터의 종류를 쿼리 조합을 통해서 결정한다.
- GraphQL을 사용함으로써 REST API가 데이터를 너무 많이 전달하거나 너무 적게 전달하여 불필요한 데이터 전송하는 것을 해결할 수 있다.

<br />

# 2. GraphQL 스키마는 어떤 역할을 하며 어떤 식으로 정의되나요?

- GraphQL은 어떤 언어로든 작성할 수 있고, Javscript같은 특정 언어 문법에 의존할 수 없기 때문에 **스키마 언어(GraphQL schema language)**를 정의하여 사용한다.
- GraphQL 스키마의 가장 기본적인 구성 요소는 객체 타입이고, 객체 타입은 서비스에서 가져올 수 있는 객체의 종류와 그 객체의 필드를 나타낸다.

<br />

```
type Character {
  name: String!
  appearsIn: [Episode]!
}
```

- `Character` 는 GraphQL 객체 타입 이다.(필드가 있는 타입)
    - 스키마의 대부분의 타입은 객체 타입입니다.
- `name` 과 `appearIn` 은 `Character` 타입의 필드이다.
    - `name` 과 `appearIn` 은 GraphQL 쿼리의 `Character` 타입 어디서든 사용할 수 있는 필드
- `String` 은 내장된 스칼라 타입 중 하나이다.
    - 이는 스칼라 객체로 해석되는 타입이며 쿼리에서 하위 선택을 할 수 없다.
- `String!` 은 필드가 non-nullable 임을 의미한다.
    - 이 필드를 쿼리할 때 GraphQL 서비스가 항상 값을 반환한다는 것을 의미한다.
    - 타입 언어에서는 이것을 느낌표로 나타낸다.
- `[Episode]!` 는 `Episode` 객체의 배열(array) 을 나타낸다. 또한 non-nullable 이기 때문에 `appearIn` 필드를 쿼리할 때 항상(0개 이상의 아이템을 가진) 배열을 기대할 수 있다.

<br />

# 3. GraphQL 리졸버는 어떤 역할을 하며 어떤 식으로 정의되나요?

- 리졸버는 각 쿼리와 뮤테이션이 날아왔을 때 어떻게 대응할 것인지 응답 방식을 결정해 둔다.
- 그 후 서버가 실행되면, 클라이언트가 미리 약속된 쿼리 혹은 뮤테이션을 요청하고 서버는 리졸버에서 결정되어 있는 응답을 반환한다.

<br />

```graphql
// 스키마
const typeDefs = `
  type Query { // 쿼리 구조를 결정함
    totalPets: Int! // 저장된 반려동물의 총 갯수를 질의하는 쿼리
  }
  
  type Mutation { // 뮤테이션 구조를 결정함
    addPet(name: String! age: Int!): Boolean! // 새로운 반려동물을 저장하는 뮤테이션, 성공하면 true 반환
  }
`;

// 리졸버
const resolvers = {
  Query: {
    totalPets: () => pets.length, // totalPets 쿼리가 왔을 때 어떻게 응답할 것인지 기록
  },

  Mutation: {
    addPet: (parent, args) => { // addPet 뮤테이션이 왔을 떄 어떻게 응답할 것인지 기록
      const newPet = {
        id: _id++, // 아이디 추가
        ...args.input, // 인자로 들어온 값을 펼침 연산자로 주입
      }
      pets.push(newPet); // 데이터베이스에 삽입

      return true; // true 반환
    }
  },
};
```

<br />

# 4. 클라이언트 상에서 GraphQL 요청을 보내려면 어떻게 해야 할까요?

- GraphQL 서비스는 GraphiQL이나 Playground와 같은 내장 UI를 제공하는데, 이를 사용하여 GraphQL 요청을 보낼 수 있다.
- Web API인 fetch를 통해서도 GraphQL API를 호출할 수 있다.

```jsx
const endpoint = 'https://fakerql.com/graphql';
const query = `{
  Todo(id: "cjkskilwt00422c10dezjgdhw") {
    id
    title
    completed
  }
}`fetch(
  endpoint,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  }
)
  .then(res => res.json())
  .then(json => console.log(JSON.stringify(json.data, null, 2)));

// 콘솔 출력
{
  "Todo": {
    "id": "cjkskilwt00422c10dezjgdhw",
    "title": "Horizontal",
    "completed": false
  }
}
```

<br />

## 4-1) Apollo 프레임워크(서버/클라이언트)의 장점은 무엇일까요?

- Apollo Client는 GrpahQL API를 호출하기 위해 사용되는 라이브러리이다.

<br />

**장점**

- Query 및 Mutation 직접 전송
    - API 서버에서 데이터를 가져오기 위해 번거로운 네트워크단의 HTTP 요청을 신경 쓸 필요가 없어진다.
- 전송받은 데이터 캐싱
    - 클라이언트의 반복 요청을 줄여 서버 부하를 줄일 수 있을 뿐만 아니라, 서비스를 이용하는 사람들에게 더 나은 사용자 경험을 제공할 수 있다.
- Local state 관리
    - 클라이언트 만의 Local state를 만들어 Query, Mutation, Resolver의 사용이 가능하다. 서버에서 받아온 데이터와 클라이언트에서 관리하는 데이터를 병합할 수 있다.