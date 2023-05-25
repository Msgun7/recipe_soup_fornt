let recipe_data = []
let page = 8


async function RecipeList(event) {
    // const accessToken = localStorage.getItem('access')
    localStorage.setItem("page", 8)
    page = 8
    var category_id = "1";
    if (event && event.target) {
        category_id = event.target.id.slice(-1);
    }
    const response = await fetch(`http://127.0.0.1:8000/recipe-list/${category_id}/`, {
        headers: {
            'content-type': 'application/json',
            // 'Authorization': `Bearer ${accessToken}`
        },
        method: 'GET',
    })

    const response_json = await response.json()
    $('#recipe_list').empty()
    $("#m_btn").hide();

    for (step = 0; step < 8; step++) {
        const name = response_json[step]['name']
        const main_img = response_json[step]['main_img']
        const kcal = response_json[step]['kcal']
        const recipe_id = response_json[step]['id']

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
    }
    recipe_data = []
    recipe_data.push(response_json)
    last_page = parseInt(recipe_data[recipe_data.length - 1].length / 8 - 2)
    $('#page_num').empty()
    let page_num_html = `<h5>1 페이지 / ${last_page + 2} 페이지</h5>`
    $('#page_num').append(page_num_html);
    $("#p_btn").show();

}

RecipeList()



function P_Page() {
    console.log(recipe_data)
    local_page = localStorage.getItem('page')
    last_page = parseInt(recipe_data[recipe_data.length - 1].length / 8 - 2)
    if (parseInt(local_page) / 8 > last_page) {
        $("#p_btn").hide();
    }
    $("#m_btn").show();
    page += 8
    $('#recipe_list').empty()
    $('#page_num').empty()
    let page_num_html = `<h5>${parseInt(local_page) / 8 + 1} 페이지 / ${last_page + 2} 페이지</h5>`
    $('#page_num').append(page_num_html);
    for (step = page; step < page + 8; step++) {
        // console.log(recipe_data[0][step])
        const data_page = recipe_data[0][step]
        const name = data_page['name']
        const main_img = data_page['main_img']
        const kcal = data_page['kcal']
        const recipe_id = data_page['id']

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
    }
    localStorage.setItem('page', page)


}

function M_Page() {
    local_page = localStorage.getItem('page')
    page -= 8
    $('#recipe_list').empty()

    for (step = page - 8; step < page; step++) {
        // console.log(recipe_data[0][step])
        const data_page = recipe_data[0][step]
        const name = data_page['name']
        const main_img = data_page['main_img']
        const kcal = data_page['kcal']
        const recipe_id = data_page['id']

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
        // for (const [k, v] of Object.entries(recipe_data[0][step])) {
        //     console.log(k, v)
        // }

    }
    localStorage.setItem('page', page)
    if (localStorage.getItem('page') <= 8) {
        $("#m_btn").hide();
    } else {
        $("#p_btn").show();
    }
    local_page = localStorage.getItem('page')
    $('#page_num').empty()
    let page_num_html = `<h5>${parseInt(local_page) / 8} 페이지 / ${last_page + 2} 페이지</h5>`
    $('#page_num').append(page_num_html);
}

