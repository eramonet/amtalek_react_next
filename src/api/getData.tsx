export default async function getData(point: string, locale: string, token?: string) {
  // إنشاء headers بشكل ديناميكي
  const headers: HeadersInit = {
    lang: locale || "ar",
  };

  // التحقق مما إذا كان token موجودًا
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}${point}`, {
      method: "GET",
      headers: headers,
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
