// 기본 URL
const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"

async function GoogleLogin(){
    const key = localStorage.getItem("key");

    if (key == null) {
      window.location.replace(`${backend_base_url}/users/google/login`);
    }
  
    const response = await fetch(`${backend_base_url}/users/google/login`, {

    });

    console.log(key)
    console.log(response)

    // if (response.status == 200) {
    //   alert("로그인이 완료되었습니다!");
    //   window.location.replace(`${frontend_base_url}/login.html`);
    // }
}
