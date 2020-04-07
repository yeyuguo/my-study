function http(option){
    var success = option.success
    var url = option.url
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function(){
        if(xhr.status === 200 || xhr.status === 304 || xhr.readyState === 4){
            success && success.call(this, xhr.responseText)
        }
    }
    xhr.send(null)
}



http({ 
    url: 'https://api.apiopen.top/singlePoetry', 
    success: function(data){
        console.log('data: ', data, typeof data);
    }
})