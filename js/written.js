


document.addEventListener('DOMContentLoaded', () => {
    const fileInputs = Array.from(document.querySelectorAll('input[type="file"]'));

    fileInputs.forEach((input, index) => {
        input.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    document.querySelector(`.div${index + 1}`).innerHTML = `<img src="${e.target.result}" alt="Image ${index + 1}" height="400px" width="400px">`;
                }
                reader.readAsDataURL(file);
            }
        });
    });
});

