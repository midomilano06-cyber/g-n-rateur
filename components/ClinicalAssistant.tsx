import React, { useState } from 'react';
import RadioGroup from './RadioGroup';
import type { Option } from '../types';

// Icons
const SparkleIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.47-1.47L12.964 18l1.188-.648a2.25 2.25 0 011.47-1.47L16.25 15l.648 1.188a2.25 2.25 0 011.47 1.47L19.536 18l-1.188.648a2.25 2.25 0 01-1.47 1.47z" />
  </svg>
);

const CopyIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

interface ClinicalAssistantProps {
    question: string;
    onQuestionChange: (value: string) => void;
    complexity: string;
    onComplexityChange: (value: string) => void;
    response: string;
    isLoading: boolean;
    error: string | null;
    onGenerate: () => void;
    complexityOptions: Option[];
}

const ClinicalAssistant: React.FC<ClinicalAssistantProps> = ({
    question,
    onQuestionChange,
    complexity,
    onComplexityChange,
    response,
    isLoading,
    error,
    onGenerate,
    complexityOptions
}) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (response) {
            navigator.clipboard.writeText(response);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="clinical-question" className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Votre question</label>
                <textarea
                    id="clinical-question"
                    rows={3}
                    value={question}
                    onChange={(e) => onQuestionChange(e.target.value)}
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="Ex: Quelle est la différence entre l'hypoglycémie et l'hyperglycémie ?"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Niveau de complexité</label>
                <RadioGroup 
                    name="complexity" 
                    options={complexityOptions} 
                    selectedValue={complexity} 
                    onChange={onComplexityChange} 
                />
            </div>

            <button
                onClick={onGenerate}
                disabled={isLoading || !question.trim()}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 dark:disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            >
                <SparkleIcon className="w-5 h-5" />
                {isLoading ? 'Réflexion en cours...' : 'Générer la Réponse'}
            </button>

            {(response || isLoading || error) && (
                <div className="mt-4">
                    <h3 className="text-md font-semibold text-slate-700 dark:text-slate-300 mb-2">Réponse de l'Assistant</h3>
                    {isLoading && <p className="text-slate-500 dark:text-slate-400 animate-pulse">L'assistant génère une réponse...</p>}
                    {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3" role="alert"><p>{error}</p></div>}
                    {response && !isLoading && (
                         <div className="relative">
                            <div className="prose prose-sm dark:prose-invert max-w-none bg-slate-50 dark:bg-slate-800/50 p-3 rounded-md whitespace-pre-wrap text-slate-700 dark:text-slate-300">
                                {response}
                            </div>
                            <button
                                onClick={handleCopy}
                                title={isCopied ? "Copié !" : "Copier la réponse"}
                                className="absolute top-2 right-2 p-1.5 rounded-md bg-white/50 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                <CopyIcon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ClinicalAssistant;