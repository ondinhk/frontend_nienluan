function searchHotel() {
    getAllHouse(filterData)
}
function checkEmptyInput() {
    if (input_search.value === "") {
        getAllHouse(renderHTML)
    } else {
        return
    }
}
function filterData(data) {
    let value = input_search.value;
    let validation = value.replace(/^\s+|\s+$/gm, '').toUpperCase();
    let dataSet = data.data[0]
    // Create result
    let result = []
    for (i = 0; i < dataSet.length; i++) {
        txtValue = dataSet[i].title;
        if (txtValue.toUpperCase().indexOf(validation) > -1) {
            result.push(dataSet[i])
        }
    }
    renderSearch(result);
}
function renderSearch(input) {
    if (input.length > 0) {
        // Create state
        let data = createState(input, state)
        // Get number max result
        let maxHotel = data.querySet.length;
        // Html Hotel
        let html = data.querySet.map(function (item) {
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
        // Render paging
        let paging = document.getElementById('pagination')
        let paging_html = `<a href="javascript:prevPageSearch()">Prev</a>
            <p>Page: <span id="page"></span></p>
            <a href="javascript:nextPageSearch(${state.page})">Next</a>`;
        paging.innerHTML = paging_html
        // Update Page
        let page = document.getElementById('page')
        numberPage = state.page + "/" + data.page;
        page.innerHTML = numberPage;
        // Render number max result
        result_max.innerText = "Có " + maxHotel + " kết quả";
        // Render hotel
        root.innerHTML = html.join("")
    } else {
        root.innerText = "";
        let paging = document.getElementById('pagination')
        paging.innerHTML = "Không tìm thấy kết quả"
    }
}
function nextPageSearch(maxPage) {
    if (state.page == maxPage)
        return
    else {
        state.page++;
        searchHotel()
        document.querySelector('#search').scrollIntoView();
    }
}

function prevPageSearch() {
    if (state.page == 1)
        return
    else {
        state.page--;
        searchHotel()
        document.getElementById('#search').scrollIntoView();
    }
}