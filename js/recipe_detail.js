$(document).ready(function () {
    getRecipeDetail()
    async function getRecipeDetail() {
        params = new URLSearchParams(window.location.search);
        recipe_id = params.get("recipe_id");
        // console.log(recipe_id)
        const response = await fetch(`http://127.0.0.1:8000/recipe/${recipe_id}/`, {

            headers: {
                "Content-Type": "application/json",
                // Authorization: "Bearer " + localStorage.getItem("access"),
            },
            method: "GET",
        });
        //해당 숙소 리뷰 조회
        const response_json = await response.json()
        // 메인이미지
        const main_img = response_json['main_img']
        let temp_html1 = `<img class="thumb" src="${main_img}" style="float:left; border: 2px solid #696865;">`
        $("#main_img").append(temp_html1);

        // 레시피 이름
        const name = response_json['name']
        let temp_html2 = `<a class="back-link"><${name}></a>`
        $("#recipe_name").append(temp_html2)

        // 레시피 정보
        const category = response_json['category']
        const kcal = response_json['kcal']
        const tag = response_json['tag']
        const car = response_json['car']
        const fat = response_json['fat']
        const na = response_json['na']
        const pro = response_json['pro']
        const tip = response_json['tip']
        const ingredients = response_json['ingredients']
        let temp_html3 = `
                        <div style="float: left;">
                            <h5>category(${category})</h5>
                        </div>
                        <div style="float: right;">
                            <h5>총 열량 : ${kcal}kcal</h5>
                        </div>
                        <br><br>
                        <p>재료 : ${ingredients}</p>
                        <p>탄수화물 : ${car}</p>
                        <p>단백질 : ${pro}</p>
                        <p>나트륨 : ${na}</p>
                        <p>해시태그 : ${tag}</p>
                        <p>지방 : ${fat}</p>
                        <p>TIP : ${tip}</p>
                        `
        $("#recipe_info").append(temp_html3)

        // 조리 순서
        response_json["sub_recipe_set"].forEach((a) => {
            const turn = a['turn']
            const validJSON = turn.replace(/'/g, '"');
            const turnList = JSON.parse(validJSON);
            const turn_img = a['img']
            const validJSON2 = turn_img.replace(/'/g, '"');
            const img_list = JSON.parse(validJSON2);

            for (step = 0; step < turnList['length']; step++) {
                let temp_html4 = `
                                <div class="Gallery-item js-item">
                                    <div class="Gallery-itemContent"><img src="${img_list[step]}"></div>
                                    <div class="Gallery-itemContent" style="font-size: 20px;">${turnList[step]}</div>
                                </div>
                                `;
                $("#recipe_turn").append(temp_html4);
                let temp_html5 = `<button class="Nav-button js-button"></button>`
                $("#recipe_turn_btn").append(temp_html5);
            }

        });

    }
})
