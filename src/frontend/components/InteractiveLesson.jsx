import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function LessonPrototype({ steps }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState('');
  const [showResult, setShowResult] = useState(false);

  const current = steps[step];
  const progress = Math.round(((step + (showResult ? 1 : 0)) / steps.length) * 100);

  const handleNext = () => {
    setShowResult(false);
    setSelected('');
    setStep(prev => prev + 1);
  };

  return (
    <div className="p-6 max-w-xl mx-auto border rounded-2xl shadow-md bg-white space-y-4">
      <div>
        <Progress value={progress} className="h-2 mb-2" />
      </div>
      <p className="font-semibold text-lg">{current.question}</p>
      <div className="space-y-2">
        {current.options.map(option => (
          <Button
            key={option}
            variant={selected === option ? 'blue' : 'outline'}
            className={`w-full justify-start h-auto border `}
            onClick={() => setSelected(option)}
          >
            <p className="text-left break-words whitespace-normal">{option}</p>
          </Button>
        ))}
      </div>
      {selected && !showResult && (
        <Button variant="blue" className="mt-4 w-full" onClick={() => setShowResult(true)}>Check Answer</Button>
      )}
      {showResult && (
        <div className="mt-4 space-y-2">
          {selected === current.answer ? (
            <p className="text-green-600 font-semibold">✅ Correct!</p>
          ) : (
            <p className="text-red-600 font-semibold">❌ Incorrect. Answer: {current.answer}</p>
          )}
          <p className="text-sm text-gray-700">{current.explanation}</p>
          {step < steps.length - 1 ? (
            <Button variant="blue" className="w-full" onClick={handleNext}>Next</Button>
          ) : (
            <p className="mt-2 font-medium text-center">🎉 Lesson Complete!</p>
          )}
        </div>
      )}
    </div>
  );
}
