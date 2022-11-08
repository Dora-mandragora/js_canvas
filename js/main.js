
let isRect = false;
let isCircle = false;
let isLine = false;
let isPen = false;

let isClear = false;

window.onload = () =>{

    const canvas = document.getElementsByClassName('canvas')[0];
    createCanvas(canvas);

    let bitmapCanvas = document.getElementById('svg');
    
    const rectButton = document.getElementById('rect');
    const circleButton = document.getElementById('circle'); 
    const lineButton = document.getElementById('line');
    const penButton = document.getElementById('pen');
    const clearButton = document.getElementById('clear');

    //canvas.addEventListener('mousedown', chooseFigure);
    canvas.addEventListener('mousedown', createRectEvents);
    canvas.addEventListener('mousedown', createCircleEvents);
    canvas.addEventListener('mousedown', createLineEvents);

    //----------BUTTONS-------------------------------------
    rectButton.addEventListener('click', ()=>{
        isRect = true;
        isCircle = false;
        isLine = false;
        isPen = false;
    });
    circleButton.addEventListener('click', ()=>{
        isRect = false;
        isCircle = true;
        isLine = false;
        isPen = false;
    });
    lineButton.addEventListener('click', ()=>{
        isRect = false;
        isCircle = false;
        isLine = true;
        isPen = false;
    });
    penButton.addEventListener('click', ()=>{
        isRect = false;
        isCircle = false;
        isLine = false;
        isPen = true;
    });
    clearButton.addEventListener('click', () =>{

        canvas.removeChild(bitmapCanvas);
        createCanvas(canvas);

        bitmapCanvas = document.querySelector('#svg');
        //ctx = bitmapCanvas.getContext('2d');
    });
    //----------BUTTONS-------------------------------------

    function chooseFigure(){
        if(isRect) canvas.addEventListener('mousedown', createRectEvents);
        else canvas.removeEventListener('mousedown', createRectEvents);
        if(isCircle) canvas.addEventListener('mousedown', createCircleEvents);
        else canvas.removeEventListener('mousedown', createCircleEvents);
        if(isLine || isPen) canvas.addEventListener('mousedown', createLineEvents);
        else canvas.removeEventListener('mousedown', createLineEvents);
        

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

        isMouseDown = true;
        canvas.addEventListener('mousemove', onMouseMoveRect);
        canvas.addEventListener('mouseup',onMouseUpRect);

        let tempCanvas = bitmapCanvas.cloneNode();
        canvas.appendChild(tempCanvas);
        tempCanvas.id = 'temp';
        tempCtx = tempCanvas.getContext('2d');
        tempCtx.fillStyle = fillColor;
        tempCtx.strokeStyle = borderColor;
        tempCtx.lineWidth = 5;
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

        isMouseDown = true;
        canvas.addEventListener('mousemove', onMouseMoveCircle);
        canvas.addEventListener('mouseup',onMouseUpCircle);

        let tempCanvas = bitmapCanvas.cloneNode();
        canvas.appendChild(tempCanvas);
        tempCanvas.id = 'temp';
        tempCtx = tempCanvas.getContext('2d');
        tempCtx.fillStyle = fillColor;
        tempCtx.strokeStyle = borderColor;
        tempCtx.lineWidth = 4;
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

        isMouseDown = true;
        canvas.addEventListener('mousemove', onMouseMoveLine);
        canvas.addEventListener('mouseup',onMouseUpLine);

        let tempCanvas = bitmapCanvas.cloneNode();
        canvas.appendChild(tempCanvas);
        tempCanvas.id = 'temp';
        tempCtx = tempCanvas.getContext('2d');
        tempCtx.strokeStyle = borderColor;


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

}