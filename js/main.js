
let isRect = false;
let isCircle = false;
let isLine = false;


window.onload = () =>{

    const canvas = document.getElementsByClassName('canvas')[0];
    createCanvas(canvas);

    let bitmapCanvas = document.getElementById('svg');
    let ctx = bitmapCanvas.getContext('2d');

    const rectButton = document.getElementById('rect');
    const circleButton = document.getElementById('circle'); 
    const lineButton = document.getElementById('line');
    const clearButton = document.getElementById('clear');

    canvas.addEventListener('mousedown', createRectEvents);

    //----------BUTTONS-------------------------------------
    rectButton.addEventListener('click', ()=>{
        isRect = true;
        isCircle = false;
        isLine = false;
    });
    circleButton.addEventListener('click', ()=>{
        isRect = false;
        isCircle = true;
        isLine = false;
    });
    lineButton.addEventListener('click', ()=>{
        isRect = false;
        isCircle = false;
        isLine = true;
    });
    //----------BUTTONS-------------------------------------


    function createRectEvents(e)
    {
        let shiftX = e.offsetX;
        let shiftY = e.offsetY;
        let origLoc = {X: e.offsetX, Y: e.offsetY};

        if(!isRect) return;

        isMouseDown = true;
        canvas.addEventListener('mousemove', onMouseMoveRect);
        canvas.addEventListener('mouseup',onMouseUpRect);

        let tempCanvas = bitmapCanvas.cloneNode();
        canvas.appendChild(tempCanvas);
        tempCanvas.id = 'temp';
        tempCtx = tempCanvas.getContext('2d');
        tempCtx.fillStyle = 'rgb(0,0,0)';
        tempCtx.strokeRect(shiftX,shiftY,1,1);

        
        function onMouseMoveRect(event){
            if(!isMouseDown) return;
            moveAtRect(event.offsetX, event.offsetY);
        }

        function moveAtRect(dX, dY){

            tempCtx.clearRect(0,0,window.outerWidth-100,window.outerHeight-100);
            let height = dY - shiftY; 
            if(height<0){
                height = -height;
                dY = origLoc.Y - height;
            }        
            else dY = shiftY;
            let width = dX - shiftX;
            if(width<0){
                width = -width;
                dX = origLoc.X - width;
            }    
            else dX = shiftX;        
            tempCtx.strokeRect(dX,dY,width,height);

        }

        function onMouseUpRect(){
            isMouseDown = false;
            ctx.drawImage(tempCanvas, -2.4, -2.4);
            if(document.getElementById('temp') != null)
                document.getElementById('temp').remove();
        }
    }
}