

function createCanvas(canvas){
    let bitmap = document.createElement('canvas');

    bitmap.setAttribute('width', window.outerWidth-100);
    bitmap.setAttribute('height', window.outerHeight-100);
    bitmap.setAttribute('id','svg');
    let ctx = bitmap.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,bitmap.width, bitmap.height);

    canvas.appendChild(bitmap);
}