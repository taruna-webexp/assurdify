import SingleProject from "@/components/projects/SingleProect";
//Title
export function generateMetadata({ params }) {
  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);
  return {
    title: `Assure DeFi® | ${capitalizeFirstLetter(params?.slug)}`,
  };
}

export default function SingleProjectPage({ params }) {
  return <SingleProject slug={params?.slug} />;
}
