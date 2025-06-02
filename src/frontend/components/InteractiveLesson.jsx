import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function LessonPrototype({ steps }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState('');
  const [showResult, setShowResult] = useState(false);

  const current = steps[step];

  const handleNext = () => {
    setShowResult(false);
    setSelected('');
    setStep(prev => prev + 1);
  };

  return (
      <div className="p-4 border rounded shadow bg-white">
        <p className="font-medium mb-2">{current.question}</p>
        {current.options.map(option => (
          <Button
            key={option}
            variant={selected === option ? 'default' : 'outline'}
            className="block my-1 w-full text-left"
            onClick={() => setSelected(option)}
          >
            {option}
          </Button>
        ))}
        {selected && !showResult && (
          <Button className="mt-4" onClick={() => setShowResult(true)}>Check Answer</Button>
        )}
        {showResult && (
          <div className="mt-4">
            {selected === current.answer ? (
              <p className="text-green-600 font-semibold">✅ Correct!</p>
            ) : (
              <p className="text-red-600 font-semibold">❌ Incorrect. Answer: {current.answer}</p>
            )}
            <p className="text-sm mt-1 text-gray-700">{current.explanation}</p>
            {step < steps.length - 1 && (
              <Button className="mt-4" onClick={handleNext}>Next</Button>
            )}
            {step === steps.length - 1 && (
              <p className="mt-4 font-medium">🎉 Lesson Complete!</p>
            )}
          </div>
        )}
      </div>
  );
}
