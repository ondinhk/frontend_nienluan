function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 11.9404, lng: 108.4483 },
        zoom: 14,
    });
    document.getElementById("search").addEventListener("click", () => {
        let destination = document.getElementById('destination').value;
        if (destination === "") {
            alert("Bạn chưa nhập địa chỉ");
            return;
        }
        const url = "http://localhost:8080/api/house/dalat/top";
        const data = fetch(url, {
            mode: 'cors',
            cache: "force-cache",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            }
        }).then(Response => Response.json()).then(dataApi => getDistance(dataApi, destination));
    });
}
window.initMap = initMap;
function getDistance(data_set, destination) {
    let data = data_set.data[0];
    address1 = [];
    address2 = [];
    address3 = [];
    data.forEach(function (value, idx) {
        address = value.description;
        if (idx < 25) {
            address1.push(address)
        } else if (idx > 24 && idx < 50) {
            address2.push(address)
        } else if (idx < 74) {
            address3.push(address)
        }
    });
    // 
    let total = []
    var service = new google.maps.DistanceMatrixService();
    // step 1
    service.getDistanceMatrix(
        {
            origins: address1,
            destinations: [destination],
            travelMode: 'DRIVING',
        }, endPoint);

    function step2(response, status) {
        if (status === "OK") {
            var origins = response.originAddresses;
            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                    var element = results[j];
                    var distance = element.distance.value;
                    total.push(distance)
                }
            }
            service.getDistanceMatrix(
                {
                    origins: address2,
                    destinations: [destination],
                    travelMode: 'DRIVING',
                }, step3);
        }
    }
    function step3(response, status) {
        if (status === "OK") {
            var origins = response.originAddresses;
            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                    var element = results[j];
                    var distance = element.distance.value;
                    total.push(distance)
                }
            }
            service.getDistanceMatrix(
                {
                    origins: address3,
                    destinations: [destination],
                    travelMode: 'DRIVING',
                }, endPoint);
        }
    }
    function endPoint(response, status) {
        if (status === "OK") {
            var origins = response.originAddresses;
            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                    var element = results[j];
                    var distance = element.distance.value;
                    total.push(distance)
                }
            }
            resultHouse(total)
        }
    }

    function resultHouse(input) {
        let index_listHouse = [];
        // Lọc lấy 5 index phần tử max
        while (index_listHouse.length < 5) {
            const max = Math.min(...input);
            const index = input.indexOf(max);
            index_listHouse.push({ "index": index, "distance": max });
            input.splice(index, 1)
        }
        let listHouse = []
        // Từ index phần tử max
        // Lấy thông tin từ tập dữ liệu gốc, dựa trên các index có value max
        for (let index = 0; index < index_listHouse.length; index++) {
            const element = index_listHouse[index].index;
            const value = index_listHouse[index].distance;
            listHouse.push({ "data": data[element], "value": value });
        }
        renderHTML(listHouse)
    }

}
function renderHTML(input) {
    let root = document.getElementById("root");
    console.log(input)
    var html = input.map(function (item) {
        return `<div class="recent-item shadow">
            <div class="item_info">
                <img src="${item.data.image}" alt="">
                <div class="info">
                    <p class="name_hotel">${item.data.title}</p>
                    <div class="rate">
                        <div class="rate_scope">
                            <p>${item.data.rate}</p>
                        </div>
                        <p class="text_small">${item.data.quanlityComment} đánh giá</p>
                    </div>
                    <p class="text_small">${(item.value) / 1000} Km</p>
                    <div class="more">
                        <p class="cost_hotel">${item.data.cost}</p>
                        <a href="javascript:showHotel(${item.data.idHouse})" class="more_info">Chi tiết</a>
                    </div>
                </div>
            </div>
        </div>`
    });
    const originList = ["24 Đường Khu Hoà Bình, Đà Lạt, Việt Nam"];
    const destinationList = ["Chợ đà lạt"];


    var geocoder = new google.maps.Geocoder();
    for (let i = 0; i < originList.length; i++) {
        geocoder.geocode({ address: originList[i] }).then(showGeocodedAddressOnMap);
    }
    root.innerHTML = html.join("");
}
function showGeocodedAddressOnMap(value) {
    console.log(value.results[0])
    new google.maps.Marker({
        map,
        position: value.results[0].geometry.location,
    })
}
