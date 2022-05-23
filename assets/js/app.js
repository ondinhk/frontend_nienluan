var state = {
    'page': 1,
    'rows': 5
}
// DOM const
const container = document.getElementById('container');
const input_search = document.getElementById('input_search');
const result_max = document.getElementById('result_search');


async function getAllHouse(callback) {
    const url = "http://localhost:8080/api/house/dalat/all";
    const data = await fetch(url, {
        // mode: 'cors',
        // cache: "force-cache",
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
        document.querySelector('#search').scrollIntoView();
    }
}
function renderHTML(input) {
    let root = document.getElementById('root');
    // Get data
    let dataJson = input.data[0]
    // Render number house
    let numberHouse = document.getElementById('numberHouse');
    number = dataJson.length;
    numberHouse.innerHTML = number;
    // Create state data
    let data = createState(dataJson, state)
    // Html data
    var html = data.querySet.map(function (item) {
        if (item.rate === "Chưa có đánh giá") {
            item.rate = 0;
        }
        return `<a href="javascript:showHotel(${item.idHouse})"class="recent-item shadow">
        <div class="item_info">
        <img src="${item.image}" alt="">
        <div class="info">
                <p class="name_hotel">${item.title} </p>
                <p class="description">${item.description[0].des_text}</p>
                <p class="text_small address">${item.description[0].address} <br> ${item.distance}</p>
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
    // Render paging
    renderPaging(data);
    // Render root
    result_max.innerHTML = ``
    root.innerHTML = html.join("");

}
function renderPaging(data) {
    // Render paging
    let paging = document.getElementById('pagination')
    let paging_html = `<a href="javascript:prevPage()">Prev</a>
    <p>Page: <span id="page"></span></p>
    <a href="javascript:nextPage(${data.page})">Next</a>`;
    paging.innerHTML = paging_html

    // Render number page current 
    let page = document.getElementById('page')
    numberPage = state.page + "/" + data.page;
    page.innerHTML = numberPage;
}
function createState(input, state) {
    var dataOutput = pagination(input, state.page, state.rows);
    return dataOutput;
}
function pagination(querySet, page, rows) {
    var trimStart = (page - 1) * rows;
    var trimEnd = trimStart + rows;
    // Get data from start to end
    var trimData = querySet.slice(trimStart, trimEnd);
    var pages = Math.ceil(querySet.length / rows);
    return {
        'querySet': trimData,
        'page': pages,
    }
}
function app() {
    // Create state when reload page
    state.page = 1;
    getAllHouse(renderHTML);
}
app()
