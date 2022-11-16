import Head from 'next/head';
import {useRouter} from 'next/router'
import {useState} from 'react';

type Inputs = {name: string, description: string, price: number, imageURL: string, deleted: boolean}

export default function CreatePage(){
    const router = useRouter()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [deleted, setDeleted] = useState(false)
    const send = async () =>{
        (e: Event) => e.preventDefault()
        await fetch('http://localhost:3000/api/items', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({name: name, description: description, price: price, imageURL: imageURL, deleted:deleted})
        })
        .then((res) => res.json())
        .then((data)=>{
            console.log('Success:', data);
            router.push('/items')
        })
        .catch((error) => {
            console.error('Error:', error)
        })
    }
    return (
        <>
        <Head>
            <title>商品登録ページ</title>
        </Head>
        <h1>商品登録フォーム</h1>
        <form method="psot" id="form" >
            <label htmlFor="name">
                商品名:
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label htmlFor="description">
                商品の説明:
                <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <br />
            <label htmlFor="price">
                商品の価格:
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <br />
            <label htmlFor="imageURL">
                商品画像のURL:
                <input type="url" id="imageURL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
            </label>
            <br />
            <button onClick={send}>送信</button>
        </form>
        </>
    )
}
