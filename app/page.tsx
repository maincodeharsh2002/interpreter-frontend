"use client"

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression: input })
      });

      const data = await response.json() as { result: string, error?: string };
      if (response.ok) {
        setResult(data.result);
        setError('');
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid w-1/2 gap-2">
        <Textarea placeholder="Type your message here." value={input} onChange={handleInputChange} />
        <Button onClick={handleSubmit}>Send message</Button>
        {result && <div className="mt-4 p-4 bg-green-100 text-green-800">{result}</div>}
        {error && <div className="mt-4 p-4 bg-red-100 text-red-800">{error}</div>}
      </div>
    </div>
  );
}
