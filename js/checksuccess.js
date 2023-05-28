
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');
const amount = urlParams.get('amount');
const paymentKey = urlParams.get('paymentKey');
// 쿠키에서 액세스 JWT 토큰 가져오기
const cookies = document.cookie.split(';');

let jwtToken;
let accessToken;

for (let i = 0; i < cookies.length; i++) {
  const cookie = cookies[i].trim();
  const [name, value] = cookie.split('=');

  if (name === "jwt_token") {
    jwtToken = value;
    console.log(jwtToken)
    const cookieObject = JSON.parse(jwtToken.replace(/"/g, '').replace(/'/g, '"').replace(/\\054/g, ','));
    accessToken = cookieObject.access;
    break;
  }
}
// const jwtToken = getCookie('access');

console.log(accessToken);

const url = "http://127.0.0.1:8000/payments/success";
const secretKey = "test_sk_qLlDJaYngroLz95eAom8ezGdRpXx";
const userpass = secretKey + ':';
const encodedU = window.btoa(userpass);

const headers = {
  "Authorization": "Basic " + encodedU,
  "Content-Type": "application/json",
  "Authorization-Token": accessToken  // 액세스 토큰 값 설정
};

const params = {
  "orderId": orderId,
  "amount": amount,
  "paymentKey": paymentKey,
};

console.log(orderId, amount, paymentKey)
fetch(url + `?orderId=${orderId}&paymentKey=${paymentKey}&amount=${amount}`, {
  method: 'GET',
  headers: headers,
})
  .then(response => response.json())
  .then(data => {// 응답 결과 처리
    $('#payments-info').empty();
    const suppliedAmount = data.suppliedAmount;
    console.log(data, "테스트");
    console.log(data.res);
    const vat = data.vat;
    const totalAmount = data.totalAmount;
    const orderName = data.orderName
    const userName = data.user;
    const startDate = new Date(data.start_subscribe_at);
    const start_subscribe_at = startDate.toISOString().split('T')[0];
    const endDate = new Date(data.end_date);
    const end_date = endDate.toISOString().split('T')[0];
    const duration = data.duration;

    let temp_html = `
                  <p class="content">주문자 : ${userName}</p>
                  <p class="content">이용권 : ${orderName} - ${duration}일</p>
                  <p class="content">결제 금액 : ${totalAmount}</p>
                  <p class="content">부가세 : ${vat}</p>
                  <p class="content">부가세 제외 결제 금액 : ${suppliedAmount}</p>
                  <p class="content">구독시작일 : ${start_subscribe_at}</p>
                  <p class="content">구독종료일 : ${end_date}</p>
                  `
    $('#payments-info').append(temp_html)



  })
  .catch(error => {
    // 에러 처리
    console.error(error);
    window.location.replace(`http://127.0.0.1:5500/fail.html`)
  });

