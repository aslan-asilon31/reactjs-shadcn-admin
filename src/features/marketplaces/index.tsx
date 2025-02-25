import { useQuery } from "@tanstack/react-query";
import { Header } from '@/components/layout/header';
import { Main } from '@/components/layout/main';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';

async function fetchProductList() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}


export default function Marketplaces() {

  // Fetching products
  const { data: products, isError, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductList,
  });


  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching data</p>;
  }

  return (
    <div>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Product List</h2>
            <p className='text-muted-foreground'>
              Manage your products here.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: { id: null; title: string ; price :string; image: string  }) => (
                <tr key={product.id}>
                  <td className="border px-4 py-2">{product.id}</td>
                  <td className="border px-4 py-2">{product.title}</td>
                  <td className="border px-4 py-2">${product.price}</td>
                  <td className="border px-4 py-2">
               
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Main>
    </div>
  );
}
