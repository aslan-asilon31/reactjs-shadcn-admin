import { useQuery } from "@tanstack/react-query";
 
async function fetchpPoductList() {
  const res = await fetch(
    "https://fakestoreapi.com/products"
  );
  const data = await res.json();
  return data;
}
 
export function productList() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["TampilProduk"],
    queryFn: fetchpPoductList,
  });
 
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error fetching data</p>;
  }
  return (
    <p>
      <code>
        {data.productList} {`- ${data.character}`}
      </code>
    </p>
  );
}