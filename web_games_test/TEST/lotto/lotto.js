//원본배열 생성(1~45까지)
var array =Array(45)
	.fill()
	.map(function(a,i)
		{
		return i+1;
		});

console.log(array);

//랜덤배열 생성
var suffle = [];

//원본배열에서 무작위 숫자를 뽑아 랜덤배열에 집어넣기
for(var i=0; i<7;i++){
	suffle.push( Number(array.splice(Math.floor(Math.random()*(45-i))+1, 1)) );
}

suffle.sort(function(p,c){return p-c;});//오름차순 정렬

console.log(array);
console.log(suffle);

/*
var sign = document.createElement('div');
sign.textContent = '게임시작';
formTag.append(sign);
*/
var result = document.getElementById('result_part');





for (var i=0; i<6;i++){

	
	var ball = document.createElement('div');
	ball.textContent = suffle[i];
	var color =null;
	
	if(suffle[i]<=10){
		color = 'red';
	}else if(suffle[i]<=20){
		color='orange';
	}else if(suffle[i]<=30){
		color='yellow';
	}else if(suffle[i]<=40){
		color='blue';	
	}else{
		color='green';
	}
	ball.style.background = color;
	ball.style.display ='inline-block';
	ball.style.border = '1px solid black'
	ball.style.borderRadius = '15px';
	ball.style.width = '30px';
	ball.style.height = '30px';
	ball.style.textAlign = 'center';
	ball.style.marginRight = '10px';
	
	result.appendChild(ball);
	
}



var bonus=document.getElementsByClassName('bonus_part')[0];
var ball = document.createElement('div');
ball.textContent = suffle[6];
bonus.appendChild(ball);



/*BUG REPORT
간혹, 두배열의 공 숫자의 합이 46리 되고, 0이 생기는 경우가 발생한다*/