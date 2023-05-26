// 기본 URL
const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"


async function navigateToDetailPage() {
  console.log("테스트")
  // HTML에서 상세 페이지로 이동할 요소를 선택합니다.
  window.location.replace(`http://127.0.0.1:5500/window.html`)
}


async function handleSignup() {
  const username = document.getElementById("username").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const password2 = document.getElementById("password2").value

  const response = await fetch(`http://127.0.0.1:8000/users/signup/`, {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      "username": username,
      "email": email,
      "password": password,
      "password2": password2
    })
  })

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

  const response = await fetch(`http://127.0.0.1:8000/users/login/`, {
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

// 로그아웃
function handleLogout() {
  localStorage.removeItem("access")
  localStorage.removeItem("refresh")
  localStorage.removeItem("payload")
  window.location.replace(`http://127.0.0.1:5500/index.html`)
}

function checkLogin() {
  const payload = localStorage.getItem("payload");
  if (!payload) {
    window.location.replace(`http://127.0.0.1:5500/index.html`)
  }
}