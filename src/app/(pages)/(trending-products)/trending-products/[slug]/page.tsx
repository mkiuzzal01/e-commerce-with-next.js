import ProductDetails from "@/components/Shared/ProductDetails";

type PageProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: PageProps) {
  const { slug } = params;
  return (
    <div>
      <ProductDetails slug={slug} />
    </div>
  );
}
