import Head from 'next/head';
import {useForm, SubmitHandler} from 'react-hook-form';

type Inputs = {name: string, description: string, price: number, imageURL: string}

export default function CreatePage(){
    const {
        register,
        handleSubmit,
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => 
        console.log(JSON.stringify(data))
    return (
        <>
        <Head>
            <title>商品登録ページ</title>
        </Head>
        <h1>商品登録フォーム</h1>
        <form method="psot" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">
                商品名:
                <input type="text" id="name" {...register("name")} />
            </label>
            <br />
            <label htmlFor="description">
                商品の説明:
                <input type="text" id="description" {...register("description")}/>
            </label>
            <br />
            <label htmlFor="price">
                商品の価格:
                <input type="text" id="price" {...register("price")} />
            </label>
            <br />
            <label htmlFor="imageURL">
                商品画像のURL:
                <input type="url" id="imageURL" {...register("imageURL")}/>
            </label>
            <br />
            <input type="submit" />
        </form>
        </>
    )
}
