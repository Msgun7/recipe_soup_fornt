document.addEventListener("DOMContentLoaded", function () {
  var t = document.getElementById("uploadForm");
  console.log(t);
  t.addEventListener("submit", function (event) {
    event.preventDefault(); // 폼 제출 기본 동작 방지
    uploadImage(); // 이미지 업로드 함수 호출
  });
});

async function uploadImage() {
  const fileInput = document.getElementById("imageInput");
  const imageFile = fileInput.files[0];

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch("http://127.0.0.1:8000/ai/clip/", {
    method: "POST",
    body: formData,
  });

  const responseJson = await response.json();
  
  const ingre_name = await responseJson["name"];

  console.log(ingre_name)
  const ai_temp = `<div>
                      <p>당신의 재료는 "${ingre_name}"이군요!</p>
                  </div>`;
  
  const aiImageShow = document.getElementById("ai_image_show");
  aiImageShow.innerHTML = ai_temp;
}


