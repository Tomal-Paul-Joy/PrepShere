document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch('/teacher/main/papers');
    const users = await response.json();
    const usersList = document.getElementById('usersList');

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
        
            <a href="/teacher/main/papers-pages/${user.userEmail}">
                
                <div class="divi"><h3>${user.userEmail}</h3></div>
               <!-- <img src="${user.images.image1}" alt="Image 1" height="500" width="500">
                <img src="${user.images.image2}" alt="Image 2" height="500" width="500">
                <img src="${user.images.image3}" alt="Image 3" height="500" width="500">
                <img src="${user.images.image4}" alt="Image 4" height="500" width="500">
                <img src="${user.images.image5}" alt="Image 5" height="500" width="500">
                <img src="${user.images.image6}" alt="Image 6" height="500" width="500">
                <img src="${user.images.image7}" alt="Image 7" height="500" width="500">
                <img src="${user.images.image8}" alt="Image 8" height="500" width="500">-->
            </a>
        `;
        usersList.appendChild(userDiv);
    });
});