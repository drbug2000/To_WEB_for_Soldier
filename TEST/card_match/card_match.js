var card =12;//카드개수 

var body = document.body;
var gameboard = document.createElement('div');

var click_flag = true;

var color=['red','red','green','green','pink','pink','orange','orange','white','white','purple','purple'];

var pair=[];

var success=[];

var star_time =0; 
var end_time =0;

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

//setting
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
	
	addCardListener(flip_card);
	
	gameboard.appendChild(flip_card);
	flip_card.appendChild(flip_card_inner);
	flip_card_inner.appendChild(flip_card_front);
	flip_card_inner.appendChild(flip_card_back);
	
}
function start(){
	
	suffle(color);
	star_time=new Date;
	//뒷면 색깔세팅 다시
	for(var i=0;i<card;i++){
		gameboard.childNodes[i].childNodes[0].childNodes[1].style.backgroundColor=color[i];;
	}
}
start();
//1.flip-card에 태그 달기 => 뒤집어진 카드도 클릭 가능 / 클릭과 flip class의 조절이 꼬일수 있음
//2.flip_card_front에 태그달기 => flag나 class를 안따져도 무조건 앞면만 뒤집기 가능(방금 실험도 해봄)

//c == class flip-card 제일 바깥 태그
function addCardListener(c){
	
	//얘를 밖으로 빼면 c.을 전부 수정하고 매개변수로 바꿔야해서 그냥 넣어두고 flag로 조절하겠음
	//굳이 removeEventListener를 안쓰고 해보겠음
	c.addEventListener('click',function(){
		if(click_flag && !success.includes(c)){
			c.classList.toggle('flipped');
			//console.log(c.childNodes[0].childNodes[1]);
			if(c.classList.contains('flipped')){
			//pair.push(c.childNodes[0].childNodes[1]);
			pair.push(c);
			}else{
			pair=[];
				return 0;
			}
			
			if(pair.length===2){
				click_flag=false;
				
				var pair_color=[];
				for(const card of pair){
					pair_color.push(card.childNodes[0].childNodes[1].style.backgroundColor);	
				}
				
				if(pair_color[0]===pair_color[1]){
					success = success.concat(pair);
					pair=[];
					click_flag=true;
					if(success.length===card){
						finish();
					}
				}else{	
					setTimeout(function() {
						//console.log(pair[0]);
						pair[0].classList.remove('flipped');
						pair[1].classList.remove('flipped');
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
	
}


function finish(){
	
	end_time=new Date;
	//alert('게임 승리')
	click_flag=false;
	end_flip(end_time-star_time);
	success=[];
}

