import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import PrivateRoute from './components/common/PrivateRoute';
 

import Catalog from './components/catalog/Catalog';
import Create from './components/create/Create';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Logout from './components/logout/Logout'
import Details from './components/details/Details';

import EditGame from './components/edit/EditGame';
import PrivateGuard from './components/common/PrivateGuard';

function App() {
    return (
        <AuthProvider>

            <div id="box">
                <Header />
                <GameProvider >
                    <main id="main-content">
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/create' element={(
                            <PrivateRoute>
                                <Create />
                                </PrivateRoute>)} />
                            <Route  element={<PrivateGuard/>}>
                            <Route path='/catalog/:gameId/edit' element={<EditGame />} />
                            <Route path='/logout' element={<Logout />} />
                            </Route>
                            <Route path='/catalog' element={<Catalog />} />
                            <Route path='/catalog/:gameId' element={<Details/>} />
                        </Routes>

                    </main>
                </GameProvider>
            </div>
        </AuthProvider>
    );
}

export default App;
