# Get IT 해커톤 - MuKNU (먹누)

**이 웹앱은 프로덕션 수준의 보안적 조치가 적용되지 않았습니다.**

## 주요 기술

- **프론트엔드 프레임워크**: React + Vite (with TypeScript)
- **디자인 프레임워크**: Tailwind CSS, Framer Motion
- **백엔드**: Express.js + Sequelize
- **데이터베이스** - MySQL
- **폰트** - Pretendard

## 프로젝트 기본 구조

본 프로젝트는 프론트엔드, 백엔드, 유틸리티 3개의 하위 디렉토리로 구성되어 있습니다.

```python
.
├── backend/              # 백엔드 프로젝트
├── frontend/             # 프론트엔드 프로젝트
└── tools/                # 유틸리티 프로그램
```

## 프론트엔드

18.x.x버전 이상의 [Node.js](https://nodejs.org)이 필요합니다. 이 사이트는 Node.js v20.11.1 에서 테스트되었습니다.

초기 설정과 실행 및 빌드 방법은 다음과 같습니다.

### 초기 설정

우선 `frontend` 디렉토리에 `.env` 파일을 만들어야 합니다. 같은 폴더에 있는 `.env.example` 파일을 복사 및 붙여넣기해서 사용하세요.

다음과 같이 백엔드 URL과 카카오 API 자바스크립트 키를 작성하세요.

```sh
VITE_BACKEND_URL=http://localhost:8080     # 백엔드 URL
VITE_KAKAO_API_JS_KEY=kakao-api-key        # 카카오 API JavaScript 키 (REST 키 아님!)
```

### 패키지 설치

본 레포지토리를 클론한 후, 이 레포지토리 루트에서 다음 명령을 실행하여 패키지를 설치하세요.

```bash
npm install
```

### 실행하기

빌드 없이 개발 모드로 즉시 실행하려면 아래 명령을 실행하세요. 기본 포트는 `5173`입니다.

```bash
npm run dev
```

`http://localhost:5173` 에서 웹서버가 열립니다.

### 빌드하기

소스를 빌드하려면 다음 명령을 실행하세요. `frontend` 디렉토리에 `dist` 폴더가 생성되어 정적 파일이 담기게 됩니다.

```bash
npm run build
```

### 프론트엔드 주요 구조

```python
frontend/
├── public/               # 정적 파일 폴더
├── src/                  # 소스 코드 폴더
│   ├── assets/           # 이미지 등 리소스 폴더
│   ├── components/       # 컴포넌트 폴더
│   ├── types/            # 타입 정의 폴더
│   │   └── kakaoapi.ts   # 카카오 API에 대한 타입 정의 파일
│   ├── App.tsx           # 메인 페이지
│   ├── index.css
│   └── main.tsx          # 실행 시작지점
├── .env                  # Env 파일
├── .env.example          # Env 파일 예시
├── index.html
├── package.json
├── tailwind.config.js    # Tailwind CSS 라이브러리 설정 파일
└── vite.config.ts        # Vite 설정 파일
```

## 백엔드

### 초기 설정

프론트엔드와 마찬가지로, `backend` 디렉토리에 `.env` 파일을 세팅해야 합니다. 같은 폴더의 `.env.example` 파일을 복사 및 붙여넣기하여 사용하세요.

```sh
HOST=0.0.0.0                                  # 호스트
PORT=8080                                     # 포트
KAKAO_API_REST_BASE=https://dapi.kakao.com    # 카카오 API 호스트
KAKAO_API_REST_KEY=kakao-api-key              # 카카오 API REST 키 (JS 키 아님!)
```
