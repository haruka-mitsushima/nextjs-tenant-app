import Head from 'next/head';
import {useForm, SubmitHandler,} from 'react-hook-form';

type Inputs = {name: string, description: string, price: number, imageURL: string}

export default function CreatePage(){
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<Inputs>();
    const send: SubmitHandler<Inputs> = async (data) =>{
        await fetch('http://localhost:3000/api/items', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(data)
        }).then(()=>{reset();})
    }
    return (
        <>
        <Head>
            <title>商品登録ページ</title>
        </Head>
        <h1>商品登録フォーム</h1>
        <form method="psot" onSubmit={handleSubmit(send)} id="form" >
            <label htmlFor="name">
                商品名:
                <input type="text" id="name" {...register("name")} />
            </label>
            <br />
            <label htmlFor="description">
                商品の説明:
                <input type="text" id="description" {...register("description")} />
            </label>
            <br />
            <label htmlFor="price">
                商品の価格:
                <input type="text" id="price" {...register("price")} />
            </label>
            <br />
            <label htmlFor="imageURL">
                商品画像のURL:
                <input type="url" id="imageURL" {...register("imageURL")} />
            </label>
            <br />
            <input type="submit" />
        </form>
        </>
    )
}
