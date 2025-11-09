import React from 'react';
import type { Patient } from '../types';

const UserGroupIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-1.023.995-2.128 1.285-3.257m-11.23 4.242c.370-1.01.74-2.023 1.125-3.036m-1.125 3.036a9.094 9.094 0 013.741-.479 3 3 0 014.682-2.72M6.75 12.25c0-2.418 1.583-4.49 3.75-5.25m2.25 10.512c-2.167-.76-3.75-2.834-3.75-5.25m0 0V7.5A2.25 2.25 0 0111.25 5.25v1.5c0 .621.504 1.125 1.125 1.125p-3.75 0h.008v.008h-.008v-.008zm0 3.75c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125v-3.75z" />
    </svg>
);

interface PatientManagerProps {
    patients: Patient[];
    selectedPatientId: string | null;
    onSelectPatient: (id: string | null) => void;
    onManagePatients: () => void;
}

const PatientManager: React.FC<PatientManagerProps> = ({ patients, selectedPatientId, onSelectPatient, onManagePatients }) => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <UserGroupIcon className="w-8 h-8 text-teal-600 dark:text-teal-500" />
                    <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300">
                        Gestion des Patients
                    </h2>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <select
                        value={selectedPatientId || ''}
                        onChange={(e) => onSelectPatient(e.target.value || null)}
                        className="w-full flex-grow p-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-slate-700 dark:text-slate-200"
                    >
                        <option value="">-- Sélectionner un patient --</option>
                        {patients.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.name} {p.room ? `(Ch. ${p.room})` : ''}
                            </option>
                        ))}
                    </select>
                    <button 
                        onClick={onManagePatients}
                        className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                        Gérer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientManager;
