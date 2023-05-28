async function navigateToDetailPage() {
  console.log("테스트")
  // HTML에서 상세 페이지로 이동할 요소를 선택합니다.

  const payloadData = localStorage.getItem("payload")
  const payloadObj = JSON.parse(payloadData); // JSON 문자열을 JavaScript 객체로 변환
  const Obj_is_subscribe = payloadObj.is_subscribe;

  if (!payloadData) {
    alert("회원가입 또는 로그인을 해주세요!")
  }

  console.log(Obj_is_subscribe)
  if (Obj_is_subscribe) {
    alert("이미 구독 중입니다!")
  }
  else {
    window.location.replace(`http://127.0.0.1:5500/window.html`)
  }
}

function checkSubscribe2() {
  const isSubscribe = JSON.parse(localStorage.getItem("payload"))['is_subscribe'];

  if (isSubscribe === true) {
    window.location.replace(`${frontend_base_url}/index.html`)
  }
}

checkLogin()
checkSubscribe2()