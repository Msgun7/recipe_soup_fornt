
// 기본 URL
const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

async function navigateToDetailPage() {
  console.log("테스트")
  // HTML에서 상세 페이지로 이동할 요소를 선택합니다.
  window.location.replace(`http://127.0.0.1:5500/window.html`)
}

async function handleSignup() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const password2 = document.getElementById("password2").value

  const response = await fetch(`http://127.0.0.1:8000/users/signups/`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      "email": email,
      "password": password,
      "password2": password2
    })
  })
  console.log()

  if (response.status == 201) {
    document.getElementById("signup").querySelector('[data-bs-dismiss="modal"]').click();
    alert("회원가입이 완료되었습니다!")
  }
  else {

    const response_json = await response.json()

    const regex = /string='([^']+)'/;
    const match = JSON.stringify(response_json).match(regex)

    if (match && match.length > 1) {
      const cleanedString = match[1].replace("string=", "");
      alert("※ " + cleanedString);

    }
  }

}

// 로그인
async function handleSignin() {
  const email = document.getElementById("login-email").value
  const password = document.getElementById("login-password").value

  const response = await fetch(`http://127.0.0.1:8000/users/logins/`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      "email": email,
      "password": password,
    })
  })

  if (response.status == 200) {
    const response_json = await response.json()


    // localstorage에 저장하기
    localStorage.setItem('refresh', response_json.refresh)
    localStorage.setItem('access', response_json.access)

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''))

    localStorage.setItem('payload', jsonPayload)
    document.getElementById("login").querySelector('[data-bs-dismiss="modal"]').click();
    location.reload()
  }
  else {
    alert("※이메일 혹은 비밀번호가 올바르지 않습니다!")
  }
}

// // 로그아웃
// function handleLogout() {
//   localStorage.removeItem("access")
//   localStorage.removeItem("refresh")
//   localStorage.removeItem("payload")
//   window.location.replace(`http://127.0.0.1:5500/index.html`)
// }


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

  if (jwtToken) {
    const token = jwtToken.replace(/"/g, '').replace(/'/g, '"').replace(/\\054/g, ',')
    const response_json = JSON.parse(token);
    localStorage.setItem("refresh", response_json.refresh);
    localStorage.setItem("access", response_json.access);

    const base64Url = response_json.access.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    localStorage.setItem("payload", jsonPayload);

    document.cookie = "jwt_token=; expires=Thu, 01 Jan 2023 00:00:01 UTC; path=/;";  // 쿠키 삭제
  }
}

async function KakaoLogin() {
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

  if (!jwtToken) {
    window.location.replace(`${backend_base_url}/users/kakao/login/`);
  }

  const response = await fetch(`${backend_base_url}/users/kakao/login/`, {

  });

}

async function googleLogin() {
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

  if (!jwtToken) {
    window.location.replace(`${backend_base_url}/users/google/login/`);
  }

  const response = await fetch(`${backend_base_url}/users/google/login/`, {

  });

}

async function naverLogin() {
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

  if (jwtToken) {
    window.location.replace(`${backend_base_url}/users/naver/login/`);
  }

  const response = await fetch(`${backend_base_url}/users/naver/login/`, {

  });

}

async function githubLogin() {
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

  if (!jwtToken) {
    window.location.replace(`${backend_base_url}/users/github/login/`);
  }

  const response = await fetch(`${backend_base_url}/users/github/login/`, {

  });

}

// function uhandleLogout() {
//   localStorage.removeItem("access")
//   localStorage.removeItem("refresh")
//   localStorage.removeItem("payload")
//   window.location.replace(`http://127.0.0.1:5500/index.html`)
// }

function handleLogout() {
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

  if (jwtToken) {
    document.cookie = "jwt_token=; expires=Thu, 01 Jan 2023 00:00:01 UTC; path=/;";  // 쿠키 삭제
    window.location.replace(`${frontend_base_url}/index.html`)
  }

}

function checkLogin() {
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

  if (!jwtToken) {
    window.location.replace(`${frontend_base_url}/index.html`)
  }
}

// 회원탈퇴
async function handlesUserDelete() {
  let token = localStorage.getItem("access")
  const payload = localStorage.getItem("payload");
  const payload_parse = JSON.parse(payload)

  const response = await fetch(`${backend_base_url}/users/mypagelist/${payload_parse.user_id}/`, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    method: 'DELETE',
  })

  // localStorage.removeItem("access")
  // localStorage.removeItem("refresh")
  // localStorage.removeItem("payload")
  // window.location.replace(`${frontend_base_url}/index.html`)
}