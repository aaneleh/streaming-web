import './index.css'
import { useForm, type SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { type Login } from '../../types/Login'


function Login( {setToken}) {

    const API =  import.meta.env.VITE_API

    async function tryLogin(data: Login) {

        try{
            const res = await axios.post(`${API}/login`, {
                user_name: getValues("user"),
                password: getValues("password")
            })
            if(res.status == 200) setToken(res.data.token)
        } catch(err){
            console.log('err', err)
        }
    }

    const {
        register,
        getValues,
        handleSubmit,
    } = useForm<Login>()

    const onSubmit: SubmitHandler<Login> = (data) => tryLogin(data)

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
                <input type="password" placeholder='Senha' {...register("password")}/>
            </div>

            <input type="submit" value="Entrar" className='glass button' />
        </form>

    </section>
  )
}

export default Login;
