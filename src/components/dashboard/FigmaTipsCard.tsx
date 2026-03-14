import giftsImg from "@/assets/gifts.png";
import user2 from "@/assets/user-2.jpg";
import user3 from "@/assets/user-3.jpg";
import user4 from "@/assets/user-4.jpg";
import user5 from "@/assets/user-5.jpg";

const FigmaTipsCard = () => {
  const avatars = [user2, user3, user4, user5];
  return (
    <div className="bg-card rounded-xl overflow-hidden col-span-full lg:col-span-3">
      <div className="bg-gradient-to-br from-purple-100 to-pink-50 p-4 flex items-center justify-center h-[160px]">
        <img src={giftsImg} alt="Gifts" className="h-full object-contain" />
      </div>
      <div className="p-5">
        <h4 className="text-base font-semibold text-foreground">Figma Tips and Tricks with Stephan</h4>
        <p className="text-sm text-muted-foreground mt-1">Checkout latest events going to happen in USA.</p>
        <div className="flex items-center mt-4">
          {avatars.map((src, i) => (
            <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-card object-cover -ml-2 first:ml-0" />
          ))}
          <span className="ml-2 text-xs text-muted-foreground font-medium">+8</span>
        </div>
      </div>
    </div>
  );
};

export default FigmaTipsCard;
