
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



  async function ejercicio5() {
      var resultados = [];
    await connect("get", "https://rickandmortyapi.com/api/character/?species=human").then(
        respuesta => {
            var res = JSON.parse(respuesta)
           // console.log(res.results)
            resultados.push(res.results)
        } 
    )
    .catch(error => console.log(error))
    //console.log(resultados)
    for (var i = 0; i < resultados[0].length; i++) {
        for(var j=0; j < resultados[0][i].episode.length; j++) {
            if (resultados[0][i].episode[j].includes("/25")){
                console.log(resultados[0][i])
            }
        }

     }
  }

  ejercicio5()