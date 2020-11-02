var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

async function connect(method,url){
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.responseText);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}



async function ejercicio7() {
    const url = 'https://rickandmortyapi.com/api/episode/20';
    const method ='GET';
    var data = [];
    var character = [];
    await connect(method, url)
        .then(respuesta => {
            var res = JSON.parse(respuesta);
            data = res;
        })
        .catch( error => console.log(error));
        //console.log(data)
    for(i=0; i<data.characters.length; i++){
        await connect(method, data.characters[i])
        .then(respuesta => {
            var res = JSON.parse(respuesta);
            character.push(res);
        })
        .catch( error => console.log(error));
    }
    //console.log(character)
    for(i=0; i<character.length; i++){
        console.log(character[i].origin)
    }
}

ejercicio7()