import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: "This is feedback item 1",
      rating: 10,
    },
    {
      id: 2,
      text: "This is feedback item 2",
      rating: 9,
    },
    {
      id: 3,
      text: "This is feedback item 3",
      rating: 8,
    },
  ]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const response = await fetch("http://localhost:5000/feedback");

    const data = await response.json();

    setFeedback(data);
    setIsLoading(false);
  };

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
    feedback.filter((item) => item.id !== id);
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
