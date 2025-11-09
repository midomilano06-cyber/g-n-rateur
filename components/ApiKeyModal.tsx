import React, { useState } from 'react';

const SparkleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.47-1.47L12.964 18l1.188-.648a2.25 2.25 0 011.47-1.47L16.25 15l.648 1.188a2.25 2.25 0 011.47 1.47L19.536 18l-1.188.648a2.25 2.25 0 01-1.47 1.47z" />
    </svg>
);
  

interface ApiKeyModalProps {
    onClose: () => void;
    onSave: (key: string) => void;
    currentApiKey?: string | null;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onClose, onSave, currentApiKey }) => {
    const [apiKey, setApiKey] = useState(currentApiKey || '');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!apiKey.trim()) {
            setError('La clé API ne peut pas être vide.');
            return;
        }
        onSave(apiKey);
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-8 border border-slate-200 dark:border-slate-700 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
                <div className="text-center mb-6">
                    <SparkleIcon className="w-12 h-12 text-teal-600 dark:text-teal-500 mx-auto mb-3" />
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Configurer la Clé API Gemini</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        Pour utiliser la génération par IA, veuillez fournir votre clé API Google AI Studio.
                        <br/>
                        La clé est stockée localement dans votre navigateur.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="api-key" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Votre Clé API</label>
                        <input
                            id="api-key"
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                            required
                            autoFocus
                            placeholder="Entrez votre clé API ici..."
                        />
                         <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                            Vous n'avez pas de clé ? 
                            <a 
                                href="https://aistudio.google.com/app/apikey" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-teal-600 dark:text-teal-500 hover:underline font-medium"
                            >
                                 Obtenez-en une gratuitement ici.
                            </a>
                        </p>
                    </div>
                    
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-sm font-medium rounded-md shadow-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400"
                        >
                            Fermer
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                        >
                            Enregistrer la Clé
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApiKeyModal;