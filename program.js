let parseTree = function(fileText) {
	var result = "No results found.";//"put your result here";	
	var lines = fileText.split("\n");
	var fruites =0;	
	var branches = [];	
	for (var i =0; i<lines.length; i++) {
			if(lines[i] != ""){	
					var brach = lines[i].split(",")
						branches.push(brach);
			}			
	}	
	
var currentNode = 0;
var parent = -1;			

try
{
	
	if(branches.length<1) result = "No braches found."
	
	while (branches.length > 0) {	

		var found = false;
			for (var i =0; i<branches.length; i++) {
				
				for (var j =0; j<branches[i].length; j++) {
					
					// Check Branch node Parent and Parent Id to find children.
					if( j >= 1 &&  (branches[i][1]*1)== parent)
						{					
					
							currentNode = branches[i][0]*1;	
							if(isNaN(currentNode))
							{
								throw   "Invalid Identifier  " + branches[i][j];														
							}						
							
							var brachValue= branches[i][j]*1;
							if(isNaN(brachValue))
							{
								throw   "Not a number " + branches[i][j] ;														
							}
							
							if(j > 1  && brachValue==0){
								
								found = true;
								parent = branches[i][0];
							}
							else if(j > 1 && brachValue>0){
								found = true;		
								fruites = fruites + brachValue;
								}
							

							//	If there are no child branches and fruits delete from array.						
							if(branches[i][1]*1== parent && branches[i].length == j+1)
							{								
								found = true;					
								branches.splice(i, 1);							
								for (var k =0; k<branches.length; k++) {
									if(branches[k][0]*1 == parent){								
										branches[k].splice(2,1);
										break;}
								}							
								for (var k =0; k<branches.length; k++) {
									if(branches[k][0]*1 == parent){ parent = branches[k][1];break;}
								}							
							}
					
						
					if(found) break;			
				}
				
			}			
			if(found) break;
			}		
			result = " Total Fruits " + fruites;			
		}
		
}
catch(error){
	
	result =  error.message ? error.message : error ;
}
	return result;
}


let readFile = function (evt) {
	let file = evt.target.files[0]; 

	if (file) {
	  let reader = new FileReader();
	  reader.onload = function(e) { 
		document.getElementById('result').innerHTML = parseTree(e.target.result);
	  }
	  reader.readAsText(file);
	} else { 
	  document.getElementById('result').innerHTML = "Failed to load file";
	}
}

window.addEventListener("load", function () {
	document.getElementById('fileInput').addEventListener('change', readFile, false);
}, false);