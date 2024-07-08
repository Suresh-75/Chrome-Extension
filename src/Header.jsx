import Menu from "./Menu";

function Header({ setSettings }) {
  return (
    <div className="flex items-center text-center justify-center relative">
      <h1 className="  text-transparent text-2xl font-extrabold md:text-3xl lg:text-3xl bg-clip-text bg-gradient-to-r to-zinc-900 from-green-950 ml-2">
        Productivity Booster
      </h1>
      <Menu setSettings={setSettings} />
    </div>
  );
}

export default Header;
