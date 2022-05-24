async function searchContent() {
    if (checkEmptyInput()) {
        let input_search = document.getElementById('input_search');
        let value = input_search.value;
        let validation = value.replace(/^\s+|\s+$/gm, '').toUpperCase();
        // Create result
        const object = { text: validation }
        const url = "http://127.0.0.1:5000/post";
        const data = await fetch(url, {
            // mode: 'no-cors',
            // cache: "force-cache",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify(object)
        }).then(Response => Response.json())
            .then(data => getInfoHouse(data));
    }
}
function getInfoHouse(listIndex) {
    const url = "http://localhost:8080/api/house/dalat/all";
    const data = fetch(url, {
        // mode: 'cors',
        // cache: "force-cache",
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    }).then(Response => Response.json())
        .then(allHouse => infoHouseByListIndex(listIndex, allHouse));
}
function infoHouseByListIndex(listIndex, allInfoHouse) {
    let arr_info = []
    let info = allInfoHouse.data[0]
    listIndex.forEach(index => {
        info.forEach(element => {
            if (index == element.idHouse) {
                if (arr_info.length <= 5)
                    arr_info.push(element)
            }
        });
    });
    console.log(arr_info)
    var html = arr_info.map(function (item) {
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
    root.innerHTML = html.join("");

}
function checkEmptyInput() {
    if (input_search.value.length == 0) {
        alert("Bạn chưa nhập nội dung")
    } else {
        return true
    }
}