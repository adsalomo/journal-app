import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { JournalScreen } from '../journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNote } from '../../actions/note';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);
                dispatch(startLoadingNote(user.uid));
            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        });

    }, [dispatch, setChecking, setIsLoggedIn]);

    if (checking) {
        return (
            <h1>Espere...</h1>
        )
    }

    return (
        <Router>

            <div>
                <Switch>
                    <PublicRoute
                        isAuth={isLoggedIn}
                        path="/auth"
                        component={AuthRouter}
                    />

                    <PrivateRoute
                        isAuth={isLoggedIn}
                        exact
                        path="/"
                        component={JournalScreen}
                    />

                    {
                        /*
                        <Route path="/auth" component={AuthRouter} />
                        <Route exact path="/" component={JournalScreen} />
                        */
                    }

                    <Redirect to="/auth/login" />
                </Switch>
            </div>

        </Router>
    )
}
