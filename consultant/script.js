document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const currentYearElements = document.querySelectorAll('[id^="current-year"]');
    const currentYear = new Date().getFullYear();
    currentYearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // Form submission for testimonials (client-side validation/feedback)
    const reviewForm = document.getElementById('reviewForm');
    const formMessage = document.getElementById('form-message');

    if (reviewForm) {
        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(reviewForm);
            const response = await fetch('database.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.text(); // Or response.json() if your PHP returns JSON

            formMessage.textContent = result; // Display message from PHP
            reviewForm.reset(); // Clear the form
        });
    }

    // Form submission for appointments (client-side validation/feedback)
    const bookingForm = document.getElementById('bookingForm');
    const bookingMessage = document.getElementById('booking-message');

    if (bookingForm) {
        bookingForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(bookingForm);
            const response = await fetch('database.php', {
                method: 'POST',
                body: formData
            });
            const result = await response.text(); // Or response.json()

            bookingMessage.textContent = result; // Display message from PHP
            bookingForm.reset(); // Clear the form
        });
    }
});