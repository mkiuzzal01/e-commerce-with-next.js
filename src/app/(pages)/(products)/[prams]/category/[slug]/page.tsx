import CategoryProducts from "./components/CategoryProducts";

type PageProps = {
  params: {
    prams: string;
    slug: string;
  };
};

export default function Page({ params }: PageProps) {
  const { prams, slug } = params;
  return <CategoryProducts  params={{ prams, slug }} />;
}
