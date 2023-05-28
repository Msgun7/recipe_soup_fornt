document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const category_id = urlParams.get('category_id');
    P_Page(category_id);
});
// index.html에서만 바로 실행이 되도록
// const currentURL = window.location.href;
// if (currentURL === "http://127.0.0.1:5500/index.html") {
//   // 특정 함수 호출
//   RecipeList()

async function P_Page() {
    if (window.location.pathname.endsWith("/index.html")) {

        let p_offset = localStorage.getItem('page') * 1
        if (p_offset > recipe_total) {
            alert("마지막 페이지 입니다")
        } else {
            const response = await fetch(`http://127.0.0.1:8000/recipe-list/${category_id}/${p_offset}/`, {
                headers: {
                    'content-type': 'application/json',
                },
                method: 'GET',
            })
            const response_json = await response.json()
            //레시피 총개수 한번만 저장
            if (recipe_total == 0) {
                recipe_total = response_json['total']
            }


            $('#recipe_list').empty()

            response_json['data'].forEach((a) => {
                const name = a['name']
                const main_img = a['main_img']
                const kcal = a['kcal']
                const recipe_id = a['id']

                let temp_html1 = `<a href="/recipe_detail.html?recipe_id=${recipe_id}">
                                      <section class="cp-card content" style="height:300px; padding:10px;">
                                          <div class="thumb" style="background-image: url(${main_img}); border-radius:20%">
                                          </div>
                                          <div class="body">
                                              <h4 style="font-size:15px;">${name}</h4>
                                              <div class="metadata" style="margin-top:2px; float:right;">
                                                  <div class="review-rating">
                                                      <span class="cp-stars"style="font-size:15px;">
                                                          ${kcal}kcal
                                                      </span>
                                                  </div>
                                              </div>
                                          </div>
                                      </section>
                                  </a>`;
                $('#recipe_list').append(temp_html1);
            })
            localStorage.setItem('page', p_offset + 8)
        }
        // 현재 페이지 위치를 보여주는 곳
        $('#page_num').empty()
        let page_num_html = `<h5>${p_offset / 8 + 1} 페이지 / ${parseInt(recipe_total / 8) + 1} 페이지</h5>`
        $('#page_num').append(page_num_html);
        //해당 번호 a태그 css 변경
        // let target_num = document.getElementById(`${p_offset / 8 + 1}page`)
        // console.log(target_num)
        // if (target_num != null) {
        //     target_num.style.color = "blue";
        //     target_num.style.fontSize = "30px";
        // }
    } else {

        window.location.href = `http://127.0.0.1:5500/index.html?category_id=${category_id}`;

    }
}