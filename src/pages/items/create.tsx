import Head from 'next/head';
import {useRouter} from 'next/router'
import {useState} from 'react';

export default function CreatePage(){
    const router = useRouter()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [deleted, setDeleted] = useState(false)
    const [opId1, setOpId1] = useState(1)
    const [opName1, setOpName1] = useState('')
    const [opDescription1, setOpDescription1] = useState('')
    const [opPrice1, setOpPrice1] = useState('')
    const [opId2, setOpId2] = useState(2)
    const [opName2, setOpName2] = useState('')
    const [opDescription2, setOpDescription2] = useState('')
    const [opPrice2, setOpPrice2] = useState('')
    const [opId3, setOpId3] = useState(3)
    const [opName3, setOpName3] = useState('')
    const [opDescription3, setOpDescription3] = useState('')
    const [opPrice3, setOpPrice3] = useState('')
    const itemData = {name: name, description: description, price: price, imageURL: imageURL, deleted:deleted,
                    options: [{id: opId1, name: opName1, description: opDescription1, price: opPrice1},
                        {id: opId2, name: opName2, description: opDescription2, price: opPrice2},
                        {id: opId3, name: opName3, description: opDescription3, price: opPrice3}]}
    const send = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        await fetch('http://localhost:3000/api/items', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(itemData)
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
        <form method="psot" id="form" onSubmit={send}>
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
                <input type="number" id="opPrice1" value={opPrice1} onChange={(e) => setOpPrice1(e.target.value)} />
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
                <input type="number" id="opPrice2" value={opPrice2} onChange={(e) => setOpPrice2(e.target.value)} />
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
                <input type="number" id="opPrice3" value={opPrice3} onChange={(e) => setOpPrice3(e.target.value)} />
            </label>
            <br />
            <button type='submit'>送信</button>
        </form>
        </>
    )
}
