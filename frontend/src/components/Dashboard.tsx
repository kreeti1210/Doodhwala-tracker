import { useMilkStore } from "../store/useMilkStore";

import Navbar from "./Navbar";
import TotalCard from "./TotalCard";
import Calendar from "./Calendar";
import DailyLog from "./DailyLog";

import DayModal from "../modals/DayModal";

export default function Dashboard() {
  const selectedDay = useMilkStore((state) => state.selectedDay);

  const theme = useMilkStore((state) => state.theme);

  return (
    <div
      className={`
        min-h-screen font-sans transition

        ${theme === "light" ? "bg-sky-50" : "bg-slate-950"}
      `}
    >
      <Navbar />

      <div className="max-w-[460px] mx-auto px-4 py-6 space-y-7">
        <section>
          <TotalCard />
        </section>

        <section>
          <Calendar />
        </section>

        <section className="pb-10">
          <DailyLog />
        </section>
      </div>

      {selectedDay && <DayModal />}
    </div>
  );
}
