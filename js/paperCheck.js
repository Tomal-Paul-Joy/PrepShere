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
});
