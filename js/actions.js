

function createCanvas(canvas){
    bitmap = document.createElement('canvas');

    bitmap.setAttribute('width', window.outerWidth-100);
    bitmap.setAttribute('height', window.outerHeight-100);
    bitmap.setAttribute('id','svg');

    canvas.appendChild(bitmap);
}