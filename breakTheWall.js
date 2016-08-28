

function findHeight(){
 height= screen.availHeight;
 document.getElementById('mainCanvas').height=height;
 console.log(height);
 return height;
}

function findWidth()
{
 width=screen.availWidth+50;
 document.getElementById('mainCanvas').width=width;
 console.log(width);
 return width;
}

function doFirst()
{  // console.log(findWidth());
   //console.log("height:" + screen.height);
    var can=document.getElementById('mainCanvas');
    canvas=can.getContext('2d');
    livesRemaining=3;
    fireGun=false;
    gunHeight=15;
    alreadyFiring=0;
    speed=8;
    start=false;
    //width=1350;
   // height=740;
    ballRadius=20;
    boardX=420;
    boardY=height-20;
    brickArray=[];
    boardWidth=180;
    ballX=boardWidth/2+boardX;
   // alert(ballX);
    ballY=height-3*ballRadius;
    ballPreviousX=ballX;
   // ballPreviousY=ballY;
    ballSpeedX=0;              // in terms of time
    ballSpeedY=0;             //in terms of time
   // alert(brickArray[0][4]);
   // mouseX=0;
    mouseX=0;  
    previousMouseX=boardX+boardWidth/2;
    brickWidth=60;
    brickHeight=20;
    brickNo=Math.ceil(width/brickWidth);
    fireVariable1=new fire();
    fireVariable2=new fire();
    moveVariable=new moveBoard();
    moveVariable.distanceToMove=0;
    canvas.beginPath();
    canvas.arc(boardX,boardY,ballRadius,0.5*Math.PI,1.5*Math.PI);
    canvas.fill();
    drawBoard(boardX,boardY);
    drawEnvironment();
}

function drawEnvironment()
{
   for(var i=0;i<15;i++)
   {
    brickArray[i]=[];
   }
    var toss;
  
    for(var i=0;i<15;i++)
    {
      for(var j=0;j<brickNo;j++)
      { 
       toss=Math.ceil(Math.random()*2-1);
       brickArray[i][j]=toss;
       if(toss==1)
       {
         makeBrick(i,j,"red");
       }
       
      }
    }   
    
   drawMagicBrick();
}


function drawMagicBrick()
{
    var tossX,tossY;
    for(var i=0;i<5;i++)
    {
      tossX=Math.floor(Math.random()*14);
      tossY=Math.floor(Math.random()*brickNo);
      brickArray[tossX][tossY]=2;
      makeBrick(tossX,tossY,'green');
    }
}

function makeBrick(i,j,color)
{

    canvas.fillStyle=color;
    canvas.fillRect(j*brickWidth,i*brickHeight,brickWidth,brickHeight);
    canvas.fillStyle="white";
    canvas.strokeRect(j*brickWidth,i*brickHeight,brickWidth,brickHeight);
}

function drawBoard(x,y)
{
           // alert('fs');
		  boardX=x;
		  boardY=y;
		  canvas.fillStyle='black';
		  canvas.fillRect(0,height-2*ballRadius,width,2*ballRadius);
		  canvas.fillStyle='grey';
		  canvas.beginPath();
		  canvas.arc(boardX,boardY,ballRadius,0.5*Math.PI,1.5*Math.PI);
		  canvas.fill();
		  canvas.beginPath();
		  canvas.arc(boardX+boardWidth,boardY,ballRadius,-0.5*Math.PI,0.5*Math.PI);
		  canvas.fill();
		
		  canvas.fillRect(boardX,boardY-ballRadius,boardWidth,2*ballRadius); 
		  if(fireGun==true)
		  {
		   drawFireGun(); 
		  }
		  if(ballY==(height-3*ballRadius))// && (ballX>=boardX) && (ballX<=boardX+boardWidth))
		  {
		   //alert(ballX+"  "+moveVariable.distanceToMove);
		  ballX=ballX+moveVariable.distanceToMove;
	   //  ballY=height-3*ballRadius;
		   canvas.fillStyle="black";
		   canvas.fillRect(0,height-4*ballRadius,width,2*ballRadius);
		   canvas.beginPath();
		   canvas.fillStyle='purple';
		   canvas.arc(ballX,ballY,ballRadius,0,2*Math.PI);
		   canvas.fill();

  }
}

