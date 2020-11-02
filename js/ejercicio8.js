/*
Del listado de lugares obtenidos del episodio 30, muestra los siguientes datos: 
Personajes originales de este lugar, su imagen y el listado de episodios donde aparecen.
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



async function ejercicio8() {
    const url = 'https://rickandmortyapi.com/api/episode/30';
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

    /*
    Creo un arreglo llamado final donde almaceno los datos solicitados para cada personaje
    */
    var final = [];
    character.forEach((e) => {
        final.push({
            nombre : e.name,
            imagen : e.image,
            origen : e.origin,
            episodio : e.episode
        });
    });
    console.log(final);
}

ejercicio8()