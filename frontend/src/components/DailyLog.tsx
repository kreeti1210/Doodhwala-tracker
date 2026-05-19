import { useEffect, useState, useCallback } from "react";

import { useMilkStore } from "../store/useMilkStore";

import { getPaginatedLogs } from "../services/record.service";

import { Droplets, XCircle, ChevronDown, ClipboardList } from "lucide-react";

export default function DailyLog() {
  const user = useMilkStore((state) => state.user);

  const theme = useMilkStore((state) => state.theme);

  const [records, setRecords] = useState<any[]>([]);

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(false);

  const fetchLogs = useCallback(
    async (currentPage = 1) => {
      try {
        const response = await getPaginatedLogs(user.id, currentPage, 5);

        if (currentPage === 1) {
          setRecords(response.records);
        } else {
          setRecords((prev) => [...prev, ...response.records]);
        }

        setHasMore(response.hasMore);
      } catch (error) {
        console.error(error);
      }
    },
    [user.id],
  );

  useEffect(() => {
    fetchLogs(1);

    const handleRefresh = () => {
      setPage(1);

      fetchLogs(1);
    };

    window.addEventListener("recordsUpdated", handleRefresh);

    return () => {
      window.removeEventListener("recordsUpdated", handleRefresh);
    };
  }, [fetchLogs]);

  const loadMore = async () => {
    const nextPage = page + 1;

    setPage(nextPage);

    await fetchLogs(nextPage);
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);

      return {
        day: date.toLocaleDateString("en-IN", {
          weekday: "short",
        }),

        date: date.toLocaleDateString("en-IN", {
          day: "numeric",

          month: "short",
        }),
      };
    } catch {
      return {
        day: "",

        date: dateStr,
      };
    }
  };

  return (
    <div
      className={`
        rounded-3xl overflow-hidden shadow-sm border

        ${
          theme === "light"
            ? "bg-white border-slate-100"
            : "bg-slate-900 border-slate-800"
        }
      `}
    >
      <div
        className={`
          flex justify-between items-center px-5 pt-5 pb-4 border-b

          ${theme === "light" ? "border-slate-50" : "border-slate-800"}
        `}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`
              w-8 h-8 rounded-xl flex items-center justify-center

              ${theme === "light" ? "bg-sky-50" : "bg-slate-800"}
            `}
          >
            <ClipboardList
              className={
                theme === "light"
                  ? "w-4 h-4 text-sky-600"
                  : "w-4 h-4 text-sky-300"
              }
            />
          </div>

          <h2
            className={
              theme === "light"
                ? "text-base font-bold text-slate-800"
                : "text-base font-bold text-white"
            }
          >
            Activity Logs
          </h2>
        </div>

        <span
          className={`
            text-xs px-2.5 py-1 rounded-lg

            ${
              theme === "light"
                ? "text-slate-400 bg-slate-50"
                : "text-slate-400 bg-slate-800"
            }
          `}
        >
          Recent Activity
        </span>
      </div>

      <div className="p-5">
        {records.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div
              className={`
                w-14 h-14 rounded-2xl flex items-center justify-center mb-3

                ${theme === "light" ? "bg-slate-50" : "bg-slate-800"}
              `}
            >
              <Droplets
                className={
                  theme === "light"
                    ? "w-7 h-7 text-slate-300"
                    : "w-7 h-7 text-slate-500"
                }
              />
            </div>

            <p
              className={
                theme === "light"
                  ? "text-slate-500 text-sm font-medium"
                  : "text-slate-300 text-sm font-medium"
              }
            >
              No logs yet
            </p>

            <p
              className={
                theme === "light"
                  ? "text-slate-400 text-xs mt-1"
                  : "text-slate-500 text-xs mt-1"
              }
            >
              Tap a date on the calendar to add a log
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {records.map((log) => {
              const isAbsent = log.status === "absent";

              const { day, date } = formatDate(log.date);

              return (
                <div
                  key={log.id}
                  className={`
                    flex items-center gap-4 p-4 rounded-2xl
                    transition-all duration-150 hover:scale-[1.01] active:scale-[0.99] cursor-default

                    ${
                      isAbsent
                        ? theme === "light"
                          ? "bg-red-50 border border-red-100"
                          : "bg-red-950/30 border border-red-900/40"
                        : theme === "light"
                          ? "bg-sky-50 border border-sky-100"
                          : "bg-slate-800 border border-slate-700"
                    }
                  `}
                >
                  <div
                    className={`
                    w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0

                    ${
                      isAbsent
                        ? theme === "light"
                          ? "bg-red-100"
                          : "bg-red-900/40"
                        : theme === "light"
                          ? "bg-sky-100"
                          : "bg-slate-700"
                    }
                  `}
                  >
                    {isAbsent ? (
                      <XCircle
                        className={
                          theme === "light"
                            ? "w-5 h-5 text-red-500"
                            : "w-5 h-5 text-red-300"
                        }
                      />
                    ) : (
                      <Droplets
                        className={
                          theme === "light"
                            ? "w-5 h-5 text-sky-600"
                            : "w-5 h-5 text-sky-300"
                        }
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className={`
                      text-sm font-semibold truncate

                      ${
                        isAbsent
                          ? theme === "light"
                            ? "text-red-700"
                            : "text-red-200"
                          : theme === "light"
                            ? "text-slate-800"
                            : "text-white"
                      }
                    `}
                    >
                      {day && date ? `${day}, ${date}` : log.date}
                    </h3>

                    <p
                      className={`
                      text-xs mt-0.5

                      ${
                        isAbsent
                          ? theme === "light"
                            ? "text-red-400"
                            : "text-red-300"
                          : theme === "light"
                            ? "text-slate-500"
                            : "text-slate-400"
                      }
                    `}
                    >
                      {isAbsent ? (
                        "Milk delivery marked absent"
                      ) : (
                        <>
                          Delivery of{" "}
                          <span
                            className={
                              theme === "light"
                                ? "font-semibold text-sky-700"
                                : "font-semibold text-sky-300"
                            }
                          >
                            {log.quantity}L
                          </span>
                        </>
                      )}
                    </p>
                  </div>

                  <div
                    className={`
                    px-2.5 py-1 rounded-lg text-xs font-semibold flex-shrink-0 border

                    ${
                      isAbsent
                        ? theme === "light"
                          ? "bg-red-100 text-red-600 border-red-200"
                          : "bg-red-900/40 text-red-200 border-red-800/60"
                        : theme === "light"
                          ? "bg-sky-100 text-sky-700 border-sky-200"
                          : "bg-sky-900/30 text-sky-200 border-sky-800/60"
                    }
                  `}
                  >
                    {log.status}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {hasMore && (
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMore}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-150

                ${
                  theme === "light"
                    ? "bg-slate-50 hover:bg-sky-50 border-slate-200 hover:border-sky-200 text-slate-600 hover:text-sky-700"
                    : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 hover:text-white"
                }
              `}
            >
              Show More
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
