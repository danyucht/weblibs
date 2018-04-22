

console.log("main.js for weblibs loaded!!")

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  	console.log(request.url)

    $.ajax({
        type: "POST",
        url: "https://f941a014.ngrok.io/get/url",
        data: JSON.stringify({"url":request.url}),
        contentType: "application/json",
        dataType: 'json',
        complete: function(data) {
		    console.log(data.responseJSON)
		    parsedData = parseData(data.responseJSON)
		    console.log(parsedData)
		    replaceWords(parsedData)
		}//
    });

 	sendResponse({
    	status: 'Ok'
  	});
});

var inlineClick = function(keyClass) {
	var bla = $(keyClass).val;
	$(keyClass).html = "<span>" + bla + "</span>"
}

var parseData = function(data) {
	parsed = {}
	for (var key in data) {
		posLabel = POS[data[key]]
		parsed[key] = '<span class="web-libs key-' + key.toLowerCase() + ' ' + posLabel.replace(/\s+/g, '-') + '-label"><input value="'+ posLabel +'" /><button class="ok-button key-'+key.toLowerCase()+'">ok</button></span>' // => part of speech
	}
	console.log(parsed)
	return parsed
}

const POS = {
	"CD": "number", 
	"JJ": "adjective",
	"JJR": "comparative adjective",
	"JJS": "superlative adjective",
	"NN": "singular noun",
	"NNS": "plural noun",
	"NNP": "proper noun",
	"NNPS": "proper singular noun",
	"RB": "adverb",
	"VB": "verb",
	"VBZ": "present tense verb",
	"VBD": "past tense verb"
}

var replaceWords = function(custom_obj) {

	var temp_data = []
	
	var $contents = $('body *').addBack().contents();
	$.each(custom_obj, function (key, value) {
	    var regex = new RegExp(key, 'g');
	    
	    $contents.each(function () {
	    	

	        if (this.nodeType == 3 && this.nodeValue.match(regex)) {

	        	// ===, .typeof to make sure
	            temp_data.push(this.nodeValue.replace(regex, value))
	            $(this).replaceWith(this.nodeValue.replace(regex, value))
	            // temp_data[value] = regex

	        }
	        
	    })
	    //$(this).replaceWith(temp_data)
	});

	        

	console.log(temp_data)
	replaceExtend(temp_data)
	// $('body').toggle()
}



var replaceExtend = function(data) {
	// temp storage data structure before i call replace with so i when i call replace with its all done at once
	$(data).each(function () {
		//$(this).replaceWith(data)
	});
	
}

$(function() {
    console.log( "ready!" );
    $("button.ok-button").click(function() { 
		console.log($(this).attr("class").split(' '))
		//inlineClick()
	});
});


