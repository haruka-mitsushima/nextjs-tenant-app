import Head from 'next/head';

export default function ItemPage({itemData}: any){
    return(
        <>
        <Head>
            <title>{itemData.name}</title>
        </Head>
        <h1>{itemData.name}</h1>
        <div>{itemData.price}円</div>
        <div>{itemData.description}</div>
        <img src={itemData.imageURL} width='200px' height='200px' />
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
