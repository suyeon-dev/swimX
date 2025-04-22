# Swim X

<image src='https://swim-x.vercel.app/meta/og-image.png'>

<br/>

## 💡 서비스 소개

<p align='center'>
  <image src='https://swim-x.vercel.app/images/logo/logo-button.png' width=200>
<br />
  <span>
<a href='https://swim-x.vercel.app'>SwimX 바로가기</a>
  </span>
</p>

<br/>

<p align='center'>
수영 기록 기반의 일기 및 아카이빙 서비스, SwimX를 소개합니다! <br/>
SwimX는 수영인의 하루를 숫자와 감정으로 함께 기록하는 <b>수영 일기 서비스</b>입니다. <br/>
<br/>
운동 거리, 강도, 장비, 그리고 사진과 일기를 함께 기록하고,<br/>
날짜별 타임라인과 시각화 리포트로 <b>나만의 수영 아카이브</b>를 만들어보세요.
</p>

<br />
<br />

## 👩🏻‍💻 프로젝트 개요

- 기간 : 2025. 3. 31 ~ 2025. 4. 21 (총 3주, 1차 MVP)
- 인원 : 1명 (개인 프로젝트)
- 역할 : 기획, 디자인, 개발, 운영

<br />
<br />

## ✨ 주요 기능

| 기능              | 설명                                                    |
| ----------------- | ------------------------------------------------------- |
| 📝 수영 일기 작성 | 영법별 거리, 강도, 장비, 시간, 사진, 일기 등을 입력     |
| 🧠 유효성 검사    | React Hook Form + Zod 기반 정적 타입 및 실시간 검사     |
| 📊 데이터 시각화  | 영법별 거리 데이터를 Recharts로 시각화                  |
| 🗓️ 아카이빙       | 날짜별 기록 타임라인                                    |
| 👤 인증 시스템    | NextAuth.js + Supabase 기반 JWT 인증 (데모 로그인 포함) |

> ⛏️ 추가 예정: 수영장 지도, 개인 통계 대시보드, 커뮤니티 기능 등

<br />
<br />

## ⚙️ 기술 스택

| 영역         | 기술                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------ |
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Zustand, React Hook Form, Zod |
| **UI**       | shadcn/ui, Tiptap, Recharts                                                                |
| **Backend**  | Supabase (DB, Storage, REST API 연동)                                                      |
| **DevOps**   | Vercel                                                                                     |
