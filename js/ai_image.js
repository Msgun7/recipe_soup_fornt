// document
//   .getElementById("uploadForm")
//   .addEventListener("submit", function (event) {
//     event.preventDefault(); // 폼 제출 기본 동작 방지
//     uploadImage(); // 이미지 업로드 함수 호출
//   });

async function uploadImage() {
  const fileInput = document.getElementById("imageInput");
  const imageFile = fileInput.files[0];

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch("http://127.0.0.1:8000/ai/", {
    method: "POST",
    body: formData,
  });

  const responseJson = await response.json();

  console.log(responseJson);
}


