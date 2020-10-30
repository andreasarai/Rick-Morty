var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

async function connect(method,url){
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                console.log(xhr)
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
async function ejercicio5 () {
    const url = 'https://rickandmortyapi.com/api/character/?species=human';
    const method ='GET';
    var sum = 0;
    var result = [];
    var character = [];
    await connect(method, url)
        .then(respuesta => {
            var res = JSON.parse(respuesta);
            result = res;
        })
        .catch( error => console.log(error));
    sum = result.results.length;
        result.results.forEach(e=>{
            character.push(e);
        })
    for(i=0; i <= result.info.pages ;i++){
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
    // ¡¡¡console.log("suma final:", sum)
    // console.log("tamaño personajes:",character.length);
    characterCap = [];
    character.forEach((e) => {
        e.episode.forEach(a => {
            if (a.includes('/25')) {
                // console.log(e.name);
                characterCap.push(e);
            }
        });
    }); 
    console.log(characterCap);
    console.log("Personajes:", characterCap.length);
}

ejercicio5()