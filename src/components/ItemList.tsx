import useSWR, { useSWRConfig } from 'swr';

const fetcher = (resource: string, init: any) =>
  fetch(resource, init).then((res) => res.json());
type Item = {
  id: number;
  name: string;
  description: string;
  deleted: boolean;
};

export default function ItemList() {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR(
    'http://localhost:3005/api/items',
    fetcher
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
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
        {data
          .filter((item: Item) => {
            if (item.deleted === false) {
              return item;
            }
          })
          .map((item: Item) => {
            return (
              <tr key={item.id}>
                <td key={item.id}>{item.id}</td>
                <td key={item.name}>{item.name}</td>
                <td key={item.description}>{item.description}</td>
                <td>
                  <button
                    onClick={async () => {
                      const info = { deleted: true };
                      await fetch(
                        `http://localhost:3005/api/items/delete/${item.id}`,
                        {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify(info),
                        }
                      );
                      mutate(`http://localhost:3005/api/items`);
                    }}
                  >
                    削除
                  </button>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

// export async function getItemData(id: number){
//     const {data} = useSWR('/api/items', fetcher)
//     const items = data.map((item: {id: number, name: string}) =>{return {id: item.id, name: item.name}})
//     return  items[id-1]
// }
