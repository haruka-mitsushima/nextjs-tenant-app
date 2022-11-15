import Head from 'next/head';
import { useState } from 'react';

type Inputs = {name: string, description: string, price: number, imageURL: string}

export default function CreatePage(){
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imageURL, setImageURL] = useState('')

    const send = async () =>{
        await fetch('http://localhost:3000/api/items', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({name: name, description: description, price: price, imageURL: imageURL})
        })
    }
    
    return (
        <>
        <Head>
            <title>商品登録ページ</title>
        </Head>
        <h1>商品登録フォーム</h1>
        <form method="psot" >
            <label htmlFor="name">
                商品名:
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label htmlFor="description">
                商品の説明:
                <input type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <br />
            <label htmlFor="price">
                商品の価格:
                <input type="text" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <br />
            <label htmlFor="imageURL">
                商品画像のURL:
                <input type="url" id="imageURL" name="imageURL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
            </label>
            <br />
            <input type="submit" onClick={send}/>
        </form>
        </>
    )
}
