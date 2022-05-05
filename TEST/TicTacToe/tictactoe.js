var tableSize =3;


var body = document.body;
var table = document.createElement('table');
//행 row 열 column / cell

var matrix =[];

var Fclick = function(e){
	console.log("click work");
	console.log(e.target);//그줄 
	//console.log(matrix.indexOf(e.target));
	console.log(findIndex(e.target));
}


var findIndex = function(target){
	
	var row = null;
	var col = null;
	
	for(var i =0 ; i<tableSize; i++){
		
		col = matrix[i].indexOf(target);
		if( col !== -1 ){
			row = i; 
			break;	
		}
	}
	return [row,col];
}



for(var i =0;i< tableSize; i++){
	var rowTag = document.createElement('tr');
		console.log("for work");
		matrix.push([]);
	for(var j=0;j<tableSize; j++){
		var cell=document.createElement('td');
		cell.addEventListener('click',Fclick);
		matrix[i].push(cell);
		cell.textContent = String(i)+String(j);
		rowTag.appendChild(cell);
		
		
	}
	
	table.appendChild(rowTag);
		
}
body.appendChild(table);