var img = document.getElementById("img_hotel");
var list_img = document.querySelectorAll('img');
list_img.forEach(element => {
    element.addEventListener("click", function () {
        console.log(this.src);
        img.src = this.src;
    })
});
