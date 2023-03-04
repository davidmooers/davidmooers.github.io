function fade() {
    var elements = document.querySelectorAll(".fade-in");
    for (var i=0; i < elements.length; i++) {
        var bounds = elements[i].getBoundingClientRect();
        if (bounds.top < window.innerHeight && bounds.bottom >= -20) {
            elements[i].classList.add("active");
        } else {
            elements[i].classList.remove("active");
        }
    }
}

function showNav() {
    var navbar = document.querySelector(".navigation");
    var hero = document.querySelector(".hero");
    var bounds = hero.getBoundingClientRect();
    if (bounds.bottom < 0) navbar.classList.add("active");
    else navbar.classList.remove("active");
}

fade();
window.addEventListener("scroll", fade);
setInterval(showNav, 50);