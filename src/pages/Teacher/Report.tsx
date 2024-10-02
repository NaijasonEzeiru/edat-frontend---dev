import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getColor, studentReport } from "@/lib/jsons";

const getAverage = (array) =>
  array.reduce((sum, currentValue) => sum + currentValue.score_percent, 0) /
  array.length;

studentReport[0].results;

console.log({
  flat: [
    [20, 30],
    [30, 40],
  ].flat(2),
});

const StudentsReport = () => (
  <div className="space-y-3 mt-32">
    <table className="">
      <tr className="text-left whitespace-nowrap">
        <th>All students</th>
        <th className="capitalize max-w-8">
          <HoverCard>
            <HoverCardTrigger asChild>
              <p className="-rotate-45 origin-top relative bottom-1 font-medium cursor-pointer">
                All questions
              </p>
            </HoverCardTrigger>
            <HoverCardContent>All questions</HoverCardContent>
          </HoverCard>
        </th>
        {studentReport[0].results.map((result, index) => (
          <th className="capitalize max-w-8">
            <HoverCard>
              <HoverCardTrigger asChild>
                <p className="-rotate-45 origin-top relative bottom-1 font-medium cursor-pointer">
                  {result.learning_outcome}
                </p>
              </HoverCardTrigger>
              <HoverCardContent>{result.learning_outcome}</HoverCardContent>
            </HoverCard>
          </th>
        ))}
      </tr>
      {/* <tr>
        <td>All students</td>
        <td></td>
      </tr> */}
      {studentReport.map((val, i) => (
        <tr>
          <td>
            <p className="pr-2">{val.fullName}</p>
          </td>
          <td>
            <p
              className="size-8 rounded-sm flex items-center justify-center m-0.5 font-semibold text-white"
              style={{
                // width: `${+result.score_percent}%`,
                backgroundColor: getColor(getAverage(val.results)),
              }}
            >
              {getAverage(val.results)}
            </p>
          </td>
          {val.results.map((result, index) => (
            <td>
              <p
                className="size-8 rounded-sm flex items-center justify-center m-0.5 font-semibold text-white text-xl"
                style={{
                  // width: `${+result.score_percent}%`,
                  backgroundColor: getColor(+result.score_percent),
                }}
              >
                {result.score_percent > 49 ? <p>&#10003;</p> : "X"}
              </p>
            </td>
          ))}
        </tr>
      ))}
    </table>
  </div>
);

export default StudentsReport;
