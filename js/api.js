// 기본 URL
const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

// 쿠키에 있는 값을 로컬스토리지에 저장
function moveJwtTokenFromCookieToLocalStorage() {
  const cookies = document.cookie.split(';');

  let jwtToken;

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const [name, value] = cookie.split('=');

    if (name === "jwt_token") {
      jwtToken = value;
      break;
    }
  }
  console.log(jwtToken)

  if (jwtToken) {
    const token = jwtToken.replace(/"/g, '').replace(/'/g, '"').replace(/\\054/g, ',')
    console.log(token)
    const response_json = JSON.parse(token);
    localStorage.setItem("refresh", response_json.refresh);
    localStorage.setItem("access", response_json.access);

    console.log(token)

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload);

    document.cookie = "jwt_token=; expires=Thu, 01 Jan 2023 00:00:01 UTC; path=/;";  // 쿠키 삭제
  }
}

async function googleLogin() {
  const key = localStorage.getItem("key");

  if (key == null) {
    window.location.replace(`${backend_base_url}/users/google/login/`);
  }

  const response = await fetch(`${backend_base_url}/users/google/login/`, {

  });
  
}

function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");

  window.location.replace(`${frontend_base_url}/index.html`);
}


async function navigateToDetailPage() {
  console.log("테스트")
  // HTML에서 상세 페이지로 이동할 요소를 선택합니다.
  window.location.replace(`http://127.0.0.1:5500/window.html`)
}


// 로그인 여부 체크
function checkLogin() {
  const payload = localStorage.getItem("payload");
  if (!payload) {
      window.location.replace(`http://127.0.0.1:5500/index.html`)
  }
}
