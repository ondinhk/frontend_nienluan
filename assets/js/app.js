let root = document.getElementById('root');
let container = document.getElementById('container');
let numberHouse = document.getElementById('numberHouse');
async function getAllHouse() {
    const url = "http://localhost:8080/api/house/dalat/all";
    const data = await fetch(url, {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    }).then(Response => Response.json()).then(data => renderHTML(data));
}
function renderHTML(input) {
    var html = input.data[0].map(function (item) {
        // console.log(item)
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
function paging(input) {

}
function showHotel(idHouse) {
    getHouseById(idHouse)
}
async function getHouseById(idHouse) {
    const url = "http://localhost:8080/api/house/dalat/" + idHouse;
    const data = await fetch(url, {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    }).then(Response => Response.json()).then(data => console.log(data));
}

function app() {
    getAllHouse();
}
app()
