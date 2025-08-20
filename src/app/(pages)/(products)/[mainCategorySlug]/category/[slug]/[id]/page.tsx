import ProductDetails from "@/components/shared/ProductDetails";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <div>
      <ProductDetails slug={id} />
    </div>
  );
}
