/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { WordService } from "../services/WordService";

interface Word {
  _id: string;
  title: string;
  sub_title: string;
  variants?: any;
  variant_count: number;
}

const WordItem: React.FC<{ word: Word }> = ({ word }) => {
  const navigate = useNavigate();
  const showVariants = () => {
    navigate(`/word/${word.title}`);
  };
  return (
    <div className="bg-white p-4 shadow-md text-black">
      <div className="flex justify-between items-center">
        <div className="flex w-full items-center pr-2">
          <div className="flex flex-1 flex-col ">
            <div className="text-2xl capitalize">{word?.title}</div>
            <div className="text-sm">{word?.sub_title}</div>
          </div>
          <div className="">
            <span className="italic font-thin">{word?.variant_count}</span>
          </div>
        </div>
        <button
          onClick={showVariants}
          className="bg-white text-primary hover:underline focus:outline-none"
        >
          <FaChevronRight size={23} />
        </button>
      </div>
    </div>
  );
};

const WordList: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);

  useEffect(() => {
    WordService.getWords()
      .then((data) => {
        console.log("workds", data);
        setWords(data);
      })
      .catch(() => alert("Error fetching"));
  }, []);

  return (
    <div className=" p-4">
      <div className="grid grid-cols-1 gap-4">
        {words.map((word) => (
          <WordItem key={word._id} word={word} />
        ))}
      </div>
    </div>
  );
};

export default WordList;
