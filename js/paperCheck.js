document.addEventListener('DOMContentLoaded', async function () {
    // Extract userEmail parameter from the URL
    const userEmail = window.location.pathname.split('/').pop();

    try {
        // Fetch the user data from the server using the userEmail parameter
        const response = await fetch(`/teacher/main/papers/${userEmail}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const user = await response.json();

        const usersList = document.getElementById('usersList');

        // Append each image in its own div with the class "divi"
        Object.keys(user.images).forEach((key, index) => {
            const userDiv = document.createElement('div');
            userDiv.className = 'divi';
            userDiv.innerHTML = `<img src="${user.images[key]}" alt="Image ${index + 1}" height="400" width="400">`;
            usersList.appendChild(userDiv);
        });

    } catch (error) {
        console.error('Error fetching user data:', error);
    }

    // Set the form action dynamically based on the userEmail
    const form = document.getElementById('marksForm');
    form.setAttribute('action', `/teacher/main/papers-pages/${userEmail}`);

    // Handle form submission
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
            const response = await fetch(form.getAttribute('action'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.text();
            alert(result);

        } catch (error) {
            console.error('Error submitting marks:', error);
        }
    });
});
