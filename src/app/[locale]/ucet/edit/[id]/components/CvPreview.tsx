"use client"
import React, { useState } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TemplateModern from './templates/TemplateModern';
import TemplateMinimal from './templates/TemplateMinimal';
import TemplateProfessional from './templates/TemplateProfessional';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface CvPreviewProps {
  cvData: any;
  photoPreview: string | null;
  handleSave: (cvData: any) => void;
  handleValidation: () => boolean; // Validation function
}

const templates = [TemplateModern, TemplateMinimal, TemplateProfessional];

const CvPreview = ({ cvData, photoPreview, handleSave, handleValidation }: CvPreviewProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const SelectedTemplate = templates[selectedTemplate];

  const handleSaveClick = () => {
    const isValid = handleValidation(); // Trigger form validation before saving
    if (isValid) {
      handleSave(cvData); // Save only if the form is valid
    } 
  };

  return (
    <div className="bg-[#2e2f4e] text-white fixed right-0 top-0 bottom-0 w-1/2 z-40 overflow-y-auto shadow-xl flex flex-col">
      {/* Top bar */}
      <div className="pt-6 border-t border-gray-300 gap-10 w-full flex items-center justify-end px-10">
        <button
          type="button"
          onClick={handleSaveClick} // Trigger validation and then save
          className="transition text-white underline py-2 rounded-md text-md cursor-pointer"
        >
          Uložit
        </button>
        <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
          Stáhnout v PDF
        </button>
      </div>

      {/* Render selected template */}
      <div className="flex justify-center p-10">
        <div className="w-full max-w-[700px]">
          <SelectedTemplate cvData={cvData} photoPreview={photoPreview} />
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 pb-8">
        <button
          onClick={() => setSelectedTemplate((prev) => Math.max(prev - 1, 0))}
          disabled={selectedTemplate === 0}
          className="text-white px-3 py-1 rounded-full bg-gray-600 hover:bg-gray-500 disabled:opacity-40"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span className="text-white font-semibold">
          {selectedTemplate + 1} / {templates.length}
        </span>
        <button
          onClick={() => setSelectedTemplate((prev) => Math.min(prev + 1, templates.length - 1))}
          disabled={selectedTemplate === templates.length - 1}
          className="text-white px-3 py-1 rounded-full border border-white hover:bg-gray-500 disabled:opacity-40"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default CvPreview;
