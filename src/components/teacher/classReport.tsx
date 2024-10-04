import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useResultsByClassIdQuery } from "@/features/api/apiSlice";
import { getColor, resultsMock } from "@/lib/jsons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function findValue(array: typeof resultsMock, obj: string, name: string) {
  for (let i = 0; i < array.length; i++) {
    if (array[i]?.objective === obj && array[i].userInfo.fullName === name) {
      return +array[i]?.scorePercentage;
    }
  }
  return -5;
}

function findResults(array: typeof resultsMock, obj: string, name: string) {
  for (let i = 0; i < array.length; i++) {
    if (array[i]?.objective === obj && array[i].userInfo.fullName === name) {
      return array[i]?.quizResults;
    }
  }
  return [];
}

const sample = {
  fullName: "John Doe",
  results: [
    {
      learning_outcome: "laws of indices",
      score_percent: 70,
    },
  ],
};

const getAvg = (
  array: {
    learning_outcome?: string | undefined;
    score_percent: number;
  }[]
) =>
  array
    .map((objective) => objective.score_percent)
    .filter((val) => val != -5)
    .reduce((sum, currentValue) => sum + currentValue, 0) / array.length;

const ClassReport = () => {
  const { classId } = useParams();
  const { data, isLoading } = useResultsByClassIdQuery(classId);
  const [results, setResults] = useState<(typeof sample)[]>([]);
  const [reducedAvg, setReducedAvg] = useState([]);
  const [objs, setObjs] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setObjs([...new Set(data.map((val) => val?.objective).filter((v) => v))]);
      const objects = [
        ...new Set(data.map((val) => val?.objective).filter((v) => v)),
      ];

      const students = [
        ...new Set(data.map((val) => val?.userInfo?.fullName).filter((v) => v)),
      ];

      setResults(
        students.map((name) => {
          return {
            fullName: name,
            results: objects.map((obj, i) => {
              return {
                learning_outcome: obj,
                score_percent: findValue(data, obj, name),
                quizResults: findResults(data, obj, name),
              };
            }),
          };
        })
      );

      setReducedAvg(
        objects.map((obj) => {
          return {
            obj,
            results: getAvg(
              students.map((name) => {
                return {
                  score_percent: findValue(data, obj, name),
                };
              })
            ),
          };
        })
      );
    }
  }, [data]);

  console.log({ classResults: data });
  if (isLoading) {
    return <p>Loading..</p>;
  } else {
    return (
      <div className="space-y-3 mt-12">
        <table className="pt-9">
          <tr className="text-left whitespace-nowrap">
            <th></th>
            <th className="capitalize max-w-8">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <p className="-rotate-45 origin-top relative bottom-1 text-sm font-medium cursor-pointer">
                    All questions
                  </p>
                </HoverCardTrigger>
                <HoverCardContent className="w-fit p-1">
                  All questions
                </HoverCardContent>
              </HoverCard>
            </th>
            {objs.map((obj) => (
              <th className="capitalize max-w-8" key={obj}>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <p className="-rotate-45 origin-top relative bottom-8 right-2 text-sm font-medium cursor-pointer truncate w-28">
                      {obj}
                    </p>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-fit p-1">
                    {obj}
                  </HoverCardContent>
                </HoverCard>
              </th>
            ))}
          </tr>
          <tr>
            <td className="font-semibold">All students</td>
            <td></td>
            {reducedAvg.map((avgScore) => (
              <td>
                {" "}
                <p
                  className="size-8 rounded-sm flex items-center justify-center m-0.5 font-semibold text-white"
                  style={{
                    // width: `${+result.score_percent}%`,
                    backgroundColor: getColor(avgScore.results),
                  }}
                >
                  {Math.round(avgScore.results)}
                </p>
              </td>
            ))}
          </tr>
          {results.map((val, i) => (
            <tr>
              <td>
                <p className="pr-2 capitalize">{val.fullName}</p>
              </td>
              <td>
                <p
                  className="size-8 rounded-sm flex items-center justify-center m-0.5 font-semibold text-white"
                  style={{
                    // width: `${+result.score_percent}%`,
                    backgroundColor: getColor(getAvg(val.results)),
                  }}
                >
                  {Math.round(getAvg(val.results))}
                </p>
              </td>
              {val.results.map((result, index) => (
                <td key={index}>
                  <HoverCard>
                    <HoverCardTrigger
                      className="size-8 rounded-sm flex items-center justify-center m-0.5 font-semibold text-white text-xl"
                      style={{
                        // width: `${+result.score_percent}%`,
                        backgroundColor: getColor(+result.score_percent),
                      }}
                    >
                      {result.score_percent == -5 ? (
                        "?"
                      ) : result.score_percent > 49 ? (
                        <p>&#10003;</p>
                      ) : (
                        "X"
                      )}
                      {/* </p> */}
                    </HoverCardTrigger>
                    <HoverCardContent className="w-fit p-1">
                      {result.score_percent == -5 ? (
                        "No Score"
                      ) : (
                        <div className="p-1.5 grid gap-1">
                          <p>Scrore: {result.score_percent}</p>
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="link">View Report</Button>
                            </SheetTrigger>
                            <SheetContent className="sm:w-[540px] overflow-auto">
                              <SheetHeader className="overflow-y-scroll  text-left">
                                <SheetTitle>Quiz Report</SheetTitle>
                                <SheetDescription>
                                  {result.quizResults.map(
                                    (val, index: number) => (
                                      <Card className="mb-3" key={index}>
                                        <CardHeader>
                                          <CardTitle>
                                            Question {index + 1}
                                          </CardTitle>
                                          <CardDescription>
                                            Question: {val.question}
                                          </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                          {val.isCorrect ? (
                                            <p className="text-green-700">
                                              Wrong answer
                                            </p>
                                          ) : (
                                            <p className="text-destructive">
                                              Correct answer
                                            </p>
                                          )}
                                          <p>
                                            Correct option: {val.correctOption}
                                          </p>
                                          <p>
                                            Correct answer: {val.correctAnswer}
                                          </p>
                                          <p className="capitalize">
                                            Your answer: {val.selectedAnswer}
                                          </p>
                                          <p>{val.wrongOption}</p>
                                        </CardContent>
                                      </Card>
                                    )
                                  )}
                                </SheetDescription>
                              </SheetHeader>
                            </SheetContent>
                          </Sheet>
                        </div>
                      )}
                    </HoverCardContent>
                  </HoverCard>
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    );
  }
};

export default ClassReport;
