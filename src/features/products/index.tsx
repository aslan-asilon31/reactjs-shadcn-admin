import { Main } from '@/components/layout/main';
import { Header } from '@/components/layout/header';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ThemeSwitch } from '@/components/theme-switch';
import axios from 'axios';
import { useState,useEffect } from 'react';
import ProductsProvider from './context/products-context'


interface Product {
  id?: number;
  name: string;
  price: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8004/api/customers'); // Adjust the URL as needed
      setProducts(response.data); // Assuming the response data is an array of products
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Failed to fetch customers');
    } finally {
      setLoading(false);
    }
  };


  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Create or update a product
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true); // Set loading to true

    try {
        // Make your API call here
        await axios.post('http://localhost:8004/api/customers/store');
        // Optionally, you can reset the form fields here
        setName('');
        setPrice(0);

        await fetchProducts();
        
    } catch (error) {
        console.error("Error inserting data:", error);
    } finally {
        setLoading(false); // Reset loading state
    }
};

  // Delete a product
  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts(); // Refresh the product list
    } catch (err) {
      setError('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  // Set the form for editing
  const handleEdit = (product: Product) => {
    setName(product.name);
    setPrice(product.price);
  };

  // Reset the form
  const resetForm = () => {
    setName('');
    setPrice('');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  

  return (
    <ProductsProvider>
      <Main>
        <Header>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </Header>

        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Product'}
            </button>
        </form>


          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.image_url}</td>
                  <td>
                    <button onClick={() => handleEdit(product)}>Edit</button>
                    <button onClick={() => handleDelete(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

      </Main>
    </ProductsProvider>
  );
}
