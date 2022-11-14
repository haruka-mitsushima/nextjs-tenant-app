import Head from 'next/head';
import { getItemData } from 'components/ItemList';


export default function ItemPage({itemData}: any){
    return(
        <>
        <Head>
            <title>{itemData.name}</title>
        </Head>
        <h1>{itemData.id}</h1>
        <div>{itemData.name}</div>
        </>
    )
}

export async function getStaticProps ({params}: {params: {id: number}}) {
    const itemData = await getItemData(params.id)
    return {
        props: {
            itemData
        }
    };
}

export async function getStaticPaths () {
    return {
        paths: [{params: {id: '1'}}],
        fallback: false,
    };
}
