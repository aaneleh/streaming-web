import './index.css'
import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from 'react-hook-form'
import axios from 'axios'

type Form = {
    user: string
    password: string
}

function Login() {

    let navigate = useNavigate();

    const API =  import.meta.env.VITE_API

    async function tryLogin(data: Form) {

        try{
            const res = await axios.post(`${API}/login`, {
                user_name: getValues("user"),
                password: getValues("password")
            })
            console.log('res', res.data.message)
            if(res.status == 200) navigate('/')
        } catch(err){
            console.log('err', err.response.data.message)
        }
    }

    const {
        register,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>()

    const onSubmit: SubmitHandler<Form> = (data) => tryLogin(data)

  return (
    <section className='login'>
        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>

            <h2 className='login-title'>Login</h2>

            <div className="form-item">
                <label htmlFor="user">Usuário</label>
                <input type="text" placeholder='Usuário' {...register("user")} />
            </div>

            <div className="form-item">
                <label htmlFor="password">Senha</label>
                <input type="pass" placeholder='Senha' {...register("password")}/>
            </div>

            <input type="submit" value="Entrar" className='glass button' />
        </form>

    </section>
  )
}

export default Login
