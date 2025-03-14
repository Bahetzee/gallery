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

// Expand Image on Click
const galleryItems = document.querySelectorAll(".gallery-item");
let currentExpanded = null;

galleryItems.forEach(item => {
    item.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent click from bubbling up

        if (currentExpanded === this) {
            // If clicking the already expanded item, collapse it
            this.classList.remove("expanded");
            currentExpanded = null;
        } else {
            // Collapse any previously expanded item
            if (currentExpanded) {
                currentExpanded.classList.remove("expanded");
            }
            // Expand the clicked item
            this.classList.add("expanded");
            currentExpanded = this;
        }
    });
});

// Close expanded image when clicking outside
document.addEventListener("click", function (e) {
    if (currentExpanded && !currentExpanded.contains(e.target)) {
        currentExpanded.classList.remove("expanded");
        currentExpanded = null;
    }
});

// Toggle Captions on Small Screens
function handleCaptions() {
    const captions = document.querySelectorAll(".caption");

    if (window.innerWidth <= 768) {
        galleryItems.forEach(item => {
            item.removeEventListener("click", toggleCaption); // Avoid duplicate listeners
            item.addEventListener("click", toggleCaption);
        });
    } else {
        captions.forEach(caption => {
            caption.style.transform = "translateY(100%)";
        });
    }
}

function toggleCaption(e) {
    if (!this.classList.contains("expanded")) { // Only toggle if not expanded
        const caption = this.querySelector(".caption");
        caption.style.transform = 
            caption.style.transform === "translateY(0px)" ? 
            "translateY(100%)" : "translateY(0px)";
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
