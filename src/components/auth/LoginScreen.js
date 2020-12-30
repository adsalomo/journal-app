import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const { msgError, loading } = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: '',
    });

    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();

        if (!isFormValid()) {
            return;
        }

        dispatch(startLoginEmailPassword(email, password));
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin());
    }

    const isFormValid = () => {
        if (!validator.isEmail(email)) {
            dispatch(setError('Email not valid'));
            return false;
        } else if (password.length < 5) {
            dispatch(setError('Password not valid'));
            return false;
        }

        dispatch(removeError());

        return true;
    }

    return (
        <>
            <h3 className="auth__title mb-2">Login</h3>

            {
                msgError &&
                <div className="auth__alert-error">
                    {msgError}
                </div>
            }

            <form
                onSubmit={handleLogin}
                className="animate__animated animate__fadeIn animate__faster"
            >
                <input
                    type="text"
                    placeholder="email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <button
                    className="btn btn-primary btn-block"
                    disabled={loading}
                    type="submit">
                    Login
                </button>

                <div className="auth__social-network">
                    <p>Login social network</p>
                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className="link">
                    Create new account
                </Link>
            </form>
        </>
    )
}
