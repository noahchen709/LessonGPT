import { useState } from 'react';
import { Button } from '@/components/ui/button';

const steps = [
  {
    "id": 1,
    "question": "What is the primary purpose of a 'Test of Significance' or 'Hypothesis Testing'?",
    "options": [
      "To confirm if a sample mean is exactly equal to the population mean.",
      "To decide if observed data supports a theory about a population parameter or is due to randomness.",
      "To calculate the exact population mean from a sample.",
      "To determine the sample size needed for an experiment."
    ],
    "answer": "To decide if observed data supports a theory about a population parameter or is due to randomness.",
    "explanation": "Hypothesis testing helps us evaluate whether differences observed in a sample are statistically significant (suggesting a real effect) or merely due to random chance."
  },
  {
    "id": 2,
    "question": "In hypothesis testing, what is the 'Null Hypothesis' (H₀) generally assumed to be?",
    "options": [
      "The statement we suspect is actually true.",
      "The statement that is 'on trial' and assumed to be true until proven otherwise.",
      "The conclusion we want to reach.",
      "A statement about the sample statistic."
    ],
    "answer": "The statement that is 'on trial' and assumed to be true until proven otherwise.",
    "explanation": "The null hypothesis (H₀) is the statement being tested, often representing a 'no effect' or 'no difference' scenario, similar to a defendant being presumed innocent until proven guilty."
  },
  {
    "id": 3,
    "question": "If Health Canada wants to test if a new product 'alters' the mean blood pressure (meaning it could increase or decrease it), what type of test would be most appropriate?",
    "options": [
      "One-sided test (Hₐ: μ < μ₀)",
      "One-sided test (Hₐ: μ > μ₀)",
      "Two-sided test (Hₐ: μ ≠ μ₀)",
      "No test is needed as 'alters' is too vague."
    ],
    "answer": "Two-sided test (Hₐ: μ ≠ μ₀)",
    "explanation": "When the concern is that a parameter could change in *either* direction (increase or decrease), a two-sided test is used, as the alternative hypothesis (Hₐ) would state that the parameter is simply 'not equal' to the null value."
  },
  {
    "id": 4,
    "question": "In the tomato example, if the calculated z-statistic is -2, and the test is one-sided (Hₐ: μ < 227g), what is the P-Value, given P(z ≤ -2) = 0.0228?",
    "options": [
      "0.0456",
      "0.0228",
      "-0.0228",
      "1.0000"
    ],
    "answer": "0.0228",
    "explanation": "For a one-sided test where Hₐ specifies 'less than', the P-Value is the probability of observing a z-statistic as extreme or more extreme in that direction. So, P(z ≤ -2) = 0.0228 directly gives the P-Value."
  },
  {
    "id": 5,
    "question": "When making a conclusion in hypothesis testing, if the P-Value is less than the chosen significance level (α), what should be your decision?",
    "options": [
      "Fail to reject the null hypothesis.",
      "Accept the null hypothesis.",
      "Reject the null hypothesis in favor of the alternative hypothesis.",
      "Increase the sample size."
    ],
    "answer": "Reject the null hypothesis in favor of the alternative hypothesis.",
    "explanation": "A P-Value less than α indicates that the observed data is unlikely to have occurred if the null hypothesis were true, thus providing strong evidence to reject H₀ and support Hₐ."
  },
  {
    "id": 6,
    "question": "In the tomato example (two-sided test), if the P-Value is 0.0456 and the chosen significance level (α) is 5% (0.05), what is the correct conclusion?",
    "options": [
      "Fail to reject H₀ because 0.0456 > 0.05.",
      "Reject H₀ because 0.0456 < 0.05.",
      "Accept H₀ because the sample mean is close to the hypothesized mean.",
      "The test is inconclusive."
    ],
    "answer": "Reject H₀ because 0.0456 < 0.05.",
    "explanation": "Since the P-Value (0.0456) is less than the significance level (0.05), we reject the null hypothesis. This means there is statistically significant evidence to suggest the labels are wrong."
  },
  {
    "id": 7,
    "question": "What is the relationship between a two-sided hypothesis test and a confidence interval?",
    "options": [
      "A two-sided test rejects H₀ if and only if the hypothesized value (μ₀) falls within the confidence interval.",
      "A two-sided test rejects H₀ if and only if the hypothesized value (μ₀) falls outside the confidence interval.",
      "Confidence intervals are used for one-sided tests only.",
      "There is no direct relationship between them."
    ],
    "answer": "A two-sided test rejects H₀ if and only if the hypothesized value (μ₀) falls outside the confidence interval.",
    "explanation": "A key theorem states that a level α two-sided hypothesis test rejects a hypothesis H₀: μ = μ₀ exactly when the value μ₀ falls outside the (1-α) confidence interval for μ. This means if μ₀ is plausible given the confidence interval, we don't reject H₀, and vice versa."
  }
]

// Generate content
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyBgZh7NFUiZSkzcOk__8LaQO0Vq8DYbquA" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Tell me a joke",
    config: {
      maxOutputTokens: "100",
    }
  });
  console.log(response.text);
}


export default function LessonPrototype() {
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
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">LessonGPT</h1>
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
      <Button onClick={main}> TEST (look at console)</Button>
    </div>
  );
}
