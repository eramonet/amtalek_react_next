// import React from "react";

export default async function sendData(point: string, lng: string) {
  try {
    // جلب البيانات من الـ API
    // const res = await fetch(`https://amtalek.com/amtalekadmin/public/api/${point}`, {
    const res = await fetch(`https://amtalek.amtalek.com/amtalekadmin/public/api/${point}`, {
      method: "GET",
      headers: {
        lang: lng || "ar", //
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
