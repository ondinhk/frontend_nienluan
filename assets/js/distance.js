// function initMap() {
//     map = new google.maps.Map(document.getElementById("map"), {
//         center: { lat: 11.9404, lng: 108.4483 },
//         zoom: 14,
//     });
//     document.getElementById("search").addEventListener("click", () => {
//         let destination = document.getElementById('destination').value;
//         const url = "http://localhost:8080/api/house/dalat/most";
//         const data = fetch(url, {
//             mode: 'cors',
//             cache: "force-cache",
//             headers: {
//                 'Content-Type': 'application/json',
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Credentials": true
//             }
//         }).then(Response => Response.json()).then(dataApi => getDistance(dataApi, destination));
//     });
// }
// window.initMap = initMap;
function getDistance(data_set, description) {
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
            destinations: ["Hồ Chí Minh, VN"],
            travelMode: 'DRIVING',
            // transitOptions: TransitOptions,
            // drivingOptions: DrivingOptions,
            // unitSystem: UnitSystem,
            // avoidHighways: Boolean,
            // avoidTolls: Boolean,
        }, endPoint);

    function step2(response, status) {
        if (status === "OK") {
            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;

            for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                for (var j = 0; j < results.length; j++) {
                    var element = results[j];
                    var distance = element.distance.value;
                    // var duration = element.duration.text;
                    var from = origins[i];
                    // var to = destinations[j];
                    temp = { "From": from, "Distance": distance }
                    total.push(temp)
                }
            }
            service.getDistanceMatrix(
                {
                    origins: address2,
                    destinations: ["Hồ Chí Minh, VN"],
                    travelMode: 'DRIVING',
                    // transitOptions: TransitOptions,
                    // drivingOptions: DrivingOptions,
                    // unitSystem: UnitSystem,
                    // avoidHighways: Boolean,
                    // avoidTolls: Boolean,
                }, step3);
        }
    }
    function step3(response, status) {
        if (status === "OK") {
            total.push(response)
            service.getDistanceMatrix(
                {
                    origins: address3,
                    destinations: ["Hồ Chí Minh, VN"],
                    travelMode: 'DRIVING',
                    // transitOptions: TransitOptions,
                    // drivingOptions: DrivingOptions,
                    // unitSystem: UnitSystem,
                    // avoidHighways: Boolean,
                    // avoidTolls: Boolean,
                }, result);
        }
    }
    function endPoint(response, status) {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;

        for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
                var element = results[j];
                var distance = element.distance.value;
                // var duration = element.duration.text;
                var from = origins[i];
                // var to = destinations[j];
                total.push(distance)
            }
        }
        resultHouse(total)
    }

    function compare(a, b) {
        if (a.Distance < b.Distance) {
            return -1;
        }
        if (a.Distance > b.Distance) {
            return 1;
        }
        return 0;
    }
    function resultHouse(input) {
        let index_listHouse = [];
        while (index_listHouse.length < 5) {
            const max = Math.min(...input);
            const index = input.indexOf(max);

            index_listHouse.push({ "index": index, "distance": max });
            input.splice(index, 1)
        }
        let listHouse = []
        for (let index = 0; index < index_listHouse.length; index++) {
            const element = index_listHouse[index].index;
            const value = index_listHouse[index].distance;
            listHouse.push({ "data": data[element], "value": value });
        }
        renderHTML(listHouse)
    }

}
function renderHTML(input) {
    console.log(input)

}