function getMouseCoordinateX(e){                   //  checks the position of x coordinate of mouse 
  
     mouseX=e.clientX;
     moveVariable.distanceToMove=mouseX-previousMouseX;
     //moveVariable.move();
     
     if(moveVariable.distanceToMove!=0)
     {
      moveVariable.move();
     }
     previousMouseX=mouseX; 
}

function moveBoard(){

  this.distanceToMove;
  //this.noOfLoops=this.distanceToMove/ballRadius;
  
  this.move=function move()
  {
     var me=this;
 
     
     boardX+=this.distanceToMove;
     if(boardX>(width-ballRadius-boardWidth))
      {
       this.distanceToMove=boardX-this.distanceToMove;//width-ballRadius-boardWidth-boardX;
       
        boardX=width-ballRadius-boardWidth;
        this.distanceToMove=boardX- this.distanceToMove;
       //ballX=boardX
      }
     //  else if(this.distanceToMove<=0)
     //boardX-=5;
     else if(boardX<(ballRadius))
      {
       this.distanceToMove=boardX-this.distanceToMove;//boardX-ballRadius;
       boardX=ballRadius;
       this.distanceToMove=boardX- this.distanceToMove;
      }

     drawBoard(boardX,boardY);
     
  
    // this.distanceToMove=mouseX-boardX;
     
  //    loopToMove=setTimeout(function (){me.move();},1000)
     if(Math.abs(this.distanceToMove)<=5)
     {
    //  clearTimeout(loopToMove); 
     }
   
  }
  
  
  
}

function startGame(){
   
   ballSpeedY=1;
   continueGame();
   
}

