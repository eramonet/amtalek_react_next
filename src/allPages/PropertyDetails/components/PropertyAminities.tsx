import Heading from "@/components/Heading";

export default function PropertyAminities({ data, locale, t }: any) {
  return (
    <>
      {data?.aminities?.length > 0 && (
        <div className="Property__BENEFITS--AMENITIES w-full">
          <Heading>
            {" "}
            {t("headings.aminities", {
              defaultValue: t("headings.aminities", {
                lng: locale === "en" ? "en" : "",
              }),
            })}{" "}
          </Heading>
          <ul className="mt-7 grid grid-cols-3 gap-5 asm:grid-cols-2 sm:grid-cols-1  w-full !list-disc">
            {data?.aminities?.map((item: any) => (
              <li key={item?.id} className="flex justify-start items- gap-3">
                <div className="w-5 h-5 aspect-square rounded-full border-custome-blue border-2  flex justify-center items-center mt-[2px]">
                  <span className="bg-custome-blue rounded-full w-1.5 h-1.5 min-w-[6px] min-h-[6px]"></span>
                </div>
                <h3 className=" relative group cursor-default  h-7 flex flex-col justify-start w-fit">
                  {item?.title}
                  <hr className=" border-0 border-custome-blue w-0  duration-300 ease-in-out transition-all group-hover:w-full group-hover:border" />
                </h3>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
