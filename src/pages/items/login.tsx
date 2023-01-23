import Head from "next/head"
import {useState} from 'react';
import useUser from 'lib/useUser'
import fetchJson from 'lib/fetchJson'

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

export default function Login (){
    const {mutateUser} = useUser({
        redirectTo: 'api/users',
        reactIfFound: true
    })
    const [userId, setUserId] = useState("")
    const [password, setPasword] = useState("")
    const login = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const body = {
            id: userId
        }
        try{
            mutateUser(
                await fetchJson('http://localhost:3000/api/items', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json',},
                    body: JSON.stringify(body)
                })
            )
        } catch (error){
            console.log(error)
        }
    }
    return(
        <>
        <Head>
            <title>ログインページ</title>
        </Head>
        <form method="GET" id='login' onSubmit={login}>
            <h2>ログインフォーム</h2>
            <label htmlFor="userId">
            ユーザーID:
            <input type="number" name="userId" id="userId" value={userId} onChange={(e)=>setUserId(e.target.value)} />
            </label>
            <br />
            <label htmlFor="userName">
            パスワード:
            <input type="password" name="password" id="password" value={password} onChange={(e)=>setPasword(e.target.value)} />
            </label>
            <br />
            <button type="submit">ログイン</button>
        </form>
        </>
    )
}
