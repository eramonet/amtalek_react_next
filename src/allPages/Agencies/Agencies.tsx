import getData from "@/api/getData";
import AgenciesAll from "./components/AgenciesAll";

export default async function Agencies({ locale }: any) {
  return (
    <section>
      <div className="site_container">
        <AgenciesAll locale={locale} />
      </div>
    </section>
  );
}
