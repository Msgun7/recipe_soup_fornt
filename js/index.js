async function RecipeList() {
    // const accessToken = localStorage.getItem('access')
    const response = await fetch(`http://127.0.0.1:8000/recipe/`, {
        headers: {
            'content-type': 'application/json',
            // 'Authorization': `Bearer ${accessToken}`
        },
        method: 'GET',
    })

    const response_json = await response.json()
    $('#recipe_list').empty()
    response_json.forEach((a) => {
        const name = a['name']
        const category = a['category']
        const main_img = a['main_img']
        const kcal = a['kcal']
        const recipe_id = a['id']

        let temp_html1 = `<a href="/recipe_detail.html?recipe_id=${recipe_id}">
                            <section class="cp-card content">
                                <div class="thumb" style="background-image: url(${main_img}); border-radius:20%">
                                </div>
                                <div class="body">
                                    <h4>${name}</h4>
                                    <div class="metadata">
                                        <div class="review-rating">
                                            <span class="cp-stars">
                                                ${kcal}kcal
                                            </span>
                                        </div>
                                        <div class="review-author">
                                            <span>${category}</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </a>`;
        $('#recipe_list').append(temp_html1);
    })
}
RecipeList()


