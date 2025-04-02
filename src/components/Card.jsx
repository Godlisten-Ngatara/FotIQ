// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { use, useState, useEffect } from "react";
import { Card, Button, message } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";
import { getQuizes } from "../utils/db";
const QuizCard = () => {
  const [quizzes, SetQuizzes] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isAnswered, setisAnswered] = useState(false);
  const [isFetched, setisFetched] = useState(false);
  const [isDisabled, setisdDisabled] = useState(false);
  useEffect(() => {
    let mounted = true;
    const handleQuestionFetch = async () => {
      try {
        const snapShots = await getQuizes();
        const quizData = snapShots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (mounted) {
          SetQuizzes((prevData) => {
            const newData = [...prevData, ...quizData];
            console.log(newData);
            console.log(newData[0].Options);

            return newData;
          });
        }
      } catch (e) {
        Alert("Something went wrong");
        return null;
      }
      setisFetched(true);
    };

    handleQuestionFetch();
    return () => {
      mounted = false;
    };
  }, []);

  const handleOptionSelect = (OptionId) => {
    try {
      quizzes[currentQuestion].Options?.map((Option, index) => {
        if (OptionId == index) {
          setSelectedOptions((prev) => ({
            ...prev,
            [currentQuestion + 1]: Option,
          }));
          console.log();
          if (Option == quizzes[currentQuestion].Answer) {
            quizzes[currentQuestion].isCorrect = true;
            console.log(quizzes[currentQuestion].isCorrect);
          } else {
            quizzes[currentQuestion].isCorrect = false;
            console.log(quizzes[currentQuestion].isCorrect);
          }
        }
      });
      setisAnswered(true);
    } catch (e) {
      Alert("Something went wrong");
    }
  };
  const handleNextQuestion = () => {
    if (currentQuestion < quizzes.length - 1) {
      setCurrentQuestion((prevQue) => {
        const nextQue = prevQue + 1;
        console.log(nextQue);
        return nextQue;
      });
    } else {
      setCurrentQuestion(currentQuestion);
    }
    setisAnswered(false);
  };
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setCurrentQuestion(currentQuestion);
    }
  };
  const calculateScore = () => {};
  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card
        className="w-[500px] shadow-xl rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
        style={{
          background: "linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)",
        }}
      >
        <div className="p-6">
          {isFetched && quizzes.length > 0 ? (
            <>
              <h2 className="text-4xl font-bold text-white mb-8 leading-tight">
                {quizzes[currentQuestion].Question}
              </h2>
              <div className="space-y-4">
                {quizzes[currentQuestion].Options.map((option, index) => (
                  <Button
                    key={index}
                    className="w-full h-14 text-center text-black"
                    onClick={() => handleOptionSelect(index)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            /* From Uiverse.io by Javierrocadev */
            /* From Uiverse.io by clarencedion */
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="relative w-32 h-32">
                  <div
                    className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-[#0ff] border-b-[#0ff] animate-spin"
                    style={{animationDuration: "3s"}}
                  ></div>

                  <div
                    className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-[#0ff] animate-spin"
                    style={{animationDuration: "2s", animationDirection: "reverse"}}
                  ></div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-tr from-[#0ff]/10 via-transparent to-[#0ff]/5 animate-pulse rounded-full blur-sm"></div>
              </div>
            </div>
          )}
          <div className="mt-8 flex justify-between items-center">
            <p className="text-red-50 text-l">
              Question {currentQuestion + 1} of {quizzes.length}
            </p>
            <p className="text-white text-l">Time remaining: 30s</p>
          </div>
          {selectedOptions[currentQuestion + 1] ? (
            <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/30">
              <p className="text-white text-md font-medium">Your answer:</p>
              <div className="mt-2 p-3 bg-white/30 rounded-md">
                <p className="text-white font-bold">
                  {selectedOptions[currentQuestion + 1]}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/30 hidden">
              <p className="text-white text-md font-medium">Your answer:</p>
              <div className="mt-2 p-3 bg-white/30 rounded-md">
                <p className="text-white font-bold">
                  {selectedOptions[currentQuestion + 1]}
                </p>
              </div>
            </div>
          )}
          <div className="mt-6 flex justify-between">
            <Button
              className="!rounded-button whitespace-nowrap bg-black/20 text-white hover:bg-white/30"
              disabled={currentQuestion === 0}
              onClick={handlePrevQuestion}
            >
              Previous
            </Button>

            <Button
              className="!rounded-button whitespace-nowrap bg-white text-indigo-600 hover:bg-white/90"
              onClick={handleNextQuestion}
              disabled={currentQuestion === quizzes.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default QuizCard;
