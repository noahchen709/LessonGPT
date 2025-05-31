import { useState } from 'react';
import FileDropUpload from './components/FileDropUpload';
import LessonPrototype from './components/InteractiveLesson';

export default function App() {
  const [quizSteps, setQuizSteps] = useState(null);

  return (
    <div className="p-4">
      {!quizSteps ? (
        <FileDropUpload onSuccess={setQuizSteps} />
      ) : (
        <LessonPrototype steps={quizSteps} />
      )}
    </div>
  );
}
