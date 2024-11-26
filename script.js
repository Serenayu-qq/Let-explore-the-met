let currentIndex = 0;
const totalImages = 15;  // 总共15张图片
const carousel = document.getElementById('carousel');
const imageWidth = 320;  // 图片宽度（300px + 20px间距）

function updateCarouselPosition() {
    const offset = -currentIndex * imageWidth;
    carousel.style.transform = `translateX(${offset}px)`;
}

function nextImage() {
    if (currentIndex < totalImages - 3) {  // 保证在最后一张时不会超出
        currentIndex++;
        updateCarouselPosition();
    }
}

function prevImage() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarouselPosition();
    }
}