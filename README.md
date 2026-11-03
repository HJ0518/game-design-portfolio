# 게임 기획자 포트폴리오

한국어 · 다크 테마 · 반응형 · 빌드 없이 배포하는 HTML/CSS/JavaScript 사이트입니다.

## 미리보기

압축을 풀고 `index.html`을 브라우저에서 여세요. 서버나 설치 없이도 페이지 이동과 주문 예시가 동작합니다. 편집 후 새로고침하면 변경됩니다.

## 파일 구성

- `index.html`: 메인 소개, 대표작 3개, 보조작, 기획 방식, 연락처
- `blood-hunter.html`, `ramen.html`, `multiplayer.html`, `signal.html`: 개별 상세 페이지
- `assets/site-config.js`: 이름, 이메일, 이력서, 프로젝트별 이미지·영상·문서·저장소 링크
- `assets/style.css`: 색상·레이아웃·PC/모바일 스타일
- `assets/app.js`: 링크 표시와 주문 설명 예시
- `.nojekyll`: 정적 파일을 그대로 제공하기 위한 빈 파일
- `404.html`: 잘못된 주소 안내

## 내용을 바꾸는 방법

1. 이름과 이메일은 `assets/site-config.js`의 `profile`에 입력합니다.
2. 프로젝트 이미지를 `assets` 폴더에 넣고 해당 프로젝트의 `image` 값을 `assets/파일명.jpg`로 입력합니다. `imageAlt`에는 실제 화면 설명을 적습니다.
3. 영상은 `video`에 YouTube 등의 실제 주소, 문서는 `document`에 PDF 주소 또는 `assets/기획서.pdf`, 저장소는 `github`에 실제 주소를 넣습니다.
4. 값을 비워두면 자료 등록 예정 표시가 유지됩니다. 허위 링크는 만들지 않았습니다. 영상은 외부 링크로 열리며 자동 재생·임베드는 없습니다.
5. 소개 문구와 본문은 해당 HTML에서 수정합니다. 추상 커버는 HTML/CSS이며 실제 게임 이미지가 아닙니다. 실제 대표 이미지로 바꾸려면 해당 페이지의 `.art` 영역을 이미지 태그로 교체할 수 있습니다.
6. 연락처 등록 후 메인 페이지의 ‘이름 입력 예정’ 및 연락처 placeholder 문구도 확인해 수정하세요.

프로젝트 상세의 자료 이미지 영역은 링크 설정만으로 실제 이미지로 교체됩니다. 메인 추상 커버는 별도이며 의도적으로 실제 화면과 구별했습니다.

## GitHub Pages 무료 배포 (2026-11-03 확인)

이 패키지는 GitHub Pages용 정적 사이트입니다. GitHub 계정이나 저장소에 직접 배포된 상태는 아닙니다.

1. GitHub에 로그인하고 새 **Public** 저장소를 만듭니다. 처음이라면 이름을 `portfolio`로 정하면 됩니다.
2. **Add file → Upload files**에서 이 폴더의 **내용물**을 올립니다. 저장소 최상위에 `index.html`과 `assets`가 있어야 합니다. ZIP 파일 자체를 올리는 방식은 아닙니다.
3. `.nojekyll` 파일도 포함합니다. 숨김 파일이 업로드에서 빠졌다면 **Add file → Create new file**로 `.nojekyll`을 만들고 저장합니다.
4. **Settings → Pages → Build and deployment → Source → Deploy from a branch**를 선택합니다.
5. Branch를 **main**, 폴더를 **/(root)**로 정하고 **Save**를 누릅니다. 기본 브랜치 이름이 다르면 업로드한 브랜치를 선택합니다.
6. 저장소의 **Actions**에서 Pages 배포 완료를 확인하고 **Settings → Pages → Visit site**를 엽니다. 반영에는 수 분이 걸릴 수 있습니다.
7. 일반 프로젝트 저장소 주소는 `https://사용자이름.github.io/portfolio/`입니다. 사용자 대표 사이트를 원하면 저장소명을 정확히 `사용자이름.github.io`로 만들고 동일하게 배포합니다. 주소는 `https://사용자이름.github.io/`가 됩니다.
8. 이후 파일을 수정해 같은 브랜치에 저장하면 자동 갱신됩니다. 배포가 실패하면 Actions의 Pages 작업과 브랜치/폴더 설정을 확인하세요.

