import Head from 'next/head';
import Link from 'next/link';
import ItemList from "components/ItemList"

export default function ItemListPage () {
    return(
        <>
        <Head>
            <title>商品一覧</title>
        </Head>
        <Link href='/items/create'>新規登録</Link>
        <ItemList />
        </>
    );
}
