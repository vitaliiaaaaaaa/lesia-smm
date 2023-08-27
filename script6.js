function openInstagram() {
    var link = "https://instagram.com/lesia.lutchyn?igshid=MzRlODBiNWFlZA==";
    var win = window.open(link, '_blank');
    win.focus();
}
const burgerIcon = document.querySelector('.burger-icon');
const menuMain = document.querySelector('.menu-main');

burgerIcon.addEventListener('click', () => {
    burgerIcon.parentElement.classList.toggle('show');
    menuMain.classList.toggle('show');
});

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

function moveCards() {
    cardContainer.removeEventListener("click", moveCards);
    cards.forEach((card, index) => {
        let leftPos = `${20 + index * 30}vw`;
        let rotation = (index - 1) * 5;
        card.style.transition = "all 0.8s ease-in-out";
        card.style.left = leftPos;
        card.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    });
    document.querySelector("#btn").style.display = "block";
}

function swapCards() {
    let tempHTML = cards[0].innerHTML;
    cards[0].innerHTML = cards[1].innerHTML;
    cards[1].innerHTML = tempHTML;
}
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
    const zIndex = getZindex([...$items], active)[index]
    item.style.setProperty('--zIndex', zIndex)
    item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
    progress = Math.max(0, Math.min(progress, 100))
    active = Math.floor(progress/100*($items.length-1))

    $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
    item.addEventListener('click', () => {
        progress = (i/$items.length) * 100 + 10
        animate()
    })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
    const wheelProgress = e.deltaY * speedWheel
    progress = progress + wheelProgress
    animate()
}

const handleMouseMove = (e) => {
    if (e.type === 'mousemove') {
        $cursors.forEach(($cursor) => {
            $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
        })
    }
    if (!isDown) return
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const mouseProgress = (x - startX) * speedDrag
    progress = progress + mouseProgress
    startX = x
    animate()
}

const handleMouseDown = e => {
    isDown = true
    startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
    isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)


$(document).ready(function () {
    const owl = $('.owl-carousel');

    owl.owlCarousel({
        center: true,
        loop: true,
        margin: 10,
        startPosition: 1,
        items: 3,
    });

    const sliderItems = document.querySelectorAll('.slider__item');
    const activeItem = document.querySelector('.slider .center .slider__item');

    const resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
            if (entry.target === activeItem) {
                const isActive = entry.target.classList.contains('center');
                if (isActive) {
                    entry.target.style.height = '100vh'; // Збільшити активний слайд
                } else {
                    entry.target.style.height = 'auto'; // Повернути розмір для неактивних слайдів
                }
            }
        }
    });

    sliderItems.forEach(item => {
        resizeObserver.observe(item);
    });

    $('.slider__btn--prev').click(function () {
        owl.trigger('prev.owl.carousel');
    });

    $('.slider__btn--next').click(function () {
        owl.trigger('next.owl.carousel');
    });
});
