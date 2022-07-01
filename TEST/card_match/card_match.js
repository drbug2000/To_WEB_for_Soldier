var card =12;//카드개수 

var body = document.body;
var gameboard = document.createElement('div');

var click_flag = true;

var color=['red','red','green','green','pink','pink','orange','orange','white','white','purple','purple'];

var pair=[];

var success=[];

function suffle(array){
	var temp = null;
	
	for(var i=0;i<array.length;i++){
		var j= Math.floor(Math.random()*card);
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;	
	}
}

//setting card & board
gameboard.className='gameboard';
body.appendChild(gameboard);

suffle(color);

for(var i=0;i<card;i++){
	
	var flip_card = document.createElement('div');
	flip_card.className='flip-card';
	var flip_card_inner = document.createElement('div');
	flip_card_inner.className='flip-card-inner';
	var flip_card_front = document.createElement('div');
	flip_card_front.className='flip-card-front';
	var flip_card_back = document.createElement('div');
	flip_card_back.className='flip-card-back';
	flip_card_back.style.backgroundColor=color[i];
	
	(function (c){
	flip_card.addEventListener('click',function(){
		if(click_flag && !c.classList.contains('flipped')){
			c.classList.add('flipped');
			//console.log(c.childNodes[0].childNodes[1]);
			pair.push(c.childNodes[0].childNodes[1]);
			
			if(pair.length===2){
				click_flag=false;
				if(pair[0].style.backgroundColor===pair[1].style.backgroundColor){
					success = success.concat(pair);
					pair=[];
					click_flag=true;
					if(success.length===card){
						finish();	
					}
				}else{
					
					setTimeout(function() {
						//console.log(pair[0]);
						pair[0].parentNode.parentNode.classList.remove('flipped');
						pair[1].parentNode.parentNode.classList.remove('flipped');
						pair=[];
						click_flag=true;
					},1000);	
				}
			}else{
				
			}
			
			
			return true;
		}else{
			return false;
		}
	});
		
	})(flip_card);
	
	gameboard.appendChild(flip_card);
	flip_card.appendChild(flip_card_inner);
	flip_card_inner.appendChild(flip_card_front);
	flip_card_inner.appendChild(flip_card_back);
	
}

function finish(){
	flipAll();
	//alert('게임 승리')
	
	
	
}

function flipAll(){
	for(var i=0;i<card;i++){
		
	(function(c){
	setTimeout(function(){
	
		gameboard.childNodes[c].classList.toggle('flipped');
		
	},900+i*200);})(i);
		
	}
}