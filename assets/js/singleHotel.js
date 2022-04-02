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
function renderSingHotel(data) {
    // Images
    let images = data.image;
    // Comment
    let comments = data.comments;
    // Info data
    renderContainer(data)
    renderImage(images)
    renderComments(comments)
    // Change images
    var img = document.getElementById("img_hotel");
    var list_img = document.querySelectorAll('img');
    list_img.forEach(element => {
        element.addEventListener("click", function () {
            console.log(this.src);
            img.src = this.src;
        })
    });
}
function renderImage(data) {
    // Mini div images
    let right_img = document.getElementById('right_img');
    let images = data.map(function (item) {
        return `<img src="${item.imgLink}" alt="">`
    })
    right_img.innerHTML = images;
}
function renderContainer(data) {
    // Container
    let container = document.getElementById('container');
    let info = data.info[0]
    let images = data.image;
    container.innerHTML = `<div class="center">
    <div class="hotel_sing">
        <div class="hotel_img">
            <div class="left shadow-lg">
                <img src="${images[0].imgLink}" alt="" id="img_hotel">
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
        </div>
        <h1>Đánh giá của khách du lịch</h1>
        <div class="block-comments" id="block_coments_id">
        </div>
    </div>
</div>`;
}
function renderComments(data) {
    let block_coments_id = document.getElementById('block_coments_id')
    console.log(data)
    let html_comments = data.map(function (item) {
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



