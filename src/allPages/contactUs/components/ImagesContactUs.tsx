import Image from "next/image";

export default function ImagesContactUs() {
  return (
    <div className="ContactUs__top--patterns relative w-3/5 clg:w-[53%] amd:w-full h-[550px] rtl:flip  ">
      <div className="patterns--wrapper absolute bottom-1/2  translate-y-1/2 right-1/2 translate-x-1/2 asm:translate-x-[15%] sm:translate-x-[9%]">
        <div className="center__pattern--wrapper relative">
          <div className="hover:scale-95 transition-all duration-300 cursor-pointer">
            <Image
              width={1000}
              height={1000}
              className="contact__pattern  scaling__contact--animation   contact__pattern--1 big---center  w-52 object-cover  aspect-[6/7] hover:scale-95 transition-all duration-300 cursor-pointer opacity-0"
              src="https://firebasestorage.googleapis.com/v0/b/dtd-blog-8bed5.appspot.com/o/frames-for-your-heart-vbSRUrNm3Ik-unsplash.jpg?alt=media&token=a54f38c4-d7c8-4c46-90be-165c56635ad1"
              alt="contact__pattern--1 "
            />
          </div>
          <div className="top---right absolute bottom-full ml-7 translate-y-1/4 w-40   aspect-[6/7] hover:scale-95 transition-all duration-300 cursor-pointer left-1/2">
            <Image
              width={1000}
              height={1000}
              className="contact__pattern  scaling__contact--animation  contact__pattern--2  object-cover   w-full h-full opacity-0"
              style={{ "--delay": "0.2s" } as any}
              src="https://firebasestorage.googleapis.com/v0/b/dtd-blog-8bed5.appspot.com/o/bernard-hermant-KqOLr8OiQLU-unsplash.jpg?alt=media&token=f7a40699-0b5a-4cb1-85a2-6f7d1d50207e"
              alt="contact__pattern--2"
            />
          </div>
          <div className="right---center absolute bottom-1/2 translate-y-1/2  left-full ml-4  w-32  aspect-[6/7] hover:scale-95 transition-all duration-300 cursor-pointer">
            <Image
              width={1000}
              height={1000}
              className="contact__pattern  scaling__contact--animation  contact__pattern--3    object-cover w-full h-full opacity-0"
              style={{ "--delay": "0.4s" } as any}
              src="https://firebasestorage.googleapis.com/v0/b/dtd-blog-8bed5.appspot.com/o/r-architecture-2gDwlIim3Uw-unsplash.jpg?alt=media&token=f6b54dbf-e741-45ce-8c9f-8968df78a006"
              alt="contact__pattern--3"
            />
          </div>

          <div className="right---bottom absolute top-full ml-7 -translate-y-1/4  left-1/2  w-40   aspect-[6/7] hover:scale-95 transition-all duration-300 cursor-pointer">
            <Image
              width={1000}
              height={1000}
              className="contact__pattern  scaling__contact--animation  contact__pattern--4  object-cover w-full h-full   opacity-0"
              style={{ "--delay": "0.6s" } as any}
              src="https://firebasestorage.googleapis.com/v0/b/dtd-blog-8bed5.appspot.com/o/marvin-meyer-bfOQSDwEFg4-unsplash.jpg?alt=media&token=7efcce3c-bdbf-4611-b152-7e9c6a60762f"
              alt="contact__pattern--4"
            />
          </div>

          <div className="left---top absolute bottom-[20%] translate-y-  right-full mr-4   w-24 object-cover aspect-[6/7] hover:scale-95 transition-all duration-300 cursor-pointer asm:hidden">
            <Image
              width={1000}
              height={1000}
              className="contact__pattern  scaling__contact--animation  contact__pattern--5  object-left   w-full h-full opacity-0"
              style={{ "--delay": "0.8s" } as any}
              src="https://firebasestorage.googleapis.com/v0/b/dtd-blog-8bed5.appspot.com/o/daria-nepriakhina-LZkbXfzJK4M-unsplash.jpg?alt=media&token=99d89d1a-2a06-4f90-ace1-9307e9173e03"
              alt="contact__pattern--5"
            />
          </div>

          <div className="left---bottom absolute top-[60%] translate-y-1/2  right-full mr-2 translate-x-1/2   w-20  aspect-[6/7] hover:scale-95 transition-all duration-300 cursor-pointer asm:hidden">
            <Image
              width={1000}
              height={1000}
              className="contact__pattern  scaling__contact--animation  contact__pattern--6  object-cover object-left   w-full h-full  opacity-0"
              style={{ "--delay": "1s" } as any}
              src="https://firebasestorage.googleapis.com/v0/b/dtd-blog-8bed5.appspot.com/o/r-architecture-2gDwlIim3Uw-unsplash.jpg?alt=media&token=f6b54dbf-e741-45ce-8c9f-8968df78a006"
              alt="contact__pattern--6"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
