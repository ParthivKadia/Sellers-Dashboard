import welcomeBg from "@/assets/welcome-bg.png";

const WelcomeCard = () => {
  return (
    <div className="bg-primary rounded-xl p-6 flex items-center justify-between overflow-hidden relative min-h-[160px] col-span-full lg:col-span-6">
      <div className="z-10">
        <h3 className="text-lg font-semibold text-primary-foreground flex items-center gap-2">
          Good Night, Mike 🌙
        </h3>
        <p className="text-primary-foreground/80 text-sm mt-1">Welcome to SpikeAdmin!</p>
        <button className="mt-4 bg-primary-foreground text-primary text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition">
          Visit Now
        </button>
      </div>
      <img src={welcomeBg} alt="" className="absolute right-0 bottom-0 h-full object-contain opacity-90" />
    </div>
  );
};

export default WelcomeCard;
