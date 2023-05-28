
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');
const amount = urlParams.get('amount');
const paymentKey = urlParams.get('paymentKey');
// const payload = JSON.parse(localStorage.getItem("access"));

const url = "http://127.0.0.1:8000/payments/success";
const secretKey = "test_sk_qLlDJaYngroLz95eAom8ezGdRpXx";
const userpass = secretKey + ':';
const encodedU = window.btoa(userpass);

const headers = {
  "Authorization": "Basic " + encodedU,
  "Content-Type": "application/json",
  "Authorization-Token": `${access_token}`  // 액세스 토큰 값 설정

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
    let temp_html = `
                  <p class="content">주문자 : ${userName}</p>
                  <p class="content">이용권 : ${orderName}</p>
                  <p class="content">결제 금액 : ${totalAmount}</p>
                  <p class="content">부가세 : ${vat}</p>
                  <p class="content">부가세 제외 결제 금액 : ${suppliedAmount}</p>
                  `
    $('#payments-info').append(temp_html)


  })
  .catch(error => {
    // 에러 처리
    console.error(error);
  });


// fetch('http://127.0.0.1:8000/payments/success/')  // 서버의 URL을 적절히 변경해야 합니다.
//   .then(response => response.json())
//   .then(data => {
//     // JSON 데이터를 이용하여 필요한 처리를 수행합니다.
//     console.log(data.res);
//     console.log(data.respaymentKey);
//     console.log(data.resorderId);
//     console.log(data.totalAmount);
//     console.log(data.suppliedAmount);
//     console.log(data.vat);
//     console.log(data.requestedAt);

//     // 추가적인 동작 수행 가능
//   })
//   .catch(error => {
//     // 에러 처리
//     console.error('Error:', error);
//   });