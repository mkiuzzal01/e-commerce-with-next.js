import ProductDetails from "@/components/Shared/ProductDetails";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <div>
      <ProductDetails slug={slug} />
    </div>
  );
}
