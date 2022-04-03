import React from 'react'
import imgposter from '../images/poster.png'

function Popup(props) {

	const link = "https://image.tmdb.org/t/p/original"

	var pathposter = link + props.selected.poster_path
	var backdroppath = link + props.selected.backdrop_path

	if (pathposter==="https://image.tmdb.org/t/p/originalnull"){
	    pathposter=imgposter
	}
    const backpop = document.querySelector(".popup");
	if (backpop) {
	  backpop.style.backgroundImage = "url(" + backdroppath + ")"
	  if (backdroppath==="https://image.tmdb.org/t/p/originalnull"){
		  backpop.style.backgroundImage = "url()"
	  }
	}

	return (
		<section className="popup">
			<div className="content">
				<h2>{ props.selected.title } <span>({ props.selected.release_date })</span></h2>
				<p className="rating"><br></br><b>Avaliação:</b> {props.selected.vote_average}</p>
				<div className="plot">
					<img src={pathposter} alt="" />
					<p><b>Duração:</b> <br></br> <br></br> {props.selected.runtime} 
					<br></br> <br></br> <span id='diretor'></span> <br></br> <br></br> <b>Sinopse:</b> <br></br> <br></br> {props.selected.overview}  </p>
					
				</div>
				<button className="close" onClick={props.closePopup}>Fechar</button>
			</div>
		</section>
	)

}

export default Popup