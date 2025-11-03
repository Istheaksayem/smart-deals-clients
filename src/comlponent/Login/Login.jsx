import React, { use, useState } from 'react';
import { Link } from 'react-router';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AuthContext } from '../../Context/AuthContext';

const auth = getAuth()

const googleProvider = new GoogleAuthProvider();

const Login = () => {

    const { signInUser } = use(AuthContext)
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password })

        signInUser(email, password)
            .then((result) => {
                const user = result.user
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // alert(errorCode, errorMessage)
                setError(errorMessage, errorCode)
            });
    }


    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log(error)
            })
    }


    return (
        <div className='flex justify-center min-h-screen items-center'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                <form onSubmit={handleLogin} className="card-body">
                    <h2 className='text-2xl font-bold text-center'>Login</h2>
                    <p className='text-center font-semibold'>Don't have an account ? <Link to="/register" className='text-primary'>Register</Link></p>
                    <fieldset className="fieldset">


                        {/* email */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            name='email'
                            className="input"
                            placeholder="Email"
                            required
                        />
                        {/* password  */}
                        <label className="label">Password</label>
                        <input
                            type="password"
                            name='password'
                            className="input"
                            placeholder="Password"
                            required
                        />
                        {error && <p className='text-red-500'>{error}</p>}
                        <div>
                            <a className="link link-hover">Forgot password?</a>
                        </div>


                        <button type='submit' className="btn btn-neutral mt-4 bg-primary">Login</button>
                        <br />
                        <p className='text-[#001931] text-center font-bold text-xl'>Or</p>
                        {/* Google */}
                        <button
                            onClick={handleGoogleSignIn}
                            className="btn bg-white text-black border-[#e5e5e5]">
                            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                            Login with Google
                        </button>

                    </fieldset>
                </form>
            </div>

        </div>
    );
};

export default Login;