function continueGame()
{
    collission=0;  
   if(  ballPreviousX!=ballX && (ballY==(height-3*ballRadius)) &&  (ballSpeedY==1) )
   {
      ballSpeedX+=(ballX-ballPreviousX)/25;
      if(ballSpeedX>5)
      {
       ballSpeedX=5;
      }
      else if(ballSpeedX<-5)
      {
       ballSpeedX=-5;
      }
            
   }
      
   for(var i=14;i>=0;i--)
   {
     for(var j=0;j<brickNo;j++)
     {
       if(brickArray[i][j]==1 || brickArray[i][j]==2)
       {
       
        if((ballX==((j+1)*brickWidth+ballRadius)) && (ballY>=(i*brickHeight) && ballY<=(i+1)*brickHeight) && ballSpeedX<0)
         {
        
          removeBrick(i,j);
           collission=2;
          
         }

        if((ballX==((j)*brickWidth-ballRadius)) && (ballY>=(i*brickHeight) && ballY<=(i+1)*brickHeight) && ballSpeedX>0)
         {
          
           removeBrick(i,j);
           collission=2;
           
         }
        
          if( (ballX<=((j+1)*brickWidth))  && (ballX>=(j*brickWidth)) && (ballY==((i+1)*brickHeight+ballRadius)  || ballY == (((i)*brickHeight-ballRadius))) )
         {
           removeBrick(i,j);
           collission=1;
         
         }
         
      
         if( (((ballY<=((i+1)*brickHeight+ballRadius)) && (ballY>=((i+1)*brickHeight)))   ) &&  (ballX<((j+1)*brickWidth+ballRadius))  && (ballX>((j+1)*brickWidth)  ) ) 
         {
           removeBrick(i,j);
           collission=1;
         }
         
         if((ballY<=((i)*brickHeight+ballRadius) && (ballY>=((i)*brickHeight)))  &&  (ballX<((j+1)*brickWidth+ballRadius))  && (ballX>((j+1)*brickWidth)  ) )
         {
      
           removeBrick(i,j);
           collission=1;
         }
         
         if( ( ((ballY<=((i+1)*brickHeight+ballRadius)) && (ballY>=((i)*brickHeight+ballRadius)))  )  && (ballX>((j)*brickWidth-ballRadius))  && (ballX<((j)*brickWidth)) )
         {
           removeBrick(i,j);
           collission=1;
         
         }
         
         
         if( (ballY<=((i)*brickHeight+ballRadius) && (ballY>=((i)*brickHeight)) )  && (ballX>((j)*brickWidth-ballRadius))  && (ballX<((j)*brickWidth)))
         {
    
           removeBrick(i,j);
           collission=1;
         }
       }
       
  
     }
   }
   

   
   if((ballY==(boardY-2*ballRadius)) && (ballSpeedY==-1) && ((ballX>=(boardX-ballRadius)) && (ballX<=(boardX+boardWidth+ballRadius))) )
   {
    ballPreviousX=ballX;
    collission=1;
   }
   
      if((ballY==(ballRadius) && (ballSpeedY==1)))
   {
      
      collission=1;
   }
   
      if(ballX<(boardX) && (ballX>(boardX-2*ballRadius)) || (ballX>(boardX+boardWidth) && ballX<(boardX+boardWidth+2*ballRadius))){}
   
  
   if((ballX<=(ballRadius) && ballSpeedX<0) || (ballX>=(width-ballRadius) && ballSpeedX>0) )
   {
   
     collission=2; 
   }
   
   
  // if( (ballY )  )
   
   if(collission==0)
   {      
     canvas.fillStyle="black";
     canvas.beginPath();
     canvas.arc(ballX,ballY,ballRadius+1,0,2*Math.PI);
     canvas.fill();
     ballY=ballY-brickHeight*ballSpeedY/5;
     ballX=ballX+ballSpeedX;
     canvas.fillStyle="purple"; 
     canvas.beginPath();
     canvas.arc(ballX,ballY,ballRadius,0,2*Math.PI);
     canvas.fill();

    // moveBall=setTimeout('continueGame()',speed);
   }
   
   
   else if(collission==1)
   {
    ballSpeedY*=-1;
   // moveBall=setTimeout('continueGame()',speed);
   }
   
   
   else if(collission==2)
   {
   // ballSpeedX*=-1;
    ballSpeedX*=-1;
  //  moveBall=setTimeout('continueGame()',speed);
   }
   moveBall=setTimeout('continueGame()',speed);
    if(ballY>=(height-ballRadius))
   {
     start=false;
     livesRemaining--;
     clearTimeout(moveBall);
   }
   
}  
 

function collissionAtCurve(x){
 // ballY>(height-3*ballRadius) && (ballSpeedY==-1)
    y=height-ballY-ballRadius;
   if(y==(Math.sqrt((2*ballRadius)*(2*ballRadius)-(x*x))) )
   {
    
   y=1;
   }
  else
  y=0;
}


function removeBrick(i,j){
  
       
       	if(brickArray[i][j]==2)
				{
				  magicRemove(i,j);
				}
				
           else{
           brickArray[i][j]=0;
           canvas.fillStyle='black';
           canvas.fillRect(j*brickWidth,i*brickHeight,brickWidth,brickHeight);
      
           }

}

 function magicRemove(a,b){
     
	  brickArray[a][b]=1;
			  
	  removeBrick(a,b);
				  
	 for(var ii=(a-1);ii<=(a+1);ii++)
	   { 
	    for(var jj=(b-1);jj<=(b+1);jj++)
	      {
		      //ans++;
	       if(!(ii==a && jj==b)  && (ii>=0) && (ii<=14) && (jj>=0) && (jj<brickNo) )
	        {
	         removeBrick(ii,jj);
	        }
	       
	     }
          }
 }

function drawFireGun(){

   if(fireGun==true){
   canvas.fillStyle="black";
   canvas.fillRect(0,height-2*ballRadius-gunHeight,width,gunHeight);
  
  canvas.fillStyle="blue";
  canvas.fillRect(boardX,height-2*ballRadius-gunHeight,5,gunHeight);
  canvas.fillRect(boardX+boardWidth-5,height-2*ballRadius-gunHeight,5,gunHeight);
  
  }
   
   else
   {
     
  canvas.fillStyle="black";
  canvas.fillRect(boardX,height-2*ballRadius-gunHeight,5,gunHeight);
  canvas.fillRect(boardX+boardWidth-5,height-2*ballRadius-gunHeight,5,gunHeight);
   }
  
}

