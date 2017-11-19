
var request = new XMLHttpRequest();
request.open('GET', 'https://bitnodes.earn.com/api/v1/snapshots/latest/', true);

request.onload = function() {
	if (request.status >= 200 && request.status < 400) {
		// Success!
		var data = JSON.parse(request.responseText);
		organizeNodes(data);
	} else {
		console.log('Error: server target reached');
	}
};

request.onerror = function() {
  console.log('Error: connection error');
};

request.send();


function organizeNodes(data){
	// console.log(data.nodes)
	let regexBitcoinAddress = new RegExp("[13][a-km-zA-HJ-NP-Z1-9]{25,34}");

	for (var node in data.nodes) {
		if (regexBitcoinAddress.test(data.nodes[node][1])) {
		    var nodeLi = document.createElement("LI");
        	var nodeDetail = data.nodes[node][1];
        	var textnode = document.createTextNode(nodeDetail.match(regexBitcoinAddress));
        	nodeLi.appendChild(textnode);
			document.getElementById("nodeList").appendChild(nodeLi);
		}

	}
}