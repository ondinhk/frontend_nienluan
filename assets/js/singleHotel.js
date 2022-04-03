var state = {
    'page': 1,
    'rows': 5
}
async function getHouseById(idHouse, callback) {
    const url = "http://localhost:8080/api/house/dalat/" + idHouse;
    const data = await fetch(url, {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    }).then(Response => Response.json()).then(callback);
}
function nextPageSing() {
    // Get id house
    let idHouse = document.getElementById('img_hotel').alt;
    // Get max page
    let max_page = document.getElementById('number_comment').dataset.pages;
    // Get index present comment
    if (state.page == max_page)
        return
    else {
        state.page++;
        getHouseById(idHouse, renderSingHotel)
    }
}

function prevPageSing() {
    let idHouse = document.getElementById('img_hotel').alt;
    if (state.page == 1)
        return
    else {
        state.page--;
        getHouseById(idHouse, renderSingHotel)
    }
}
function createState(input, state) {
    var dataOutput = pagination(input, state.page, state.rows);
    return dataOutput;
}
function pagination(querySet, page, rows) {
    var trimStart = (page - 1) * rows;
    var trimEnd = trimStart + rows;

    var trimData = querySet.slice(trimStart, trimEnd);
    var pages = Math.ceil(querySet.length / rows);
    return {
        'querySet': trimData,
        'page': pages,
    }
}
function renderSingHotel(data) {
    // Images
    let images = data.image;
    // Comment
    let comments = data.comments;
    let numberComments = comments.length;
    // Comment
    let data_comment = createState(comments, state)
    let comment_pages = data_comment.page;
    // Info data
    renderContainer(data, numberComments, comment_pages)
    renderImage(images)
    renderComments(data_comment)
    // Change images
    var img = document.getElementById("img_hotel");
    var list_img = document.querySelectorAll('img');
    list_img.forEach(element => {
        element.addEventListener("click", function () {
            img.src = this.src;
        })
    });
    return numberComments;
}
function renderImage(data) {
    // Mini div images
    let right_img = document.getElementById('right_img');
    let images = data.map(function (item) {
        return `<img src="${item.imgLink}" alt="">`
    })
    right_img.innerHTML = images;
}
function renderContainer(data, numberComments, comment_pages) {
    // Container
    let info = data.info[0]
    let images = data.image;
    container.innerHTML = `<div class="center">
    <div class="hotel_sing">
        <div class="hotel_img">
            <div class="left shadow-lg">
                <img src="${images[0].imgLink}" alt="${info.idHouse}" id="img_hotel">
            </div>
            <div class="right" id="right_img">
            </div>
        </div>
        <div class="hotel_info">
            <div class="hotel_title">
                <p class=" hotel_sing-name">${info.title} <span class="text_small">${info.distance}</span>
                </p>
                <p class="cost_hotel">${info.cost}</p>
            </div>
            <p class="des">${info.description}</p>
            <p class="des">Link booking: <a href="${info.linkBooking}">${info.linkBooking}</a> </p>
        </div>
        <div class="title_comment" id="number_comment" data-comments=${numberComments} data-pages=${comment_pages}>
                <h1>Đánh giá của khách du lịch</h1>
                <div class="change_page">
                    <div class="button-next">
                        <a href="javascript:prevPageSing()"><h1>Prev</h1></a>
                        <a href="javascript:nextPageSing()"><h1>Next</h1></a>
                    </div>
                    <p> <span id="page_present"> </span> / <span id="page_max"> </span></p>
                </div>
        </div>
        <div class="block-comments" id="block_coments_id">
        </div>
    </div>
</div>`;
    // Page
    // Get number comments
    let number_comment_string = document.getElementById('number_comment').dataset.comments;
    let page_present = document.getElementById('page_present');
    let page_max = document.getElementById('page_max')
    // Index page
    let idx_comment;
    if (numberComments < 5) {
        idx_comment = numberComments;
    } else {
        idx_comment = state.page * state.rows;
    }
    // Update page
    page_max.innerText = number_comment_string;
    page_present.innerText = idx_comment

}
function renderComments(data) {
    let block_coments_id = document.getElementById('block_coments_id')
    let html_comments = data.querySet.map(function (item) {
        return `
        <div class="comment_item shadow">
            <div class="info_user ">
                <p class="name_user">${item.username}</p>
                <p>Việt Nam</p>
            </div>
            <div class="content">
                <div class="content_text">
                    <p class="label">${item.title}</p>
                    <p>${item.comment}</p>
                </div>
                <div class="rate_scope">
                    <p class="scope">${item.scope}</p>
                </div>
            </div>
        </div>`;
    })
    block_coments_id.innerHTML = html_comments.join("");
}
function showHotel(idHouse) {
    getHouseById(idHouse, renderSingHotel)
}



