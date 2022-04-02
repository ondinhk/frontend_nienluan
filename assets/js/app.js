var state = {
    'page': 1,
    'rows': 5
}
let container = document.getElementById('container');
async function getAllHouse(callback) {
    const url = "http://localhost:8080/api/house/dalat/all";
    const data = await fetch(url, {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    }).then(Response => Response.json()).then(callback);
}
function nextPage() {
    if (state.page == 150)
        return
    else {
        state.page++;
        getAllHouse(renderHTML)
        document.querySelector('#search').scrollIntoView();
    }
}

function prevPage() {
    if (state.page == 1)
        return
    else {
        state.page--;
        getAllHouse(renderHTML)
        document.getElementById('#search').scrollIntoView();
    }
}
function renderHTML(input) {
    let root = document.getElementById('root');
    let container = document.getElementById('container');
    let numberHouse = document.getElementById('numberHouse');
    let dataJson = input.data[0]
    // Create data
    let data = createState(dataJson, state)
    // Update Page
    let page = document.getElementById('page')
    numberPage = state.page + "/" + data.page;
    page.innerHTML = numberPage;
    // Render
    var html = data.querySet.map(function (item) {
        // console.log(item)
        if (item.rate === "Chưa có đánh giá") {
            item.rate = 0;
        }
        return `<a href="javascript:showHotel(${item.idHouse})"class="recent-item shadow">
        <div class="item_info">
            <img src="${item.image}" alt="">
            <div class="info">
                <p class="name_hotel">${item.title} </p>
                <p class="description">${item.description}</p>
                <p class="text_small">${item.distance}</p>
                <p class="cost_hotel">${item.cost}</p>
            </div>
        </div>
        <div class="rate">
            <p class="label">${item.label_rate}</p>
            <div class="rate_scope">
                <p>${item.rate}</p>
            </div>
            <p class="text_small">${item.quanlityComment}</p>

            <h3 class="more_info">Xem thêm</h3>
        </div>
    </a>`
    });
    number = input.data[0].length;
    root.innerHTML = html.join("");
    numberHouse.innerHTML = number;
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
function app() {
    state.page = 1;
    getAllHouse(renderHTML);
}
app()
