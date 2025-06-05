<?php
// Database credentials
$servername = "localhost"; // Usually 'localhost' for local development
$username = "root"; // Your database username
$password = ""; // Your database password (often empty for root in local setups)
$dbname = "consultation_db"; // The name of your database

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Handle Testimonial Form Submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['reviewerName'])) {
    $reviewerName = $_POST['reviewerName'];
    $reviewText = $_POST['reviewText'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO testimonials (reviewer_name, review_text) VALUES (?, ?)");
    if ($stmt === false) {
        echo "Error preparing statement: " . $conn->error;
    } else {
        $stmt->bind_param("ss", $reviewerName, $reviewText);

        if ($stmt->execute()) {
            echo "Thank you for your review!";
        } else {
            echo "Error: " . $stmt->error;
        }
        $stmt->close();
    }
}

// Handle Appointment Form Submission
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['fullName'])) {
    $fullName = $_POST['fullName'];
    $email = $_POST['email'];
    $phone = isset($_POST['phone']) ? $_POST['phone'] : null;
    $preferredDate = $_POST['preferredDate'];
    $message = isset($_POST['message']) ? $_POST['message'] : null;

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO appointments (full_name, email, phone, preferred_date, message) VALUES (?, ?, ?, ?, ?)");
    if ($stmt === false) {
        echo "Error preparing statement: " . $conn->error;
    } else {
        $stmt->bind_param("sssss", $fullName, $email, $phone, $preferredDate, $message);

        if ($stmt->execute()) {
            echo "Appointment booked successfully! We will contact you soon.";
        } else {
            echo "Error: " . $stmt->error;
        }
        $stmt->close();
    }
}

// Close connection
$conn->close();
?>