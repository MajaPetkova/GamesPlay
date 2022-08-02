import { useState, useEffect } from 'react';
import * as gameService from './services/GameService';

import { Routes, Route, useNavigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';
import { GameContext } from './contexts/gameContext';


import Catalog from './components/catalog/Catalog';
import Create from './components/create/Create';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Logout from './components/logout/Logout'
import Details from './components/details/Details';

import EditGame from './components/edit/EditGame';

function App() {
    const [games, setGames] = useState([]);
   
    const navigate = useNavigate();

    const addComment = (gameId, comment) => {
        setGames(state => {
            const game = state.find(x => x._id === gameId)
            const comments = game.comments || [];
            comments.push(comment)

            return [
                ...state.filter(x => x._id !== gameId),
                { ...game, comments }
            ]
        })
    }

    const gameAdd = (gameData) => {
        setGames(state => [
            ...state,
            gameData
        ]);
        navigate('/catalog')
    }

    const gameEdit= (gameId, gameData)=>{
        setGames(state=>state.map(x=>x._id===gameId ? gameData : x))
    }

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                // console.log(result)
                setGames(result)
            })
    }, [])
    return (
<AuthProvider>

            <div id="box">
                <Header />
                <GameContext.Provider value={{games, gameAdd, gameEdit}}>
                    <main id="main-content">
                        <Routes>
                            <Route path='/' element={<Home games={games} />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/create' element={<Create  />} />
                            <Route path='/catalog' element={<Catalog games={games} />} />
                            <Route path='/catalog/:gameId/edit' element={<EditGame />} />
                            <Route path='/catalog/:gameId' element={<Details games={games} addComment={addComment} />} />
                            <Route path='/logout' element={<Logout />} />
                        </Routes>

                    </main>
                    </GameContext.Provider>
            </div>
</AuthProvider>
          );
}

export default App;
