"use client";
// import LatestProperties from "./LatestProperties.tsx";
// import PropertiesCategories from "./PropertiesCategories.tsx";
// import FeaturedPropertiesAside from "./FeaturedPropertiesAside.tsx";

// import LatestProperties from "./landingPage/latestProperties/LatestProperties";
import PropertiesCategories from "./PropertiesCategories";
import FeaturedPropertiesAside from "./PropertyDetails/aside/components/FeaturedPropertiesAside";
import LatestProperties from "./PropertyDetails/aside/components/LatestProperties";

function Aside({ t }: any) {
  return (
    <aside className="w-full sticky top-20 h-full flex flex-col items-start gap-12">
      <PropertiesCategories t={t} />
      <LatestProperties  />
      <FeaturedPropertiesAside />
    </aside>
  );
}

export default Aside;
