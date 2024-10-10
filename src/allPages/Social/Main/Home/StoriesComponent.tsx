import Image from "next/image";

type Story = {
  story: any;
};
function StoriesComponent({ story }: Story) {
  return (
    <div
      key={story.id}
      className="w-[150px] flex-shrink-0 h-[220px] flex relative rounded-xl overflow-hidden"
    >
      <Image width={1000} height={1000} alt="dsdsadsa" src={story.img} className="w-full h-full " />
      <Image
        width={1000}
        height={1000}
        alt="sdfdfwe"
        src={story.userImg}
        className="w-[40px] h-[40px] absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full"
      />
    </div>
  );
}

export default StoriesComponent;
