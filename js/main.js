console.log("main.js for weblibs loaded!!")

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  	console.log(request.url)

    $.ajax({
        type: "POST",
        url: "https://a5fcef4f.ngrok.io/get/url",
        data: JSON.stringify({"url":request.url}),
        contentType: "application/json",
        dataType: 'json',
        complete: function(data) {
		    console.log(data.responseJSON)
		    parsedData = parseData(data.responseJSON)
		    console.log(parsedData)
		    replaceWords(data.responseJSON)
		}//
    });

 	sendResponse({
    	status: 'Ok'
  	});
});

// document.body.innerHTML = document.body.innerHTML.replace(/hello/g, 'hi');

var parseData = function(data) {
	parsed = {}
	for (var key in data) {
		posLabel = POS[data[key]]
		parsed[key] = '<span class="web-libs ' + posLabel.replace(/\s+/g, '-') + '-label"><input value="'+ posLabel +'"></input>' // => part of speech
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

// '<span class="web-libs zucc"><input value="test"></input>';

var replaceWords = function(custom_obj) {
	var $contents = $('body *').addBack().contents();
	$.each(custom_obj, function (key, value) {
	    var regex = new RegExp(key, 'g');
	    $contents.each(function () {
	        if (this.nodeType == 3) {
	            $(this).replaceWith("test").append("<img style='z-index:999999' src='https://2.bp.blogspot.com/-PjMjGxn40YM/T_9RQ0iz9FI/AAAAAAAAAVY/zeZhWWS6a0k/s1600/Rutgers+Logo.png'/><h1 style='z-index:999999;color:red'>RU RU RU RUTGERS</h1>")
	        }
	    })
	});
	// $('body').toggle()
}

