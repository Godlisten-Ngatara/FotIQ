// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { use, useState, useEffect } from "react";
import { Card, Button, message } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "@ant-design/v5-patch-for-react-19";
import { getQuizes } from "../utils/db";
const QuizCard = () => {
  const [quizzes, SetQuizzes] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isAnswered, setisAnswered] = useState(false);
  const [isFetched, setisFetched] = useState(false);
  const [isDisabled, setisdDisabled] = useState(false);
  useEffect(() => {
    let mounted = true;
    const handleQuestionFetch = async () => {
      try {
        const snapShots = await getQuizes();
        const quizData = snapShots.docs.map((doc) => ({
          id: doc.id, selectedAns: selectedOption,
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
          setSelectedOption(Option);
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
    if (currentQuestion < quizzes.length) {
      setCurrentQuestion((prevQue) => {
        const nextQue = prevQue + 1;
        console.log(nextQue);
        return nextQue;
      });
      
      
      if (currentQuestion == quizzes.length - 1) {
        setisdDisabled(true);
      }
    } else {
      setCurrentQuestion(currentQuestion);
    }
    setisAnswered(false)
  };
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setCurrentQuestion(currentQuestion);
    }
  };
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
            <h2 className="text-2xl font-semibold text-white mb-8 leading-tight">
              Loading...
            </h2>
          )}
          <div className="mt-8 flex justify-between items-center">
            <p className="text-red-50 text-l">
              Question {currentQuestion + 1} of 10
            </p>
            <p className="text-white text-l">Time remaining: 30s</p>
          </div>
          {selectedOption && isAnswered && (
            <div className="mt-4 p-4 bg-white/20 rounded-lg border border-white/30">
              <p className="text-white text-md font-medium">Your answer:</p>
              <div className="mt-2 p-3 bg-white/30 rounded-md">
                <p className="text-white font-bold">{selectedOption}</p>
              </div>
            </div>
          )}
          <div className="mt-6 flex justify-between">
            <Button
              className="!rounded-button whitespace-nowrap bg-black/20 text-white hover:bg-white/30"
              disabled={isDisabled}
              onClick={handlePrevQuestion}
            >
              Previous
            </Button>

            <Button
              className="!rounded-button whitespace-nowrap bg-white text-indigo-600 hover:bg-white/90"
              onClick={handleNextQuestion}
              disabled={isDisabled}
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
