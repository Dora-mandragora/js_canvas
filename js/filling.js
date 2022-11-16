
function fillClosedLoop(screen, x, y, w, h, origC, fillC){    

    let queue = [];
    let origN = fromPlaneToDouble(x,y,w,h)*4;    
    queue.push(origN);

    //закрашиваем выбранный пиксель
    screen.data[origN] = fillC[0];
    screen.data[origN+1] = fillC[1];
    screen.data[origN+2] = fillC[2];
   
    //закрашиваем в 4 стороны каждый пиксель
    while(queue.length>0){
        currPixel = queue[queue.length - 1];
        queue.pop();

        let posY = 1;
        let tempN = 0;
        while(tempN<currPixel/4-w){
            tempN = w* posY;
            posY++;
        }
        let posX = currPixel/4 - tempN;

        if(isValid(screen,w,h,posX+1,posY,origC,fillC)){
            let n = fromPlaneToDouble(posX+1,posY,w,h)*4;           
            screen.data[n] = fillC[0];
            screen.data[n+1] = fillC[1];
            screen.data[n+2] = fillC[2];
            queue.push(n);
        }
        if(isValid(screen,w,h,posX-1,posY,origC,fillC)){
            let n = fromPlaneToDouble(posX-1,posY,w,h)*4;           
            screen.data[n] = fillC[0];
            screen.data[n+1] = fillC[1];
            screen.data[n+2] = fillC[2];
            queue.push(n);            
        }
        if(isValid(screen,w,h,posX,posY+1,origC,fillC)){ 
            let n = fromPlaneToDouble(posX,posY+1,w,h)*4;           
            screen.data[n] = fillC[0];
            screen.data[n+1] = fillC[1];
            screen.data[n+2] = fillC[2];
            queue.push(n);              
        }
        if(isValid(screen,w,h,posX,posY-1,origC,fillC)){ 
            let n = fromPlaneToDouble(posX,posY-1,w,h)*4;           
            screen.data[n] = fillC[0];
            screen.data[n+1] = fillC[1];
            screen.data[n+2] = fillC[2];
            queue.push(n);                      
        }
    }
}


//screen - картинка
//проверяет, доступен ли пиксель и подходит под условие
function isValid(screen, w, h, x, y, origColor, fillColor){
    let n = fromPlaneToDouble(x,y,w,h)*4;
    if(x < 0 || x >= w || y < 0 || y >= h || 
        (screen.data[n] != origColor[0] && screen.data[n+1] != origColor[1] && screen.data[n+2] != origColor[2]) 
        || screen.data[n] == fillColor[0] && screen.data[n+1] == fillColor[1] && screen.data[n+2] == fillColor[2])
        return false;
    return true;
}

function fromPlaneToDouble(x,y,w,h){
    //(w*y-w+x)*4;
    if(x < 0 || x >= w || y < 0 || y >= h) return 0;
    else return w*(y-1)+x;
}