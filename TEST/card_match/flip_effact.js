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


function end_flip(timer){
	
	function restart_button(t){
		start();
		for(var i=0;i<card;i++){
		gameboard.childNodes[i].childNodes[0].childNodes[0].textContent='';
		}
		flipDiagonal_(3,4);
		t.target.removeEventListener('click',restart_button);
		click_flag=true;
		flipDiagonal_(3,4);
	}
	
	
	flipAll();
	var target_card;
	var index=1;
	target_card = gameboard.childNodes[index].childNodes[0].childNodes[0];
	target_card.textContent ='성공 시간은';
	var index=2;
	target_card = gameboard.childNodes[index].childNodes[0].childNodes[0];
	target_card.textContent = timer+'m/s';
	
	var index=5;
	target_card = gameboard.childNodes[index].childNodes[0].childNodes[0];
	target_card.textContent = '다시 하고 싶으면 클릭 ->';
	
	var index=6;
	target_card = gameboard.childNodes[index].childNodes[0].childNodes[0];
	target_card.textContent = '클릭';
	target_card.addEventListener('click',restart_button);
	
	
	
	
}
