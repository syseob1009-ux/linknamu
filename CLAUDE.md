@AGENTS.md

# 링크나무

내 모든 링크를 한 페이지에 모아 두고, 하나의 URL로 공유하는 서비스 (Link in Bio).

## 기술 스택

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS
- MongoDB Atlas (프로필 1건 + 링크 목록, 링크별 클릭 수 저장)
- Vercel 배포

## 핵심 기능

- 프로필 표시: 이름, 한 줄 소개, 프로필 사진 (`src/components/ProfileHeader.tsx`)
- 링크 카드 목록: SNS·블로그 링크를 카드로 나열 (`src/components/LinkCard.tsx`, `LinkList.tsx`)
- 클릭 수 집계: `/r/[id]` 라우트 핸들러가 클릭 시 `clicks`를 증가시키고 실제 URL로 리다이렉트

## 데이터 흐름

- `src/lib/mongodb.ts`: MongoDB 클라이언트 연결 (핫 리로드 간 재사용)
- `src/lib/data.ts`: `getProfile`, `getLinks`, `getLinkById`, `incrementClick`, `updateProfile`, `createLink`, `updateLink`, `deleteLink`
- `scripts/seed.mjs`: 초기 프로필/링크 데이터 삽입 (`npm run seed`, 최초 1회만 — 이후에는 `/admin`에서 관리)

## 관리자 화면 (`/admin`)

- `ADMIN_SECRET` 환경 변수로 접근하는 단일 사용자용 비밀번호 로그인 (`/admin/login`)
- `src/lib/auth.ts`: `ADMIN_SECRET` 값을 httpOnly 쿠키(`admin_session`)에 저장해 세션 확인
- 프로필 수정과 링크 추가/수정/삭제를 `/admin`에서 처리 (`src/app/api/admin/**`)

## 코드 규칙

- TypeScript 사용
- 컴포넌트는 `src/components/` 아래에 작성
- 환경 변수는 `.env.local`에 저장하고 절대 커밋하지 않음 (`.env.local.example` 참고)
- 모바일 우선 반응형 디자인

## 로컬 개발

1. `.env.local.example`을 `.env.local`로 복사하고 `MONGODB_URI` 채우기
2. `npm run seed`로 초기 데이터 삽입
3. `npm run dev`
