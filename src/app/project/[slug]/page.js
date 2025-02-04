import SingleProject from "@/components/projects/SingleProect";

// export function generateMetadata({ params }) {
//   return {
//     title: `Project - ${params.slug}`,
//     description: `Detailed information about ${params.slug}.`,
//   };
// }

export default function SingleProjectPage({ params }) {
  return <SingleProject slug={params.slug} />;
}
