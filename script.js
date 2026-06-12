const btn = document.getElementById("removeBtn");
const imageInput = document.getElementById("imageInput");
const result = document.getElementById("result");

 

const preview = document.getElementById("preview");

imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];

    if(file){
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }
});

btn.addEventListener("click", async () => {

    const file = imageInput.files[0];

    if (!file) {
        alert("اختر صورة أولاً");
        return;
    }

   result.innerHTML = `
<div class="loader"></div>
<p>جاري إزالة الخلفية...</p>
`;

    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    try {

        const response = await fetch(
            "https://api.remove.bg/v1.0/removebg",
            {
                method: "POST",
                headers: {
                    "X-Api-Key": "dUzgZFgpcD7VwoXrFzg8DHZy"
                },
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error("API Error");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        result.innerHTML = `
            <h3>تمت إزالة الخلفية</h3>
            <img src="${imageUrl}" width="300">
        `;

        const downloadBtn = document.getElementById("downloadBtn");
        downloadBtn.href = imageUrl;
        downloadBtn.style.display = "inline-block";

      setTimeout(() => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}, 300);

       

    } catch (error) {

        result.innerHTML = "حدث خطأ أثناء معالجة الصورة";
        console.error(error);

    }

});


imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];

    if(file){
        const preview = document.getElementById("preview");
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }
});