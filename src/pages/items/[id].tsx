import Head from 'next/head';
// import { getItemData } from 'components/ItemList';


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
        const getItems = await fetch('http://localhost:3000/api/items').then((res) => res.json());
        const getPaths = getItems.map((item: {id: number, name: string, description: string, price: number, imageURL: string})=>{return {id: item.id, name: item.name, description: item.description, price: item.price, imageURL:item.imageURL}})
        const itemData = getPaths[id-1]
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

// export async function getStaticProps ({params}: {params: {id: number}}) {
//     const itemData = await getItemData(params.id)
//     return {
//         props: {
//             itemData
//         }
//     };
// }

// export async function getStaticPaths () {
//     return {
//         paths: [{params: {id: '1'}}],
//         fallback: false,
//     };
// }

// export async function getStaticPaths () {
//     const items = await getItemsFromAPI()
//     return {
//         paths: [{params: {id: '1'}}],
//         fallback: {'/api/items': items},
//     };
// }
