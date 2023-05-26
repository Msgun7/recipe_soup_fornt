async function injectNavbar() {
    fetch("/navbar.html").then(response => {
        return response.text()
    })
        .then(data => {
            document.querySelector("header").innerHTML = data;
        })
    let navbarHtml = await fetch("/navbar.html")
    let data = await navbarHtml.text()
    document.querySelector("header").innerHTML = data;

    const payload = localStorage.getItem("payload");
    
    if (payload) {
        const payload_parse = JSON.parse(payload)
        const mypage = document.getElementById("mypage")
        mypage.innerText = "마이페이지"
        const logout = document.getElementById("logout")
        logout.innerText = "로그아웃"
        let loginButton = document.getElementById("login-button")
        loginButton.style.display = "none";
        let signupButton = document.getElementById("signup-button")
        signupButton.style.display = "none";
    }
}
injectNavbar();

// async function injectNavbar() {
//     fetch("/navbar.html").then(response => {
//         return response.text()
//     })
//         .then(data => {
//             document.querySelector("header").innerHTML = data;
//         })


//     let navbarHtml = await fetch("/navbar.html")
//     let data = await navbarHtml.text()
//     document.querySelector("header").innerHTML = data;

//     const payload = localStorage.getItem("payload");
//     const payload_parse = JSON.parse(payload)

//     adminUser().then(is_admin => {
//         // Promise가 성공적으로 처리되면 is_admin 값 사용
//         if (payload) {
//             if (is_admin == true) {
//                 const adminBookUserList = document.getElementById("adminBookUserList")
//                 adminBookUserList.innerText = "예약자 조회"

//                 const adminRoomList = document.getElementById("adminRoomList")
//                 adminRoomList.innerText = "객실 조회"

//                 const adminRoomSave = document.getElementById("adminRoomSave")
//                 adminRoomSave.innerText = "객실등록"
//             } else {
//                 const mypage = document.getElementById("mypage")
//                 mypage.innerText = "마이페이지"
//             }
//             const logout = document.getElementById("logout")
//             logout.innerText = "로그아웃"

//             let loginButton = document.getElementById("login-button")
//             loginButton.style.display = "none";

//             let signupButton = document.getElementById("signup-button")
//             signupButton.style.display = "none";
//         }
//     }).catch(error => {
//         // Promise 처리 중에 오류가 발생하면 에러 처리
//         console.error(error);
//     });
// }

// injectNavbar()



