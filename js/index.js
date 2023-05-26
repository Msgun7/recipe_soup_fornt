
// // /* // {% comment %} ================================= API KEY 세팅 ================================== {% endcomment %} */
// // let clientKey = 'test_ck_D4yKeq5bgrpjzoYkd2A3GX0lzW6Y'; // [TODO] https://developers.tosspayments.com 로그인 후 API Key발급 가능
// // let tossPayments = TossPayments(clientKey);


// // {/* // {% comment %} ================================= 결제데이터 ==================================
// //   //   각 파라미터별 세부 내용은 다음 링크 참고 https://docs.tosspayments.com/reference/js-sdk {% endcomment %} */}
// // let paymentData = ["공통", "카드", "가상계좌", "계좌이체", "휴대폰", "문화상품권", "도서상품권", "게임문화상품권", "토스페이"];
// // let path = "/";
// // let successUrl = "http://127.0.0.1:5500/success.html";
// // let failUrl = "http://127.0.0.1:5500/fail.html";
// // // let successUrl = window.location.origin + path + "payments/success";
// // // let failUrl = window.location.origin + path + "payments/fail";
// // paymentData["공통"] = {
// //   "amount": "",
// //   "orderId": "",
// //   "orderName": "",
// //   "customerName": "",
// //   "customerEmail": null,
// //   "customerMobilePhone": null,
// //   "successUrl": successUrl,
// //   "failUrl": failUrl,
// //   "windowTarget": "iframe",
// //   "taxFreeAmount": null,
// //   "cultureExpense": false,
// //   "vat": "",
// //   "suppliedAmount": ""
// // }

// // paymentData["카드"] = {
// //   "cardCompany": null,
// //   "cardInstallmentPlan": null,
// //   "maxCardInstallmentPlan": null,
// //   "freeInstallmentPlans": null,
// //   "useCardPoint": false,
// //   "useAppCardOnly": false,
// //   "useInternationalCardOnly": false,
// //   "flowMode": "DEFAULT",
// //   "easyPay": null,
// //   "discountCode": null,
// //   "appScheme": null
// // }

// // paymentData["가상계좌"] = {
// //   "validHours": 72,
// //   "cashReceipt": {
// //     "type": "소득공제"
// //   },
// //   "useEscrow": false,
// //   "escrowProducts": null,
// //   "currency": "KRW"
// // }

// // paymentData["계좌이체"] = {
// //   "cashReceipt": {
// //     "type": "소득공제"
// //   },
// //   "useEscrow": false,
// //   "escrowProducts": null
// // }

// // paymentData["휴대폰"] = {
// //   "mobileCarrier": null // [NOTE] 테스트 환경에서 동작 X
// // }

// // function applySubscribe(event) {
// //   const checkbox = event.target;
// //   const amount = checkbox.dataset.amount;
// //   const name = checkbox.dataset.name;
// //   const paymentAmountElement = document.querySelector("#amount");
// //   const SubscribeNameElement = document.querySelector("#orderName");

// //   if (checkbox.checked) {
// //     const checkbox2 = document.querySelector('.checkbox2');
// //     const checkbox1 = document.querySelector('.checkbox1');
// //     if (paymentAmountElement.value && checkbox !== checkbox2) {
// //       checkbox2.checked = false; // 체크박스 2 해제
// //     }
// //     if (paymentAmountElement.value && checkbox !== checkbox1) {
// //       checkbox1.checked = false; // 체크박스 1 해제
// //     }
// //     paymentAmountElement.value = amount;
// //     SubscribeNameElement.value = name;
// //   } else {
// //     paymentAmountElement.value = ""; // 체크가 해제되면 금액란을 비움
// //     SubscribeNameElement.value = "";
// //   }
// // }

// // document.querySelector("#basic").addEventListener("click", applySubscribe)
// // document.querySelector("#premium").addEventListener("click", applySubscribe)



