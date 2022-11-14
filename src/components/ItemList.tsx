import useSWR from 'swr';

const fetcher = (resource: string, init: any) => fetch(resource, init).then((res) => res.json());

export default function ItemList () {
    const {data, error} = useSWR('/api/items', fetcher)
    if(error) return <div>failed to load</div>
    if(!data) return <div>loading...</div>
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>商品名</th>
                    <th>説明</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item: {id: number, name: string, description: string}) => {
                    return (
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>[削除]</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
};

export async function getItemData(id: number){
    const {data} = useSWR('/api/items', fetcher)
    const items = data.map((item: {id: number, name: string}) =>{return {id: item.id, name: item.name}})
    return  items[id-1]
}
