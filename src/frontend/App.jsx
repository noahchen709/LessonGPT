import { useState } from 'react';
// import FileDropUpload from './components/FileDropUpload';
import LessonPrototype from './components/InteractiveLesson';

export default function App() {
  const [quizSteps] = useState(null);

  return (
    <div className="p-4">
        <LessonPrototype steps={quizSteps} />
    </div>
  );
}
