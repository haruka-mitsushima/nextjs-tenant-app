import Head from 'next/head';
import {useRouter} from 'next/router'
import { useState } from 'react';

export default function ItemPage({itemData}: any){
    const router = useRouter()
    const [name, setName] = useState(itemData.name)
    const [description, setDescription] = useState(itemData.description)
    const [price, setPrice] = useState(itemData.price)
    const [imageURL, setImageURL] = useState(itemData.imageURL)
    const [deleted, setDeleted] = useState(itemData.deleted)
    const send = async () =>{
        (e: Event) => e.preventDefault()
        await fetch(`http://localhost:3000/api/items/${itemData.id}`, {
            method: 'PUT',
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
    return(
        <>
        <Head>
            <title>{itemData.name}</title>
        </Head>
        <h1>{itemData.name}</h1>
        <div>{itemData.price}円</div>
        <div>{itemData.description}</div>
        <img src={itemData.imageURL} width='200px' height='200px' />
        <h2>更新フォーム</h2>
        <form method='PUT' id='update'>
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
            <button onClick={send}>更新</button>
        </form>
        </>
    )
}

export async function getStaticProps ({params}: {params: {id: number}}) {
        const id = params.id
        const itemData = await fetch(`http://localhost:3000/api/items/${id}`).then((res) => res.json());
        return {
            props: {
                itemData,
            }
        };
    }

export async function getStaticPaths () {
        const getItems = await fetch('http://localhost:3000/api/items').then((res) => res.json());
        const getPaths = getItems.map((item: {id: number})=>{return {params: {id: item.id.toString()}}})
        return {
            paths: getPaths,
            fallback: false,
        };
    }
