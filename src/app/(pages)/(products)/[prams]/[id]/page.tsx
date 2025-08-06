import ProductDetails from "@/components/Shared/ProductDetails";

type PageProps = {
  params: {
    prams: string;
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  const { id } = params;

  return (
    <div>
      <ProductDetails slug={id} />
    </div>
  );
}
