// app/products/[slug]/page.js

import ClientFetcher from "./clientFetcher";

export async function generateStaticParams() {
    return [
      { slug: 'ToteBags' },
      { slug: 'Dresses' },
      { slug: 'Skirts' },
      { slug: 'Shirts' },
      { slug: 'Bracelets' },
    ];
  }
  
  const products = {
    ToteBags: { name: 'ToteBags', price: '$20' },
    Dresses: { name: 'Dresses', price: '$30' },
    Skirts: { name: 'Skirts', price: '$50' },
    Shirts: { name: 'Shirts', price: '$50' },
    Bracelets:{name:"Bracelets",price:"$60"}
  };
  
  // ✅ Mark as async and await params
  export default async function ProductPage({ params }) {
    const { slug } = await params; // This line avoids the error
    const product = products[slug];
  
    if (!product) return <div>Product not found</div>;
  
    return (
      <div>
        <h1 style={{position:"relative", marginLeft:"30%"}}>{product.name}</h1>
        <ClientFetcher productName={product.name}/>

        
        <div style={{position:"relative",height:"150px",backgroundColor:"rgba(255,255,255,0)"}}></div>
      </div>
    );
  }
  