import { products } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ShopGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} className="h-full" />
      ))}
    </div>
  );
}
