import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as gameService from '../../services/GameService';

const Details = ({
    addComment
         }) => {
    const {gameId}= useParams();
    const [currentGame, setCurrentGame]= useState({});


    const [comment, setComment] = useState({
        username: '',
        comment: ''
    });
    const [error, setError] = useState({
        username: '',
        comment: ''
    });
 
    useEffect(()=>{
        gameService.getOne(gameId)
           .then(result=>{
             setCurrentGame(result)
           })
    },[])

 

    const addCommentHandler = (e) => {
        e.preventDefault()
        // console.log(comment)
        let result = `${comment.username}: ${comment.comment}`
        addComment(gameId, result)
    }
    const onChange = (e) => {
        setComment(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const validateUsername = (e) => {
        const username = e.target.value;
        let errorMessage = '';

        if (username.length < 4) {
            errorMessage = 'Username must be longer than 4 charachters'
        } else if (username.length > 10) {
            errorMessage = 'Username must be shorter than 10 charachters'
        }

        setError(state => ({
            ...state,
            username: errorMessage
        }))
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={currentGame.imageUrl} />
                    <h1>{currentGame.title}</h1>
                    <span className="levels">MaxLevel: {currentGame.maxLevel}</span>
                    <p className="type">{currentGame.category}</p>
                </div>
                <p className="text">
                    {currentGame.summary}
                </p>
                {/* Bonus ( for Guests and Users ) */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {/* {currentGame.comments?.map(x =>
                            <li className="comment">
                                <p> {x}</p>
                            </li>
                        )} */}
                    </ul>

                    {/* {!currentGame.comments && <p className="no-comment">No comments.</p>} */}

                </div>

                <div className="buttons">
                    <Link to={`/catalog/${gameId}/edit`} className="button">
                        Edit
                    </Link>
                    <Link to="" className="button">
                        Delete
                    </Link>
                </div>
            </div>
          
            {/* Add Comment ( Only for logged-in users, which is not creators of the current game ) */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={addCommentHandler}>
                    <input
                        type="text"
                        name="username"
                        placeholder="John Doe"
                        onChange={onChange}
                        onBlur={validateUsername}
                        value={comment.username}
                    />
                     {error.username &&
                     <div style={{color:'red'}}>{error.username}</div>
                     }
                    <textarea
                        name="comment"
                        placeholder="Comment......"
                        onChange={onChange}
                        value={comment.comment}
                    />
                    <input
                        className="btn submit"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </article>
        </section>
    )
}

export default Details;