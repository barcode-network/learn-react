import { React, useContext } from 'react';
import { useForm } from "react-hook-form";
import { content, signin } from './static/index'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { AuthContext } from './context/auth';
import { useHistory } from 'react-router-dom'


let schema = yup.object().shape({
    username: yup.string().required("Invalid Username"),
    password: yup.string().required("Invalid Password").min(5)
});


function Login() {

    const {user, handleLogin} = useContext(AuthContext)



    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    }
    );

    async function onSubmit(data) {
        //console.log("Input Data: ", data)
        
        const username = (await signin()).username
        //console.log("Username: ",username)
        const password = (await signin()).password
        //console.log("Password: ", password)

        if((data.username === username) && (data.password === password)){
            //setUser(data)
            handleLogin(data)
        }else{
            console.log("Try Again")
        }

    };



    const history = useHistory()

return (

    <div className="App">
        <h1>Login</h1>
        {
            user ? (history.push('/home'))
                : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {content.inputs.map((input, key) => {
                            return (
                                <div key={key}>
                                    <p>
                                        <label>{input.label}</label>
                                    </p>
                                    <p>
                                        <input
                                            className="input"
                                            name={input.name}
                                            type={input.type}
                                            ref={register} />
                                    </p>
                                    <p className="messages">
                                        {errors[input.name]?.message}
                                    </p>
                                </div>
                            );
                        })}
                        <button className="btn" type="submit">Login</button>
                    </form>

                )
        }
    </div>
)

}

export default Login;