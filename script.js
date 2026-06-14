 const btn = document.getElementById("removeBtn");
const imageInput = document.getElementById("imageInput");
const result = document.getElementById("result");
const preview = document.getElementById("preview");
const downloadBtn = document.getElementById("downloadBtn");

let imageUrl = null;

// عرض الصورة قبل المعالجة
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];

    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }
});

// زر إزالة الخلفية
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
            const err = await response.text();
            console.log(err);
            throw new Error("API Error");
        }

         const blob = await response.blob();

// إنشاء رابط تحميل مباشر
const url = window.URL.createObjectURL(blob);

result.innerHTML = `
    <h3>تمت إزالة الخلفية</h3>
    <img src="${url}" width="300">
    <p>اضغط على زر التحميل</p>
`;

const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.style.display = "inline-block";
downloadBtn.textContent = "تحميل الصورة";

// تحميل حقيقي عند الضغط
downloadBtn.onclick = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = "background-removed.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};

        setTimeout(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        }, 300);

    } catch (error) {
        console.error(error);
        result.innerHTML = "حدث خطأ أثناء معالجة الصورة";
    }
});
