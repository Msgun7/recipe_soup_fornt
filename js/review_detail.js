async function getReviewDetail() {
    const root_address = `http://127.0.0.1:8000`;
    params = new URLSearchParams(window.location.search);
    review_id = params.get("review_id");
    const response = await fetch(`http://127.0.0.1:8000/review/detail/${review_id}/`, {

        headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "GET",
    });

    const response_json = await response.json()


    const review_title = response_json['title']
    const review_content = response_json['content']
    const review_created_at = response_json['created_at']
    const review_recipe_name = response_json['recipe_name']
    const star = response_json['star']
    const image = root_address + response_json["image"];
    const recipe_id = response_json['recipe']
    let created_at = new Date(review_created_at);
    let month = (created_at.getMonth() + 1); // 월, 11[1을 더해야함. 유일하게 조심해야할 부분. 1월은 0이다.]
    let date = created_at.getDate(); // 일, 14
    let year = created_at.getFullYear()
    let temp_html = `
                    <h3>${review_title}</h3>
                    <div style="float: left; margin-bottom:20px">
                        <h5>작성자</h5>
                    </div>
                    <div style="float: right;">
                        <h5>${year}.${month}.${date}</h5>
                    </div>
                    <br>
                    <p class="content">${star}</p>
                    <p class="content">${review_content}</p>
                    <p style="float:right;"><button class="btn btn-secondary" onclick="delete_review('${recipe_id}')">삭제</button></p>
                    `
    $("#review_info").append(temp_html)
    // <img class="thumb" src="/css/assets/main-bg.jpg" style="float:left; border: 2px solid #696865;">

    // 레시피 이름
    let temp_html2 = `<a href="/recipe_detail.html?recipe_id=${recipe_id}" class="back-link">레시피 보러가기</a>`
    $("#recipe_name").append(temp_html2)

    let temp_html3 = `<img class="thumb" src="${image}" style="float:left; border: 2px solid #696865; width:100%; height:100%;">`
    $("#review_detail_img").append(temp_html3)

}

getReviewDetail()

async function show_comment() {
    params = new URLSearchParams(window.location.search);
    review_id = params.get("review_id");
    const response = await fetch(`http://127.0.0.1:8000/review/comment/${review_id}/`, {

        headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "GET",
    });

    const response_json = await response.json()
    $('#comment_box').empty()
    response_json.forEach((a) => {
        const comment = a['comment']
        // const user = a['user']
        const comment_id = a['id']
        let created_at = new Date(a['created_at']);
        let month = (created_at.getMonth() + 1); // 월, 11[1을 더해야함. 유일하게 조심해야할 부분. 1월은 0이다.]
        let date = created_at.getDate(); // 일, 14
        let year = created_at.getFullYear()
        // <div class="thumb" style="background-image: url(${main_img}); border-radius:20%">
        let temp_html1 = `
                        <div class="media" style="padding: 20px">
                            <div>
                                <div style="float: left">
                                    <h5>${comment}</h5>
                                </div>
                                <br><br>
                                <div style="float: left;">
                                    <button class="btn btn-primary" onclick="patch_box('${comment}', '${comment_id}')">수정</button>
                                    <button class="btn btn-secondary" onclick="delete_comment('${comment_id}')">삭제</button>
                                </div>
                                <div style="float: right;">
                                    <h5 style="font-size: 15px">작성자 : kmy9810(${year}.${month}.${date})</h5>
                                </div>
                            </div>
                        </div><br>
                        <hr>
                        `;
        $('#comment_box').append(temp_html1);
        // 작성한 유저면 수정삭제 보이게! -> 추가예정
    })

}

show_comment()


async function save_comment() {
    params = new URLSearchParams(window.location.search);
    review_id = params.get("review_id");
    const comment = document.getElementById("comment").value
    const response = await fetch(`http://127.0.0.1:8000/review/comment/${review_id}/`, {

        headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "POST",
        body: JSON.stringify({
            "comment": comment
        })
    });
    if (response.status == 201) {
        alert("댓글작성이 완료되었습니다!")
        window.location.reload()
    }
    else {

        const response_json = await response.json()

        const regex = /string='([^']+)'/;
        const match = JSON.stringify(response_json).match(regex)

        if (match && match.length > 1) {
            const cleanedString = match[1].replace("string=", "");
            alert("※ " + cleanedString);

        }
    }
}


async function delete_comment(comment_id) {
    const response = await fetch(`http://127.0.0.1:8000/review/comment/${comment_id}/`, {

        headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "DELETE",
    });
    if (response.status == 204) {
        alert("댓글작성이 삭제되었습니다!")
        window.location.reload()
    }
    else {

        const response_json = await response.json()

        const regex = /string='([^']+)'/;
        const match = JSON.stringify(response_json).match(regex)

        if (match && match.length > 1) {
            const cleanedString = match[1].replace("string=", "");
            alert("※ " + cleanedString);

        }
    }
}

function patch_box(comment, comment_id) {
    let input_comment = document.getElementById("comment").placeholder
    if (input_comment == comment) {
        document.getElementsByName('comment')[0].placeholder = '댓글을 작성해 주세요~';
        const btnElement = document.getElementById('save_btn');
        btnElement.innerText = '댓글달기';
        btnElement.setAttribute("onClick", `save_comment()`)
    } else {
        document.getElementsByName('comment')[0].placeholder = comment;
        const btnElement = document.getElementById('save_btn');
        btnElement.innerText = '수정';
        btnElement.setAttribute("onClick", `patch_comment(${comment_id})`)
    }
}

async function patch_comment(comment_id) {
    let comment = document.getElementById("comment").value
    if (comment == '') {
        comment = document.getElementById('comment').placeholder
    }

    const response = await fetch(`http://127.0.0.1:8000/review/comment/${comment_id}/`, {
        headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "PATCH",
        body: JSON.stringify({
            "comment": comment
        })
    });
    if (response.status == 200) {
        alert("댓글이 수정되었습니다!")
        window.location.reload()
    }
    else {

        const response_json = await response.json()

        const regex = /string='([^']+)'/;
        const match = JSON.stringify(response_json).match(regex)

        if (match && match.length > 1) {
            const cleanedString = match[1].replace("string=", "");
            alert("※ " + cleanedString);

        }
    }
}

async function delete_review(review_id) {
    const response = await fetch(`http://127.0.0.1:8000/review/detail/${review_id}/`, {

        headers: {
            "Content-Type": "application/json",
            // Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "DELETE",
    });
    if (response.status == 204) {
        alert("후기가 삭제되었습니다!")
        location.replace('/recipe_list.html')
    }
    else {

        const response_json = await response.json()

        const regex = /string='([^']+)'/;
        const match = JSON.stringify(response_json).match(regex)

        if (match && match.length > 1) {
            const cleanedString = match[1].replace("string=", "");
            alert("※ " + cleanedString);

        }
    }
}   