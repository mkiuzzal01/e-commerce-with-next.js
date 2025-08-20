import ClientReviewForm from "@/utils/forms/ClientReviewForm";
import { PrivateRoute } from "../../../../../utils/PrivateRoute";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function page({ params }: PageProps) {
  const { slug } = await params;
  return (
    <PrivateRoute>
      <ClientReviewForm slug={slug} />
    </PrivateRoute>
  );
}