이 사이트는 상대 경로를 사용해 프로젝트 저장소의 하위 경로에서도 동작합니다. npm 설치나 별도 빌드, GitHub Actions 직접 작성은 필요하지 않습니다. 사용자 지정 도메인은 선택 사항이고 도메인 구매 비용은 별도입니다.

## 현재 제약과 선택 이유

- GitHub Free의 Pages는 공개 저장소에서 사용할 수 있습니다. 코드와 올린 자료가 공개되므로 공개 가능한 문서와 연락처만 넣으세요.
- 정적 호스팅이라 HTML/CSS/JS는 제공하지만 서버 프로그램·DB·이메일 전송은 실행하지 않습니다. 연락은 이메일 링크로 연결합니다.
- 배포 사이트 최대 1GB, 소스 저장소 권장 최대 1GB, 월 대역폭 소프트 제한 100GB, 배포 시간 제한 10분입니다. 기본 빌드는 시간당 10회 소프트 제한이며 사용자 지정 Actions 워크플로에는 이 빌드 제한이 적용되지 않습니다.
- 대용량 영상과 실행 파일은 외부 영상 서비스나 별도 배포 링크로 연결하는 편이 적합합니다.
- 포트폴리오 소개 용도에 맞는 구성입니다. GitHub Pages는 상거래·SaaS를 위한 무료 호스팅 용도가 아닙니다.

공식 근거:

- [GitHub Pages 소개](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [사이트 만들기](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [배포 브랜치 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [사용량 및 제한](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

## 참고 자료와 사실 구분

이전 ‘포트폴리오 보강 전략’ 대화와 사용자의 프로젝트 지정에 근거했습니다. 첨부된 `Game_Client_Portfolio_Guide_KR.pdf`는 기존 대화의 첨부 경로에서 확인했습니다. 클라이언트 프로그래머의 코드·성능 중심 항목을 게임 기획자의 플레이 규칙·수치·UX·의사결정·검증 자료로 변환했습니다. 가이드의 다른 예시 프로젝트나 공식 채용 배점으로 오해할 수 있는 점수표는 이 사이트에 이식하지 않았습니다.

| 가이드의 관점 | 기획자용 적용 |
| --- | --- |
| 첫 화면에서 직무와 대표작 확인 | 게임 기획자 소개 및 대표작 3개 |
| 핵심 코드와 구조 | 시스템 명세, 규칙, 흐름도, UX |
| 디버깅·성능 비교 | 플레이 관찰, 규칙 이해, 수치 밸런스 검증 |
| 개인 기여 증빙 | 담당 문서·시스템·변경 이력 |
| 코드·영상·빌드 연결 | 요약 → 상세 기획 → 실제 화면·영상·문서 |

현재 원본 기획서, 실제 빌드, 역할 증빙, 플레이 영상, 테스트 기록은 제공되지 않았습니다. 라멘의 상세 수치는 이전 AI 답변에 등장한 내용이라 원본 확인이 필요함을 명시했습니다. 신규 개선안과 주문 인터랙션은 이번 포트폴리오를 위한 제안/설명 예시이며 과거 구현이나 성과가 아닙니다.

자료 보강 우선순위: 본인 이름·연락처 → 프로젝트별 역할·기간·팀 규모 → 실제 화면 → 원본 기획서 → 영상 → 검증 기록. 다른 작품은 실제 자료가 확보된 뒤 추가하는 편이 적합해 현재는 ‘잔존 신호’를 보조작으로 구성했습니다.
