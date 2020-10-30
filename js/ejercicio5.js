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

/*
 Obtener listado de humanos que aparecen en el episodio 25
 */
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

/**
 * Con esta función creo una URL y un método y recorro la base de datos, la filtro y guardo los resultados en un arreglo
 */
async function ejercicio5 () {
    const url = 'https://rickandmortyapi.com/api/character/?species=human';
    const method ='GET';
    var sum = 0;
    var data = [];
    var character = [];
    await connect(method, url)
        .then(respuesta => {
            var res = JSON.parse(respuesta);
            data = res;
        })
        .catch( error => console.log(error));
    sum = data.results.length;
        data.results.forEach(element=>{
            character.push(element);
        })
    for(i=0; i <= data.info.pages ;i++){
        if(i > 1){
            var url_ = `https://rickandmortyapi.com/api/character/?page=${i}&species=human`;
            await connect(method, url_).then(
                respuesta => {
                    var res = JSON.parse(respuesta);
                    res.results.forEach(e => {
                        character.push(e);
                    })
                    sum = sum + res.results.length;
                }
            )
        }
    }
    characterCap = [];
    character.forEach((e) => {
        e.episode.forEach(episodio => {
            if (episodio.includes('/25')) {
                characterCap.push(e);
            }
        });
    }); 
    console.log(characterCap);
}

ejercicio5()