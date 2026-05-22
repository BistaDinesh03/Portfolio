document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("nav a");
    const navMenu = document.querySelector("nav");
    const navToggle = document.querySelector(".menu-toggle");

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            // Get the target ID
            const targetId = link.getAttribute("href"); //Get full href including #

            if (targetId.startsWith("#")) { // Check if it's an in-page link
                event.preventDefault(); // Prevent default if it's an in-page link
                const targetSection = document.getElementById(targetId.substring(1));

                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                    // Update the URL hash *after* scrolling is complete
                    window.history.pushState(null, null, targetId);

                }
            }
            // Close the menu if it's open on smaller screens
            if (navMenu && navToggle && navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                navToggle.classList.remove("active");
            }

        });
    });

    // Toggle navigation for small devices
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            navToggle.classList.toggle("active");
        });
    }
});


// script for form
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const button = document.querySelector(".submit-button");
    const buttonText = document.getElementById("buttonText");
    const responseMessage = document.getElementById("responseMessage");

    // Show "Sending..." message
    buttonText.textContent = "Sending...";
    button.disabled = true;

    // Prepare form data
    const formData = new FormData(this);

    // Send AJAX request
    fetch("submit_form.php", {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                responseMessage.textContent = data.message;
                responseMessage.style.color = "green";
            } else {
                responseMessage.textContent = data.message;
                responseMessage.style.color = "red";
            }

            responseMessage.classList.remove("hidden");

            // Reset button text and form after 2 seconds
            setTimeout(() => {
                buttonText.textContent = "Send Message";
                button.disabled = false;
                document.getElementById("contactForm").reset();
                responseMessage.classList.add("hidden");
            }, 2000);
        })
        .catch(error => {
            responseMessage.textContent = "An error occurred. Please try again.";
            responseMessage.style.color = "red";
            responseMessage.classList.remove("hidden");

            setTimeout(() => {
                buttonText.textContent = "Send Message";
                button.disabled = false;
                responseMessage.classList.add("hidden");
            }, 2000);
        });
});
