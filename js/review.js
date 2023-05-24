async function ReviewList() {
    // const accessToken = localStorage.getItem('access')
    const response = await fetch(`http://127.0.0.1:8000/review/`, {
        headers: {
            'content-type': 'application/json',
            // 'Authorization': `Bearer ${accessToken}`
        },
        method: 'GET',
    })

    const response_json = await response.json()
    console.log(response_json)
    $('#recipe_list').empty()
    response_json.forEach((a) => {
        const title = a['title']
        // const user = a['user']
        // const main_img = a['img']
        const created_at = a['created_at']
        const review_id = a['id']
        // <div class="thumb" style="background-image: url(${main_img}); border-radius:20%">
        let temp_html1 = `<a href="/review_detail.html?recipe_id=${review_id}">
                            <section class="cp-card content">
                                후기 이미지 공간
                                </div>
                                <div class="body">
                                    <h4>${title}</h4>
                                    <div class="metadata">
                                        <div class="review-rating">
                                            <span class="cp-stars">
                                                ${created_at}
                                            </span>
                                        </div>
                                        <div class="review-author">
                                            <span>작성자</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </a>`;
        $('#recipe_list').append(temp_html1);
    })
}