// // // {% comment %} ================== '결제' Btn Event ================== {% endcomment %}
// // document.getElementById("requestPayment").addEventListener('click', function () {
// //   let paymentType = document.getElementById("paymentType").value;
// //   let requestJson = initPaymentsData("공통", paymentType);

// //   tossPayments.requestPayment(paymentType, requestJson)
// //     .catch(function (error) {
// //       // 응답 처리 (https://docs.tosspayments.com/reference/js-sdk#응답-처리)
// //       if (error.code === 'USER_CANCEL') {
// //         // 결제 고객이 결제창을 닫았을 때 에러 처리
// //       } else if (error.code === 'INVALID_CARD_COMPANY') {
// //         // 유효하지 않은 카드 코드에 대한 에러 처리
// //       }
// //     })
// // })

// // // {% comment %} ================== 페이지 로딩시 실행 ================== {% endcomment %}
// // document.addEventListener("DOMContentLoaded", function () {
// //   makeOrderId("UniqueOrderID");
// // });

// // // {% comment %} ================= 주문번호(OrderID) 자동생성 ===================  {% endcomment %}
// // function makeOrderId(prefix) {
// //   let x = Math.floor(Math.random() * 100000000);
// //   document.getElementById("orderId").value = prefix + x;
// // }

// // // {% comment %} =============[공통] + [결제수단] JSON DATA 합치기 ================= {% endcomment %}
// // function initPaymentsData(general, paymentType) {
// //   paymentData[general].amount = document.getElementById("amount").value;
// //   paymentData[general].orderId = document.getElementById("orderId").value;
// //   paymentData[general].orderName = document.getElementById("orderName").value;
// //   paymentData[general].customerName = document.getElementById("customerName").value;

// //   return Object.assign(paymentData[general], paymentData[paymentType]);
// // }

// async function RecipeList() {
//   // const accessToken = localStorage.getItem('access')
//   const response = await fetch(`http://127.0.0.1:8000/recipe/`, {
//     headers: {
//       'content-type': 'application/json',
//       // 'Authorization': `Bearer ${accessToken}`
//     },
//     method: 'GET',
//   })

//   const response_json = await response.json()
//   $('#recipe_list').empty()
//   response_json.forEach((a) => {
//     const name = a['name']
//     const category = a['category']
//     const main_img = a['main_img']
//     const kcal = a['kcal']
//     const recipe_id = a['id']

//     let temp_html1 = `<a href="/recipe_detail.html?recipe_id=${recipe_id}">
//                             <section class="cp-card content">
// let recipe_data = []
// let page = 8


// async function RecipeList(event) {
//     // const accessToken = localStorage.getItem('access')
//     localStorage.setItem("page", 8)
//     page = 8
//     var category_id = "1";
//     if (event && event.target) {
//         category_id = event.target.id.slice(-1);
//     }
//     const response = await fetch(`http://127.0.0.1:8000/recipe-list/${category_id}/`, {
//         headers: {
//             'content-type': 'application/json',
//             // 'Authorization': `Bearer ${accessToken}`
//         },
//         method: 'GET',
//     })

//     const response_json = await response.json()
//     $('#recipe_list').empty()
//     $("#m_btn").hide();

//     for (step = 0; step < 8; step++) {
//         const name = response_json[step]['name']
//         const main_img = response_json[step]['main_img']
//         const kcal = response_json[step]['kcal']
//         const recipe_id = response_json[step]['id']

