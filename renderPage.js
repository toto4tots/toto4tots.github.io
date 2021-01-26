
function render(width, height) {
    const txt = document.getElementById('objString').value;
    const canvas = document.getElementById('picture');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    create(txt, width, height, (x, y, color) => {
        context.fillStyle = `rgba(${color.x * 255}, ${color.y * 255}, ${color.z * 255}, 1)`;
        context.fillRect(x, y, 1, 1);
    });
}

function reload() {
    window.location.reload();
}