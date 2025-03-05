document.querySelector("#contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
        alert("Please fill out all fields.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();
        if (result.success) {
            alert("Message sent successfully!");
        } else {
            alert("Failed to send message. Try again.");
        }
    } catch (error) {
        alert("Error sending message.");
    }
});
