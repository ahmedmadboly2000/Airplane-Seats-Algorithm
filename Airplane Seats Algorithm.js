function AirplaneSeatsAlgorithm(){

	const answer=document.getElementById('message').value
	const passNum=document.getElementById('size').value
		
	var array=JSON.parse(answer);
	var rowSize=Math.max.apply(Math, array.map(e=>e[1]));
	var colSize=Math.max.apply(Math, array.map(e=>e[0]));
	
	//Identify seats
	var seats=fillWithMAandW(array);
	
	//Replace chars with numbers
	var obj={};
	obj=replaceWithNumber("A",1,seats,colSize,rowSize);
	obj=replaceWithNumber("W",obj.counter,obj.seats,colSize,rowSize);
	obj=replaceWithNumber("M",obj.counter,obj.seats,colSize,rowSize);
	seats=obj.seats;
	
	//print the seats
	printValues(seats,colSize,rowSize)
	
	
};

function printValues(seats,colSize,rowSize){
	
  var stringJ=""
  
  for(var i=0;i<colSize;i++){
		for(var j=0;j<rowSize;j++){
			if(seats[j]==null||seats[j][i]==null){
			  
				stringJ+="- "
				continue;
			}
			for(k=0;k<seats[j][i].length;k++){
				stringJ+=(seats[j][i][k]+" ");
			}
			stringJ+=",";
		}
		stringJ+="\n"
	}
	
  console.log(stringJ)
}	

function fillWithMAandW(array){
	
  var seats=[];
  for(var i=0;i<array.length;i++)
		seats.push(Array(array[i][1]).fill().map(()=>Array(array[i][0]).fill("M")));
  
  for(var i=0;i<seats.length;i++){
	  for(var j=0;j<seats[i].length;j++){  
			seats[i][j][0]="A";
		  seats[i][j][seats[i][j].length-1]="A";
	  }
	}

	for(var i=0;i<seats[0].length;i++)
		seats[0][i][0]="W";
	for(var i=0;i<seats[seats.length-1].length;i++)
	  seats[seats.length-1][i][(seats[seats.length-1][i].length)-1]="W";
	
	  
  return seats;
}

function replaceWithNumber(val,counter,seats,colSize,rowSize){
	const passNum=document.getElementById('size').value
	for(var i=0;i<colSize;i++){
		for(var j=0;j<rowSize;j++){
			if(seats[j]==null||seats[j][i]==null)
			continue;
			for(k=0;k<seats[j][i].length;k++){
				if(seats[j]!=null&& seats[j][i]!=null && seats[j][i][k]===val){
					if(counter<=passNum){
					seats[j][i][k]=counter;
					counter++;
				}else{
					seats[j][i][k]='';
				}
			}
			}
		}
		
	}
	// console.log(counter); 
  return {seats:seats,counter:counter};
}




// time complexity=O(N^3)
// space complexity=O(N^3)