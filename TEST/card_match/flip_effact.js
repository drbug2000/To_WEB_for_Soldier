function flipAll(){
	for(var i=0;i<card;i++){
		
	(function(c){
	setTimeout(function(){
	
		gameboard.childNodes[c].classList.toggle('flipped');
		
	},900+i*200);})(i);
		
	}
}

function flipTogeter(){
	
	
	for(var i=0;i<card;i++){
		
	(function(c){
	setTimeout(function(){
	
		gameboard.childNodes[c].classList.toggle('flipped');
		
	},500);})(i);
		
	}

}

function flipDiagonal(row,col){
	
	var log=[];
	var i=0;
	
	function flip_(c,t){
		setTimeout(function(){
		gameboard.childNodes[c].classList.toggle('flipped');
		
	},1000+t*175);
	}

	while(log.length<card){
		var k=i;
		while(k<card){
			if(!(log.includes(k))){
			flip_(k,i);
			log.push(k);
			
			if(k%col===0){
			//console.log('break!');
			break;
			}
		}
			//console.log(k);
			k = k+col-1;
		}
	//console.log(i);
	i++;
	}	
}

function flipDiagonal_(row,col){
	
	var i=0;
	var time=0;
	function flip_(c,t){
		setTimeout(function(){
		gameboard.childNodes[c].classList.toggle('flipped');
		
	},1000+t*175);
	}

	while(i<card){
		var k=i;
		do{
			flip_(k,time);
			
			if(k%col===0){
				break;
			}
			k = k+col-1;
			
		}while(k<card)
			//console.log(k);
	console.log(i);
	if(i<col-1){
		i++;
		time++;
	}else{
		i=i+col;
		time++;
	}
		
	}
}