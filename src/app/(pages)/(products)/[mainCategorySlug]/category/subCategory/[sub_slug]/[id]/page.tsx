import ProductDetails from "@/components/Shared/ProductDetails";

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