function fire(){
  this.fireX;
  this.fireY=height-2*ballRadius-gunHeight;
  this.previous=height;
  this.shoot=function shoot() {
                var me=this;
               // console.log('lk');
                this.fireY-=(ballRadius);
                canvas.fillStyle="blue";
               	canvas.fillRect(this.fireX,this.fireY,3,gunHeight);  
               	//	canvas.fillRect(this.fireX+boardWidth-5,this.fireY,3,gunHeight);
		canvas.fillStyle="black";	 
	       if(this.previous<(height-2*ballRadius-gunHeight))
		{
		  canvas.fillRect(this.fireX,this.previous,3,gunHeight);
		//	canvas.fillRect(this.fireX+boardWidth-5,this.previous,3,gunHeight);
		}
		this.previous=this.fireY//ballRadius;
		//canvas.fillRect(boardX+boardWidth-5,height-2*ballRadius-gunHeight,5,gunHeight);  
	       this.continueShoot=setTimeout(function(){me.shoot();},40);	
							  
	      if(this.fireY<=(0))
		 {
		   //  console.log(fireY);
	          alreadyFiring=false;
		  canvas.fillStyle="black";
	          canvas.fillRect(this.fireX,this.previous,3,gunHeight);
							
	          this.fireY=height-2*ballRadius-gunHeight
	           this.previous=height;
	          clearTimeout(this.continueShoot);
	       }
							  
		  for(var i=14;i>=0;i--)
		  {
		    for(var j=0;j<brickNo;j++)
		      {
		       if(brickArray[i][j]!=0)
		         {
		         // if((this.fireX<=(i+1)*brickHeight) && (this.fireX>=(i*brickHeight-5)))
		         //console.log(this.fireY+'eal'+(j+1)*brickWidth);
        		      if(this.fireY<=(i+1)*brickHeight && (this.fireX<=(j+1)*brickWidth) && (this.fireX>=(j*brickWidth-5)))
			         {
			          // console.log(this.fireY==(j+1)*brickHeight);
				  removeBrick(i,j);
			          alreadyFiring++;
			          if(alreadyFiring==3)
			          {
			           alreadyFiring=0;
			          }
			          canvas.fillStyle="black";
			          canvas.fillRect(this.fireX,this.previous,3,gunHeight);
				
			          this.fireY=height-2*ballRadius-gunHeight;
			          this.previous=height;
		                  clearTimeout(this.continueShoot);
			         }
	       	        }
		      }
	           }						
           }
  
}


document.onkeydown=function(event)
{
 
     if(event.keyCode==32 && start==false && livesRemaining>0)
     { 
       start=true;
       ballX=boardWidth/2+boardX;
       ballPreviousX=ballX;
       ballY=height-3*ballRadius;
       ballSpeedY=0;
       ballSpeedX=0;
     //  alert(event.keyCode==32);
       startGame(); 
     }
     
     else if (start==true )
     {
        if(event.keyCode==71)
	 {
	    if(fireGun==true)
		{
		 fireGun=false;
		}
				
	    else
	      fireGun=true;
			  
	     drawFireGun();
				
	 }
				 
	if(event.keyCode==65 && alreadyFiring==0 && fireGun==true)
	  {
				  // console.log('dd'); 
	   fireVariable2.fireX=boardX+boardWidth-5;
       	   fireVariable2.shoot();
	   fireVariable1.fireX=boardX;
	   fireVariable1.shoot();
	   alreadyFiring=1;
	  }
				 
 
     }
     
  //   else alert('ju');
             
 
}

window.addEventListener('load',findHeight,false);
window.addEventListener('load',findWidth,false);
document.onmousemove=getMouseCoordinateX;
window.addEventListener('load',doFirst,false);
