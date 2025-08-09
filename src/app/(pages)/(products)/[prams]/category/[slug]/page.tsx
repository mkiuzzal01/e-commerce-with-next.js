import CategoryProducts from "./components/CategoryProducts";
type PageProps = {
  params: {
    prams: string;
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { prams, slug } = await params;
  return <CategoryProducts params={{ prams, slug }} />;
}
