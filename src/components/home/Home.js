import { useState, useEffect } from 'react';
import * as gameService from '../../services/gameSevice';
import LatestGame from './latestGame/LatestGame';


const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    gameService.getAll()
      .then(result => {
        // console.log(result)
        setGames(result)
      })
  }, [])

  return (
    <section id="welcome-world">
      <div className="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
      </div>
      <img src="./images/four_slider_img01.png" alt="hero" />
      <div id="home-page">
        <h1>Latest Games</h1>
       
        {games.map(x=> <LatestGame game={x}/>)}
        <p className="no-articles">No games yet</p>
      </div>
    </section>)

}
export default Home;