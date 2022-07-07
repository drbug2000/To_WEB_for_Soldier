function flipAll(){
	for(var i=0;i<card;i++){
	
		(function(c){
		setTimeout(function(){
			gameboard.childNodes[c].classList.toggle('flipped');
		},700+i*130);})(i);
		
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

//세로, 가로
function flipDiagonal(row,col,start_time){
	
	var log=[];
	var i=0;
	
	function flip_(c,t){
		setTimeout(function(){
		gameboard.childNodes[c].classList.toggle('flipped');
		},start_time+t*175);
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

function flipDiagonal_(row,col,start_time){
	
	var i=0;
	var time=0;
	function flip_(c,t,st){
		setTimeout(function(){
		gameboard.childNodes[c].classList.toggle('flipped');
		
	},st+t*175);
	}

	while(i<card){
		var k=i;
		do{
			flip_(k,time,start_time);
			
			if(k%col===0){
				break;
			}
			k = k+col-1;
			
		}while(k<card)
			//console.log(k);
	//console.log(i);
	if(i<col-1){
		i++;
		time++;
	}else{
		i=i+col;
		time++;
	}
	}
}


function close_all(card,start_time){

	function flip_(c,t){
		setTimeout(function(){
		gameboard.childNodes[c].classList.remove('flipped');
		
	},t);
	}
	
	for(var i=0;i<card;i++){
		flip_(i,start_time);	
	}

}


function flip_over(index,time,start_time){
	
	function flip_(index,time,start_time){
		setTimeout(function(){
		gameboard.childNodes[index].classList.toggle('flipped');
		
	},start_time+time*1000);
	}
	
	for(var i=0;i<time;i++){
		flip_(index,i,start_time);	
	}
	
}



function end_flip(timer){
	
	function restart_button(t){
		start();
		for(var i=0;i<card;i++){
		gameboard.childNodes[i].childNodes[0].childNodes[0].textContent='';
		}
		
		t.target.removeEventListener('click',restart_button);
		
		flipDiagonal_(3,4,100);
		//click_flag=true;
		gameboard.childNodes[6].classList.add('flipped');
		flipDiagonal_(3,4,175*6+600);
		//close_all(card,175*6+500+1100);
		click_flag=true;
		
		pair=[];
	}
	
	flipAll();
	var target_card;
	var index=1;
	target_card = gameboard.childNodes[index].childNodes[0].childNodes[0];
	target_card.textContent ='성공 시간은';
	var index=2;
	target_card = gameboard.childNodes[index].childNodes[0].childNodes[0];
	target_card.textContent = timer/1000+'초';
	
	var index=5;
	target_card = gameboard.childNodes[index].childNodes[0].childNodes[0];
	target_card.textContent = '다시 하고 싶으면 클릭 ->';
	
	var index=6;
	target_card = gameboard.childNodes[index].childNodes[0].childNodes[0];
	target_card.textContent = '클릭';
	target_card.addEventListener('click',restart_button);
	

}