//         let temp_html1 = `<a href="/recipe_detail.html?recipe_id=${recipe_id}">
//                             <section class="cp-card content" style="height:300px; padding:10px;">
//                                 <div class="thumb" style="background-image: url(${main_img}); border-radius:20%">
//                                 </div>
//                                 <div class="body">
//                                     <h4 style="font-size:15px;">${name}</h4>
//                                     <div class="metadata" style="margin-top:2px; float:right;">
//                                         <div class="review-rating">
//                                             <span class="cp-stars"style="font-size:15px;">
//                                                 ${kcal}kcal
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </section>
//                         </a>`;
//         $('#recipe_list').append(temp_html1);
//     }
//     recipe_data = []
//     recipe_data.push(response_json)
//     last_page = parseInt(recipe_data[recipe_data.length - 1].length / 8 - 2)
//     $('#page_num').empty()
//     let page_num_html = `<h5>1 페이지 / ${last_page + 2} 페이지</h5>`
//     $('#page_num').append(page_num_html);
//     $("#p_btn").show();
// }

// RecipeList()



// function P_Page() {
//     console.log(recipe_data)
//     local_page = localStorage.getItem('page')
//     last_page = parseInt(recipe_data[recipe_data.length - 1].length / 8 - 2)
//     if (parseInt(local_page) / 8 > last_page) {
//         $("#p_btn").hide();
//     }
//     $("#m_btn").show();
//     page += 8
//     $('#recipe_list').empty()
//     $('#page_num').empty()
//     let page_num_html = `<h5>${parseInt(local_page) / 8 + 1} 페이지 / ${last_page + 2} 페이지</h5>`
//     $('#page_num').append(page_num_html);
//     for (step = page; step < page + 8; step++) {
//         // console.log(recipe_data[0][step])
//         const data_page = recipe_data[0][step]
//         const name = data_page['name']
//         const main_img = data_page['main_img']
//         const kcal = data_page['kcal']
//         const recipe_id = data_page['id']

//         let temp_html1 = `<a href="/recipe_detail.html?recipe_id=${recipe_id}">
//                                 <section class="cp-card content" style="height:300px; padding:10px;">
//                                     <div class="thumb" style="background-image: url(${main_img}); border-radius:20%">
//                                     </div>
//                                     <div class="body">
//                                         <h4 style="font-size:15px;">${name}</h4>
//                                         <div class="metadata" style="margin-top:2px; float:right;">
//                                             <div class="review-rating">
//                                                 <span class="cp-stars"style="font-size:15px;">
//                                                     ${kcal}kcal
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </section>
//                             </a>`;
//         $('#recipe_list').append(temp_html1);
//     }
//     localStorage.setItem('page', page)


// }

// function M_Page() {
//     local_page = localStorage.getItem('page')
//     page -= 8
//     $('#recipe_list').empty()

//     for (step = page - 8; step < page; step++) {
//         // console.log(recipe_data[0][step])
//         const data_page = recipe_data[0][step]
//         const name = data_page['name']
//         const main_img = data_page['main_img']
//         const kcal = data_page['kcal']
//         const recipe_id = data_page['id']

//         let temp_html1 = `<a href="/recipe_detail.html?recipe_id=${recipe_id}">
//                             <section class="cp-card content" style="height:300px; padding:10px;">
//                                 <div class="thumb" style="background-image: url(${main_img}); border-radius:20%">
//                                 </div>
//                                 <div class="body">
//                                     <h4 style="font-size:15px;">${name}</h4>
//                                     <div class="metadata" style="margin-top:2px; float:right;">
//                                         <div class="review-rating">
//                                             <span class="cp-stars"style="font-size:15px;">
//                                                 ${kcal}kcal
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </section>
//                         </a>`;
//         $('#recipe_list').append(temp_html1);
//         // for (const [k, v] of Object.entries(recipe_data[0][step])) {
//         //     console.log(k, v)
//         // }

//     }
//     localStorage.setItem('page', page)
//     if (localStorage.getItem('page') <= 8) {
//         $("#m_btn").hide();
//     } else {
//         $("#p_btn").show();
//     }
//     local_page = localStorage.getItem('page')
//     $('#page_num').empty()
//     let page_num_html = `<h5>${parseInt(local_page) / 8} 페이지 / ${last_page + 2} 페이지</h5>`
//     $('#page_num').append(page_num_html);
// }

