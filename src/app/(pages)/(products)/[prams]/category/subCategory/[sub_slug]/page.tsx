import SubCategoryProducts from "./components/SubCategoryProducts";
type PageProps = {
  params: {
    prams: string;
    sub_slug: string;
  };
};

export default function Page({ params }: PageProps) {
  const { prams, sub_slug } = params;
  return <SubCategoryProducts params={{ prams, sub_slug }} />;
}
