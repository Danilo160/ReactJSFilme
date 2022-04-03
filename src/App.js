/*React Filmes
*Autor: Danilo Correia Viana
*Descrição: Aplicação Web com React JS que faz requisições de filmes em uma API externa (Responsiva)
*A pesquisa de filmes é dinâmica, ou seja, enquanto digita os filmes são buscados
*/

import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Busca from './components/Busca'
import Resultados from './components/Resultados'
import Popup from './components/Popup'
import notsearch from './images/notsearch.png'


function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

  var div1 = document.getElementById("divnone")
  var sec = document.querySelector("section")

 //Verifica se o estado dos resultados é maior do que 0 e altera os displays da div1 (oculta) e sec (seta o display flex)
  
  if (state.results.length > 0){
      div1.style.display="none";
      sec.style.display="flex"
  }

  //Variáreis constantes para acessar a API
  
  const apiurl = "https://api.themoviedb.org/3";
  const searchmovie ="/search/movie"
  const popular = "/popular"
  const apikey = "/?api_key=b28d98f1bc60c7578a565e28c73e17ee";

  //Função que acessa a API sem indicar um parâmetro de linguagem e retorna as informações definidas na linguagem disponível
  
  function Language(id){
    axios.get(apiurl + "/movie/" + id + apikey.replace("/","")).then(({ data }) => {
      let result = data;

      if (result.overview==="" || result.overview===null){
        result.overview = " - "
      }
      if(result.runtime === 0 || result.runtime === null){
        result.runtime=" - ";
      }
      if(result.runtime > 0){
        result.runtime= result.runtime + " min ";
      }
      if(result.vote_average===0 || result.vote_average===null){
        result.vote_average= " - ";
      }
      setState(prevState => {
        return { ...prevState, selected: result }
      });
      document.body.style.overflow = "hidden"

      axios.get(apiurl + "/movie/" + id + "/credits" + apikey.replace("/","")).then(({ data }) => {

        let res = data.crew;
        let directors = [];

        res.forEach(function(entry){
            if (entry.job === 'Director') {
                directors.push(entry.name);
            }

        })

        if(directors.length>=1){
          document.getElementById("diretor").innerHTML = '<b>Direção: </b><br></b><br></b>' + directors.join(', ');     

        }
        else{
          document.getElementById("diretor").innerHTML = '<b>Direção: </b><br></b><br></b> - ';   
        }
         
     });
    })

    .catch(err => { 
        alert("Sem conexão! API falhou ou não há conexão com a internet!") 
    })
  }

  useEffect(()=>{
  
  var img1 = document.getElementById("imgdiv")
  var div1 = document.getElementById("divnone")
  var sec = document.querySelector("section")
  var popmov = document.getElementById("popular")
  var notf = document.getElementById("notfound")
  
      if(state.s.trim()===""){
        axios.get(apiurl + "/movie" + popular + apikey).then(({ data }) => {
          let results = data.results;

          setState(prevState => {
            return { ...prevState, results: results }

          })

          popmov.innerHTML= "Mais Populares"
          popmov.style.display = "flex"
        })
        .catch(err => { 
          alert("Sem conexão! API falhou ou não há conexão com a internet!")

        })
      }
    
      if (state.s.trim()!=="") {
        axios.get(apiurl + searchmovie + apikey+"&query=" + state.s.trim()).then(({ data }) => {
          let results = data.results;
          
          setState(prevState => {
            return { ...prevState, results: results }

          })

          if(results.length === 0){
            img1.src = notsearch
            div1.style.display = 'block'
            notf.innerHTML ="Nenhum filme encontrado"
            sec.style.display="none"
            popmov.style.display="none"
          }
          state.s = "";
          if (results.length>0) {
            popmov.style.display="flex"
            popmov.innerHTML= "RESULTADOS"
          }

        })

      }

  },[state])


 
  const handleInput = (e)=>{

    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });

  }


  const handleKeyPress = (e) => {
      if(e.key === 'Enter'){
        document.querySelector("input").blur()

        //Verifica se tem somente espaços em branco e quando pressionado enter volta pra vazio.
        
        if(state.s.length === 0 || !state.s.trim()){
          document.querySelector("input").value = ""
        }
      }

      //Detecta o spacebar e não preenche com espaços em branco (não funciona em dispositivos mobile, testei e só funcionou no notebook)
      
      if (e.which === 32 && state.s.trim()===""){
        document.querySelector("input").value = ""
        e.preventDefault()
      }

  }

  const openPopup = id => {
    axios.get(apiurl + "/movie/" + id + apikey.replace("/","") + "&language=pt-BR").then(({ data }) => {
      let result = data;

      if (result.overview==="" || result.overview===null){
        return Language(id);
      }
      if(result.runtime === 0 || result.runtime === null){
        result.runtime=" - ";
      }
      if(result.runtime > 0){
        result.runtime= result.runtime + " min ";
      }
      if(result.vote_average===0 || result.vote_average===null){
        result.vote_average= " - ";
      }

      setState(prevState => {
        return { ...prevState, selected: result }
      });
      
      document.body.style.overflow = "hidden"

      axios.get(apiurl + "/movie/" + id + "/credits" + apikey.replace("/","")).then(({ data }) => {

        let res = data.crew;
        let directors = [];

        res.forEach(function(entry){
            if (entry.job === 'Director') {
                directors.push(entry.name);
            }

        })


        if(directors.length>=1){
          document.getElementById("diretor").innerHTML = '<b>Direção: </b><br></b><br></b>' + directors.join(', ');     

        }
        else{
          document.getElementById("diretor").innerHTML = '<b>Direção: </b><br></b><br></b> - ';   
        }
         
     });

    })

    .catch(err => { 
        alert("Sem conexão! API falhou ou não há conexão com a internet!") 
    })

  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
    document.body.style.overflow = "scroll"
  }
 
  return (
    <div className="App">
      <header>
        <h1>React Filmes</h1>
      </header>
      <main>
        <Busca handleInput={handleInput} handleKeyPress={handleKeyPress} />
        <p id="popular"></p>
        <div id="divnone"><img id="imgdiv" alt=""/><center id="notfound"></center></div>
        <Resultados results={state.results} openPopup={openPopup} />
        {(typeof state.selected.title != "undefined" || state.selected.title != null) ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
        
      </main>
    </div>

  );
}

export default App;
