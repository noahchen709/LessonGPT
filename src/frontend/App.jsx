import { useState } from 'react';
import FileDropUpload from './components/FileDropUpload';
import InteractiveLesson from './components/InteractiveLesson';

export default function App() {
  const [quizSteps, setQuizSteps] = useState(null);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">LessonGPT</h1>
      <div className="p-4">
        {!quizSteps ? (
          <FileDropUpload onSuccess={setQuizSteps} />
        ) : (
          <InteractiveLesson steps={quizSteps} />
        )}
      </div>
    </div>
  );
}
