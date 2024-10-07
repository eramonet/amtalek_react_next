"use client";

import Image from "next/image";
import Link from "next/link";

export default function ImagesSection({ data }: any) {
  return (
    <section className="w-full bg-gray-100 py-10">
      <div className="site_container grid grid-cols-3 gap-3 md:grid-cols-1">
        {data?.map((card: any) => (
          <Link
            key={card.id}
            className="bg-white relative flex items-center justify-center"
            href={card?.link}
          >
            <Image
              src={card.image}
              className="w-full h-full max-w-96 max-h-64"
              alt="img"
              width={380}
              height={260}
            />
            <div className="text-black p-2 absolute left-0 z-10 w-1/2">
              <h3 className="text-2xl clg:text-lg font-medium">{card.title}</h3>
              <p className="font-medium clg:text-xs">{card.sub_title}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
