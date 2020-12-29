import React from 'react';
import { Link } from 'react-router-dom';

export const RegisterScreen = () => {
    return (
        <>
            <h3 className="auth__title mb-2">Register</h3>

            <form>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                />

                <input
                    type="passwrod"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                />

                <input
                    type="passwrod"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                />

                <button
                    className="btn btn-primary btn-block mb-2"
                    type="submit">
                    Register
                </button>

                <Link to="/auth/login" className="link">
                    Already Registered?
                </Link>
            </form>
        </>
    )
}
