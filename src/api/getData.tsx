// start get data for home page
export default async function getData(point: string, locale: string) {
  // if (lng && point) return <Loader />;

  try {
    // جلب البيانات من الـ API
    // https://amtalek.com/amtalekadmin/public/api/
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}${point}`, {
      // const res = await fetch(`https://amtalek.amtalek.com/amtalekadmin/public/api/${point}`, {
      method: "GET",
      headers: {
        lang: locale || "ar", //
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);

    return {
      props: {
        data: null,
      },
    };
  }
}

// end get data for home page
