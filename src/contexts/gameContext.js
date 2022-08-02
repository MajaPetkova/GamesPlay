import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import * as gameService from '../services/GameService'
export const GameContext = createContext();


export const GameProvider = ({
    children
}) => {
    const gameReducer = (state, value) => {
        console.log('old state:' , state)
        console.log('new State:', value)
        return value;
    }
    const [games, dispatcher] = useReducer(gameReducer,[]);
    const navigate = useNavigate();
    const addComment = (gameId, comment) => {
        // setGames(state => {
        //     const game = state.find(x => x._id === gameId)
        //     const comments = game.comments || [];
        //     comments.push(comment)

        //     return [
        //         ...state.filter(x => x._id !== gameId),
        //         { ...game, comments }
        //     ]
        // })
    }

    const gameAdd = (gameData) => {
        // setGames(state => [
        //     ...state,
        //     gameData
        // ]);
        navigate('/catalog')
    }

    const gameEdit = (gameId, gameData) => {
        // setGames(state => state.map(x => x._id === gameId ? gameData : x))
    }

    useEffect(() => {
        gameService.getAll()
            .then(result => {
                // console.log(result)
                dispatcher(result)
            })
    }, [])
    return (
        <GameContext.Provider value={{ games, gameAdd, gameEdit, addComment }}>
            {children}
        </GameContext.Provider>
    );
}