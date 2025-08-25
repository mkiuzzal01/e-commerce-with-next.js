import CheckOut from "../components/CheckOut";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function page({ params }: Props) {
  const { slug } = await params;
  return <CheckOut slug={slug} />;
}
