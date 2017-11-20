window.onload=function(){
	nodeSelectedListener();
}

var nodesWithAddress = [];
var regexBitcoinAddress = new RegExp("[13][a-km-zA-HJ-NP-Z1-9]{25,34}");

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
	// If selected node have a bitcoin address pattern in uacomment we save it
	for (var node in data.nodes) {
		if (regexBitcoinAddress.test(data.nodes[node][1])) {
			
			nodesWithAddress.push(data.nodes[node]);
		}
	}

	// We print all nodes with a bitcoin address attached to it
	for (n=0; n<nodesWithAddress.length; n++){
		var nodeLi = document.createElement("LI");
		nodeLi.id = n;

		var nodeDetail = nodesWithAddress[n][1];
		var textnode = document.createTextNode(nodeDetail.match(regexBitcoinAddress));
		nodeLi.appendChild(textnode);
		document.getElementById('nodeList').appendChild(nodeLi);
	}
	
}



function nodeSelectedListener(){
	// Function to detect selected node
	var nodeList = document.getElementById('nodeList');

	function whatClicked(evt) {
        showQR(evt.target.id);
	}
	nodeList.addEventListener("click", whatClicked, false);
	
}



function showQR(selectedNodeNumber){
	var qrElement = document.getElementById("qrcode");

	if(qrElement.lastChild){
		qrElement.replaceChild(showQRCode(nodesWithAddress[selectedNodeNumber][1].match(regexBitcoinAddress)[0]), qrElement.lastChild);
	} else {
		qrElement.appendChild(showQRCode(nodesWithAddress[selectedNodeNumber][1].match(regexBitcoinAddress)[0]));
	}

}


