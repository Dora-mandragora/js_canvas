
let isRect = false;
let isCircle = false;
let isLine = false;
let isPen = false;

let isClear = false;
let isFlood = false;


//сделать белую заливку холста, чтобы работала сама заливка
window.onload = () =>{

    const canvas = document.getElementsByClassName('canvas')[0];
    createCanvas(canvas);

    let bitmapCanvas = document.getElementById('svg');
    
    const rectButton = document.getElementById('rect');
    const circleButton = document.getElementById('circle'); 
    const lineButton = document.getElementById('line');
    const penButton = document.getElementById('pen');
    const clearButton = document.getElementById('clear');
    const floodButton = document.getElementById('flood');

    //canvas.addEventListener('mousedown', chooseFigure);
    canvas.addEventListener('mousedown', createRectEvents);
    canvas.addEventListener('mousedown', createCircleEvents);
    canvas.addEventListener('mousedown', createLineEvents);
    canvas.addEventListener('mousedown', createFillEvent);
    //----------BUTTONS-------------------------------------
    rectButton.addEventListener('click', ()=>{
        isRect = true;
        isCircle = false;
        isLine = false;
        isPen = false;
        isFlood = false;
    });
    circleButton.addEventListener('click', ()=>{
        isRect = false;
        isCircle = true;
        isLine = false;
        isPen = false;
        isFlood = false;
    });
    lineButton.addEventListener('click', ()=>{
        isRect = false;
        isCircle = false;
        isLine = true;
        isPen = false;
        isFlood = false;
    });
    penButton.addEventListener('click', ()=>{
        isRect = false;
        isCircle = false;
        isLine = false;
        isPen = true;
        isFlood = false;
    });
    clearButton.addEventListener('click', () =>{

        canvas.removeChild(bitmapCanvas);
        createCanvas(canvas);

        bitmapCanvas = document.querySelector('#svg');
        //ctx = bitmapCanvas.getContext('2d');
    });
    floodButton.addEventListener('click', () =>{
        isRect = false;
        isCircle = false;
        isLine = false;
        isPen = false;
        isFlood = true;
    })
    //----------BUTTONS-------------------------------------

    function chooseFigure(){
        if(isRect) canvas.addEventListener('mousedown', createRectEvents);
        else canvas.removeEventListener('mousedown', createRectEvents);
        if(isCircle) canvas.addEventListener('mousedown', createCircleEvents);
        else canvas.removeEventListener('mousedown', createCircleEvents);
        if(isLine || isPen) canvas.addEventListener('mousedown', createLineEvents);
        else canvas.removeEventListener('mousedown', createLineEvents);
        if(isFlood) canvas.addEventListener('mousedown', createFillEvent);
        else canvas.removeEventListener('mousedown', createFillEvent);

    }

    function createRectEvents(e)
    {
        if(!isRect) return;
        let ctx = bitmapCanvas.getContext('2d');


        let shiftX = e.offsetX;
        let shiftY = e.offsetY;
        let origLoc = {X: e.offsetX, Y: e.offsetY};
        let borderColor = document.getElementById('border').value;
        let fillColor = document.getElementById('fill').value;
        let border = document.getElementById('border-width').value;

        isMouseDown = true;
        canvas.addEventListener('mousemove', onMouseMoveRect);
        canvas.addEventListener('mouseup',onMouseUpRect);

        let tempCanvas = bitmapCanvas.cloneNode();
        canvas.appendChild(tempCanvas);
        tempCanvas.id = 'temp';
        tempCtx = tempCanvas.getContext('2d');
        tempCtx.fillStyle = fillColor;
        tempCtx.strokeStyle = borderColor;
        tempCtx.lineWidth = border;
        tempCtx.fillRect(shiftX,shiftY,1,1);

        
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
            tempCtx.fillRect(dX,dY,width,height);

        }

        function onMouseUpRect(){
            isMouseDown = false;
            canvas.removeEventListener('mousemove', onMouseMoveRect);
            canvas.removeEventListener('mouseup',onMouseUpRect);
            ctx.drawImage(tempCanvas, -2.4, -2.4);
            if(document.getElementById('temp') != null)
                document.getElementById('temp').remove();
        }
    }

    function createCircleEvents(e){
        if(!isCircle) return;

        let ctx = bitmapCanvas.getContext('2d');

        let shiftX = e.offsetX;
        let shiftY = e.offsetY;
        let borderColor = document.getElementById('border').value;
        let fillColor = document.getElementById('fill').value;
        let border = document.getElementById('border-width').value;

        isMouseDown = true;
        canvas.addEventListener('mousemove', onMouseMoveCircle);
        canvas.addEventListener('mouseup',onMouseUpCircle);

        let tempCanvas = bitmapCanvas.cloneNode();
        canvas.appendChild(tempCanvas);
        tempCanvas.id = 'temp';
        tempCtx = tempCanvas.getContext('2d');
        tempCtx.fillStyle = fillColor;
        tempCtx.strokeStyle = borderColor;
        tempCtx.lineWidth = border;
        //рисовать круг       
        tempCtx.arc(shiftX,shiftY, 1, 0, Math.PI*2);
        tempCtx.stroke();


        function onMouseMoveCircle(e){
            if(!isMouseDown) return;
            moveAtCircle(e.offsetX, e.offsetY);
        }
        function moveAtCircle(dX, dY){
            tempCtx.clearRect(0,0,window.outerWidth-100,window.outerHeight-100);
            let radius = Math.sqrt((dX-shiftX)**2+
            (dY-shiftY)**2); 

            tempCtx.beginPath();
            //tempCtx.moveTo(shiftX,shiftY);
            tempCtx.arc(shiftX, shiftY, radius, 0, Math.PI*2);
            tempCtx.stroke();
            tempCtx.fill();
            
        }
        
        function onMouseUpCircle(){
            isMouseDown = false;
            canvas.removeEventListener('mousemove', onMouseMoveCircle);
            canvas.removeEventListener('mouseup',onMouseUpCircle);

            ctx.drawImage(tempCanvas, -2.4, -2.4);
            if(document.getElementById('temp') != null)
                document.getElementById('temp').remove();
        }
    }

    function createLineEvents(e){
        if(!(isLine || isPen)) return;

        let ctx = bitmapCanvas.getContext('2d');

        let shiftX = e.offsetX;
        let shiftY = e.offsetY;
        let origLoc = {X: e.offsetX, Y: e.offsetY};

        let borderColor = document.getElementById('border').value;
        let border = document.getElementById('border-width').value;

        isMouseDown = true;
        canvas.addEventListener('mousemove', onMouseMoveLine);
        canvas.addEventListener('mouseup',onMouseUpLine);

        let tempCanvas = bitmapCanvas.cloneNode();
        canvas.appendChild(tempCanvas);
        tempCanvas.id = 'temp';
        tempCtx = tempCanvas.getContext('2d');
        tempCtx.strokeStyle = borderColor;
        tempCtx.lineWidth = border;

        function onMouseMoveLine(e){
            if(!isMouseDown) return;
            moveAtLine(e.offsetX, e.offsetY);
        }
        function moveAtLine(dX, dY){
            tempCtx.clearRect(0,0,window.outerWidth-100,window.outerHeight-100);
            
            if(isPen){
                //без этой строки превращается в обычную кисть(почти)
                tempCtx.lineTo(dX,dY);
                //tempCtx.moveTo(dX,dY);               
            }
            
            if(isLine){
                //beginPath обязателен для того, чтобы не происходило копирование объектов
                tempCtx.beginPath();
                tempCtx.moveTo(origLoc.X,origLoc.Y);
                tempCtx.lineTo(dX,dY);
            }                     

            tempCtx.stroke();
        }

        function onMouseUpLine(){    
            isMouseDown = false;
            canvas.removeEventListener('mousemove', onMouseMoveLine);
            canvas.removeEventListener('mouseup',onMouseUpLine);
            ctx.drawImage(tempCanvas, -2.4, -2.4);
            if(document.getElementById('temp') != null)
                document.getElementById('temp').remove();
        }
    }

    function createFillEvent(e){
        if(!isFlood) return;
        let arrowX = e.offsetX;
        let arrowY = e.offsetY;

        let bitmapCanvas = document.getElementById('svg');
        let ctx = bitmapCanvas.getContext('2d');
        let screen = ctx.getImageData(0,0, window.outerWidth-100,window.outerHeight-100);
        

    //взять пиксель и узнать его цвет
        let origColor = ctx.getImageData(arrowX,arrowY,1,1).data;
        let fillColor = document.querySelector('#fill').value;

        let red = fillColor[1] + fillColor[2];
        let green = fillColor[3] + fillColor[4];
        let blue = fillColor[5] + fillColor[6];
        fillColor = ctx.getImageData(0,0,1,1).data;
        fillColor[0] = parseInt(red,16);
        fillColor[1] = parseInt(green,16);
        fillColor[2] = parseInt(blue,16);
        
        fillClosedLoop(screen, arrowX, arrowY, bitmapCanvas.width, bitmapCanvas.height, origColor, fillColor);
        
        //отображение заливки
        ctx.putImageData(screen, 0,0);
        
    }
}