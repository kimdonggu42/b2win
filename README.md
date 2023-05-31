## B2WIN 과제
newscatcher api를 이용하여 헤드라인과 뉴스를 검색할 수 있습니다.

## 배포 주소
https://b2win-newscatcher.web.app/

## Key Features
- 로그인, 로그아웃
- 뉴스 검색

## Install
```
$ npm install
```

## Usage

```
$ npm run start
```


## Usage example
- 요구 사항 1
  - 상단의 login 버튼을 클릭하여 로그인 화면으로 진입 할 수 있고, logout 버튼 클릭 로그아웃 됩니다.
  - 로그인 상태에 따라 헤더의 버튼이 login과 logout으로 변경됩니다.
  - 로그인 상태를 로컬스토리지에 저장하여 유지되도록 했습니다.

![May-30-2023 17-18-38](https://github.com/kimdonggu42/b2win/assets/115632555/0ab81d55-b6ad-40bb-9213-7343d67acf16)

- 요구 사항 3
  - 사용자는 news 검색 시 country, topic, searchIn(키워드가 title에 포함된 뉴스를 찾을지 아니면 summary에 포함된 뉴스를 찾을지)을 선택할 수 있으며, search 버튼을 클릭하여 검색할 수 있습니다.
  - 사용자는 검색한 news를 relevancy(가장 관련서이 높은 순서), date(가장 최근에 게시된 순서), rank(순위가 가장 높은 출처 순서) 별로 정렬 할 수 있습니다.
  - 사용자는 하단의 페이지 버튼을 클릭하여 다음, 이전 페이지로 이동할 수 있습니다.
  - 사용자는 특정 news를 클릭하여 상세한 내용을 확인할 수 있습니다.

![May-30-2023 17-21-31](https://github.com/kimdonggu42/b2win/assets/115632555/28d51197-9420-4fb1-af01-42f4082cbe69)

- 요구 사항 4
  - 사용자는 로그인 여부와 상관 없이 상단 헤더의 버튼들을 통해 어떤 페이지에서라도 각 페이지(로그인페이지, 헤드라인 페이지, 뉴스 페이지)로 이동할 수 있습니다.

![May-30-2023 17-32-15](https://github.com/kimdonggu42/b2win/assets/115632555/fd8b8d3d-d098-43dd-842b-b1bdf4c16049)


- 요구 사항 5
  - 서비스는 Firebase로 배포했습니다.

<img width="1724" alt="스크린샷 2023-05-30 오후 5 42 00" src="https://github.com/kimdonggu42/b2win/assets/115632555/97e0b982-c717-44e0-b37a-1b10db729676">

