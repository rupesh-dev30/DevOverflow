import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import Link from "next/link";

const questions = [
  // {
  //   _id: 1,
  //   title: "Cascading Deletes in SQLAIChemy?",
  //   tags: [
  //     { _id: 1, name: "python" },
  //     { _id: 2, name: "sql" },
  //   ],
  //   author: "Rupesh Kumar",
  //   upvotes: 10,
  //   answers: 2,
  //   createdAr: "2024-09-01T12:00:00.000Z",
  // },
  // {
  //   _id: 2,
  //   title: "Cascading Deletes in SQLAIChemy?",
  //   tags: [
  //     { _id: 1, name: "python" },
  //     { _id: 2, name: "sql" },
  //   ],
  //   author: "Rupesh Kumar",
  //   upvotes: 10,
  //   answers: 2,
  //   createdAr: "2024-09-01T12:00:00.000Z",
  // },
  // {
  //   _id: 3,
  //   title: "Cascading Deletes in SQLAIChemy?",
  //   tags: [
  //     { _id: 1, name: "python" },
  //     { _id: 2, name: "sql" },
  //   ],
  //   author: "Rupesh Kumar",
  //   upvotes: 10,
  //   answers: 2,
  //   createdAr: "2024-09-01T12:00:00.000Z",
  // },
];

export default function Home() {
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0
          ? questions.map((question) => "QuestionCard")
          : <NoResult />}
      </div>
    </>
  );
}
