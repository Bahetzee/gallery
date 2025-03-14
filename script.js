// Lazy Loading Images
document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll("img.lazy");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add("loaded");
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Smooth Scroll for Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle Captions on Small Screens
function handleCaptions() {
    const captions = document.querySelectorAll(".caption");
    const galleryItems = document.querySelectorAll(".gallery-item");

    if (window.innerWidth <= 768) {
        galleryItems.forEach(item => {
            item.addEventListener("click", function () {
                const caption = this.querySelector(".caption");
                caption.style.transform = 
                    caption.style.transform === "translateY(0px)" ? 
                    "translateY(100%)" : "translateY(0px)";
            });
        });
    } else {
        captions.forEach(caption => {
            caption.style.transform = "translateY(100%)";
        });
    }
}

// Run on load and resize
window.addEventListener("load", handleCaptions);
window.addEventListener("resize", handleCaptions);

// Dynamic Grid Adjustment (optional enhancement)
function adjustGrid() {
    const gallery = document.querySelector(".gallery");
    const items = gallery.querySelectorAll(".gallery-item");
    if (window.innerWidth <= 480 && items.length > 2) {
        gallery.style.gridTemplateColumns = "1fr";
    }
}

window.addEventListener("resize", adjustGrid);
window.addEventListener("load", adjustGrid);