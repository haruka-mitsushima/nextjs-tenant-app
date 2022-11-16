import Head from 'next/head';
import {useRouter} from 'next/router'
import React, { useState } from 'react';
type Option = {id: number, name: string, description: string, price: number}
type ItemData = {id: number, name: string, description: string, price: number, imageURL: string, deleted: boolean, options: Option[]}

export default function ItemPage({itemData}: {itemData: ItemData}){
    const router = useRouter()
    const [name, setName] = useState(itemData.name)
    const [description, setDescription] = useState(itemData.description)
    const [price, setPrice] = useState(itemData.price)
    const [imageURL, setImageURL] = useState(itemData.imageURL)
    const [deleted, setDeleted] = useState(itemData.deleted)
    const [opId1, setOpId1] = useState(itemData.options[0].id)
    const [opName1, setOpName1] = useState(itemData.options[0].name)
    const [opDescription1, setOpDescription1] = useState(itemData.options[0].description)
    const [opPrice1, setOpPrice1] = useState(itemData.options[0].price)
    const [opId2, setOpId2] = useState(itemData.options[1].id)
    const [opName2, setOpName2] = useState(itemData.options[1].name)
    const [opDescription2, setOpDescription2] = useState(itemData.options[1].description)
    const [opPrice2, setOpPrice2] = useState(itemData.options[1].price)
    const [opId3, setOpId3] = useState(itemData.options[2].id)
    const [opName3, setOpName3] = useState(itemData.options[2].name)
    const [opDescription3, setOpDescription3] = useState(itemData.options[2].description)
    const [opPrice3, setOpPrice3] = useState(itemData.options[1].price)
    const info = {name: name, description: description, price: price, imageURL: imageURL, deleted:deleted,
                    options: [{id: opId1, name: opName1, description: opDescription1, price: opPrice1},
                        {id: opId2, name: opName2, description: opDescription2, price: opPrice2},
                        {id: opId3, name: opName3, description: opDescription3, price: opPrice3}]}
    const send = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        await fetch(`http://localhost:3000/api/items/${itemData.id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(info)
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
    const sum = ()=>{
        let result = 0
        for(const option of itemData.options){
            return result += option.price
        }
        return itemData.price + result
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
        <div>合計金額　{itemData.price}+{itemData.options[0].price}+{itemData.options[1].price}+{itemData.options[2].price}</div>
        <h2>オプション</h2>
        {itemData.options.map((option: Option)=>
            <div key={option.id}>オプション{option.id}<br />{option.name}<br />{option.price}<br />{option.description}</div>)}
        <hr />
        <h3>更新フォーム</h3>
        <form method='PUT' id='update' onSubmit={send}>
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
                <input type="number" id="price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </label>
            <br />
            <label htmlFor="imageURL">
                商品画像のURL:
                <input type="url" id="imageURL" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
            </label>
            <br />
            <hr />
            <div>オプション1</div>
            <label htmlFor='opName'>
                オプション名:
                <input type="text" id="opName1" value={opName1} onChange={(e) => setOpName1(e.target.value)} />
            </label>
            <br />
            <label htmlFor='opDescription'>
                オプションの説明:
                <input type="text" id="opDescription1" value={opDescription1} onChange={(e) => setOpDescription1(e.target.value)} />
            </label>
            <br />
            <label htmlFor='opPrice'>
                オプションの価格:
                <input type="number" id="opPrice1" value={opPrice1} onChange={(e) => setOpPrice1(Number(e.target.value))} />
            </label>
            <br />
            <br />
            <div>オプション2</div>
            <label htmlFor='opName'>
                オプション名:
                <input type="text" id="opName2" value={opName2} onChange={(e) => setOpName2(e.target.value)} />
            </label>
            <br />
            <label htmlFor='opDescription'>
                オプションの説明:
                <input type="text" id="opDescription2" value={opDescription2} onChange={(e) => setOpDescription2(e.target.value)} />
            </label>
            <br />
            <label htmlFor='opPrice'>
                オプションの価格:
                <input type="number" id="opPrice2" value={opPrice2} onChange={(e) => setOpPrice2(Number(e.target.value))} />
            </label>
            <br />
            <br />
            <div>オプション3</div>
            <label htmlFor='opName'>
                オプション名:
                <input type="text" id="opName3" value={opName3} onChange={(e) => setOpName3(e.target.value)} />
            </label>
            <br />
            <label htmlFor='opDescription'>
                オプションの説明:
                <input type="text" id="opDescription3" value={opDescription3} onChange={(e) => setOpDescription3(e.target.value)} />
            </label>
            <br />
            <label htmlFor='opPrice'>
                オプションの価格:
                <input type="number" id="opPrice3" value={opPrice3} onChange={(e) => setOpPrice3(Number(e.target.value))} />
            </label>
            <br />
            <button type='submit'>更新</button>
        </form>
        </>
    )
}

// export function Option ({itemData}: any){
//     const roop = () => {for (const option of itemData.options){
//         return(
//             <>
//             <div>オプション{option.id}</div>
//             <div>{option.name}</div>
//             <div>{option.price}円</div>
//             <div>{option.description}</div>
//             </>
//         )}
//     }
//     return roop
// }

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
