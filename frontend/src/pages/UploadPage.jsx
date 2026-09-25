import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { INITIAL_EXPEDITIONS } from '../data/mockData';

export const UploadPage = ({
  currentUser,
  onRecordCreated,
  onNavigate
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [doiInput, setDoiInput] = useState('');
  const [isFetchingDoi, setIsFetchingDoi] = useState(false);
  const [doiSuccessMsg, setDoiSuccessMsg] = useState('');

  // Form Fields
  const [title, setTitle] = useState('');
  const [contentType, setContentType] = useState('Report');
  const [expeditionId, setExpeditionId] = useState('exp-42-isea');
  const [region, setRegion] = useState('Antarctica');
  const [location, setLocation] = useState('Bharati Station, Princess Elizabeth Land');
  const [tags, setTags] = useState('Ice Core, Glaciology, Paleoclimate, NCPOR');
  const [description, setDescription] = useState('');
  const [abstract, setAbstract] = useState('');
  const [doi, setDoi] = useState('');
  const [npdcId, setNpdcId] = useState('');

  const expeditions = INITIAL_EXPEDITIONS;

  const handleExpeditionChange = (e) => {
    const expId = e.target.value;
    setExpeditionId(expId);
    const exp = expeditions.find(x => x.id === expId);
    if (exp) {
      setRegion(exp.region);
      setLocation(exp.station);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelected = (file) => {
    setSelectedFile(file);
    // Auto populate sample details if empty
    if (!title) {
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      setTitle(`Expedition Report: ${cleanName.replace(/[-_]/g, ' ')}`);
    }
    if (!description) {
      setDescription(`Scientific analysis and observational documentation collected during the expedition. File uploaded: ${file.name}`);
    }
  };

  // Crossref Real/Mock Metadata Lookup Demo
  const handleEnrichFromCrossref = async () => {
    const testDoi = doiInput.trim() || '10.1016/j.polar.2023.100987';
    setIsFetchingDoi(true);
    setDoiSuccessMsg('');

    try {
      // Fetch from official Crossref REST API (Public, no auth needed)
      const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(testDoi)}`, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        const item = data.message;
        if (item) {
          setTitle(item.title ? item.title[0] : title);
          setDoi(testDoi);
          if (item.abstract) {
            setAbstract(item.abstract.replace(/<[^>]*>?/gm, ''));
          } else {
            setAbstract(`Published in ${item['container-title'] ? item['container-title'][0] : 'Polar Research Journal'} (${item.issued?.['date-parts']?.[0]?.[0] || '2023'}). Verified via Crossref API.`);
          }
          if (item.author && item.author.length > 0) {
            const authorNames = item.author.map(a => `${a.given || ''} ${a.family || ''}`).join(', ');
            setDescription(`Authors: ${authorNames}. Published work retrieved from Crossref metadata.`);
          }
          setDoiSuccessMsg(`✓ Successfully auto-filled citation metadata from Crossref (DOI: ${testDoi})`);
        }
      } else {
        // Fallback demo enrichment
        useDemoDoiEnrichment(testDoi);
      }
    } catch (err) {
      // Fallback in case of offline/CORS
      useDemoDoiEnrichment(testDoi);
    } finally {
      setIsFetchingDoi(false);
    }
  };

  const useDemoDoiEnrichment = (testDoi) => {
    setTitle("High-Resolution Ice Core Paleoclimate Records from East Antarctica");
    setDoi(testDoi);
    setAbstract("A 102m shallow ice core drill retrieved from Princess Elizabeth Land provides proxy atmospheric records of stable isotopes and Southern Annular Mode dynamics.");
    setDescription("Published in Journal of Polar Glaciology. Peer-reviewed external publication linked to 42nd Indian Antarctic Expedition.");
    setTags("Ice Core, Isotopes, Paleoclimate, Crossref Verified, 42nd ISEA");
    setDoiSuccessMsg(`✓ Auto-filled polar publication metadata (DOI: ${testDoi})`);
  };

  const handleFillSample = () => {
    setTitle("Indian Antarctic Expedition 2023: Aerosol & Snow Chemistry Baseline");
    setContentType("Report");
    setExpeditionId("exp-42-isea");
    setRegion("Antarctica");
    setLocation("Bharati Station (Larsemann Hills)");
    setTags("Aerosols, Snow Chemistry, Bharati Station, 42nd ISEA, NCPOR");
    setDescription("Technical investigation into seasonal aerosol optical depth (AOD) and atmospheric particulate deposition on pristine snow layers around Larsemann Hills.");
    setAbstract("Aerosol sampling was performed using multi-stage cascade impactors. Findings indicate low background concentrations with transient maritime sea-spray intrusions.");
    setNpdcId("NPDC-CHEM-2023-088");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide a title for the record.");
      return;
    }

    setIsProcessing(true);

    // Simulate PDF Text Extraction & AI Suggestion Draft Generation
    setTimeout(() => {
      const newRecordId = `rec-${Date.now().toString().slice(-4)}`;
      const newRecord = {
        id: newRecordId,
        title: title.trim(),
        contentType: contentType,
        expeditionId: expeditionId,
        expeditionName: expeditions.find(e => e.id === expeditionId)?.name || "Indian Antarctic Expedition",
        region: region,
        location: location,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        publishedDate: null,
        authorId: currentUser.id || "sci-1",
        authorName: currentUser.name,
        institution: currentUser.designation?.split(',')[1]?.trim() || "NCPOR, MoES",
        status: "Under Review", // Mandatory Human Review Gate
        doi: doi.trim() || null,
        npdcDatasetId: npdcId.trim() || null,
        isMock: true,
        thumbnail: contentType === 'Photo'
          ? "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=800&q=80"
          : contentType === 'Video'
          ? "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
          : "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80",
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        description: description.trim() || "Uploaded scientific report document.",
        abstract: abstract.trim() || description.trim(),
        linkedPhotosCount: 3,
        linkedDatasetsCount: 1,
        linkedReportsCount: 1,
        linkedVideosCount: 0,
        linkedScientistsCount: 2,

        // AI Generated Draft Suggestions (Advisory draft, awaits human approval)
        aiDraft: {
          generatedAt: new Date().toISOString(),
          model: "PolarAI-Assist v1.2 (Advisory)",
          reviewedBy: null,
          reviewDate: null,
          reviewNotes: "Draft automatically generated from uploaded document. Reviewer authorization required before publication.",
          summary: `Summary of ${title}: This study investigates environmental observations in ${region} (${location}), documenting key scientific parameters collected during the ${expeditions.find(e => e.id === expeditionId)?.shortName || 'expedition'}.`,
          studentExplainer: {
            title: `Understanding ${title.split(':')[0] || title}`,
            intro: `Why are Indian scientists studying ${region}? Here is what makes this research vital for our planet.`,
            bodyText: `Researchers at ${location} analyzed observational data to see how polar conditions are changing over time. By looking closely at tiny changes in the atmosphere and ice, scientists can learn how global weather systems connect with the Indian monsoon.`,
            keyTakeaways: [
              `This research was conducted during the ${expeditions.find(e => e.id === expeditionId)?.name || 'Indian expedition'}.`,
              `Field experiments help monitor long-term climate stability in ${region}.`,
              `Understanding polar environments provides early warnings for global climate change.`
            ],
            glossary: [
              { term: "Observation", definition: "Careful monitoring and recording of scientific data over time." },
              { term: "Polar Science", definition: "The study of Earth's freezing Arctic, Antarctic, and high mountain environments." }
            ]
          },
          socialCaption: {
            hook: `❄️ New polar research update from ${location}!`,
            body: `${title}. Indian scientists continue vital monitoring in the ${region} to better understand global climate patterns.`,
            hashtags: [`#PolarScience`, `#${region.replace(/\s+/g, '')}`, `#NCPOR`, `#MoES`, `#IndiaInAntarctica`],
            altText: `Scientific field measurements taken at ${location} during the ${expeditions.find(e => e.id === expeditionId)?.shortName || 'expedition'}.`
          }
        }
      };

      setIsProcessing(false);
      onRecordCreated(newRecord);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header matching Reference UI */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Upload New Record
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Add scientific reports, datasets, field photos, or videos to the unified knowledge graph
        </p>
      </div>

      {/* Safety Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3.5 flex items-start gap-3 text-xs text-amber-900">
        <div className="p-1 rounded-full bg-amber-100 text-amber-700 shrink-0 mt-0.5">
          <Icon name="shield-check" size={16} />
        </div>
        <div className="space-y-0.5">
          <span className="font-bold">Human Review Gate Activated</span>
          <p className="text-amber-800 text-[11px] leading-relaxed">
            Uploaded records are parsed by AI to generate suggested tags, student summaries, and social captions. 
            <strong> The AI output remains a private draft</strong> until verified and approved by a designated reviewer.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
        {/* Drag and Drop Zone matching Reference Screenshot */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleFileDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
            isDragging
              ? 'border-blue-500 bg-blue-50/50'
              : selectedFile
              ? 'border-emerald-400 bg-emerald-50/30'
              : 'border-slate-300 hover:border-blue-400 bg-slate-50/50'
          }`}
          onClick={() => document.getElementById('file-input').click()}
        >
          <input
            id="file-input"
            type="file"
            className="hidden"
            onChange={(e) => e.target.files && handleFileSelected(e.target.files[0])}
            accept=".pdf,.jpg,.jpeg,.png,.mp4,.csv,.nc"
          />
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3">
            <Icon name="upload" size={24} />
          </div>
          {selectedFile ? (
            <div className="space-y-1">
              <p className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5">
                <Icon name="check" size={16} /> File Selected: {selectedFile.name}
              </p>
              <p className="text-[11px] text-slate-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for text extraction & AI drafting
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-800">
                Drag and drop files here, or <span className="text-blue-600 underline">click to upload</span>
              </p>
              <p className="text-xs text-slate-400">
                Supports Images, PDFs, Videos, Datasets (max 50MB)
              </p>
            </div>
          )}
        </div>

        {/* Demo Helper Button */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-500 font-medium">Record Metadata Form</span>
          <button
            type="button"
            onClick={handleFillSample}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded"
          >
            <Icon name="sparkles" size={13} /> Auto-fill sample Antarctica report
          </button>
        </div>

        {/* Form Inputs Grid matching Reference UI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-xs font-bold text-slate-700">
              Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Indian Antarctic Expedition 2022: Ice Core Study"
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Content Type */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Content Type <span className="text-rose-500">*</span>
            </label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            >
              <option value="Report">Report (PDF / Document)</option>
              <option value="Dataset">Dataset (NPDC Link / CSV)</option>
              <option value="Photo">Photo / Image Collection</option>
              <option value="Video">Video / Audio Log</option>
              <option value="Explainer">Student Explainer</option>
            </select>
          </div>

          {/* Expedition */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Expedition Anchor <span className="text-rose-500">*</span>
            </label>
            <select
              value={expeditionId}
              onChange={handleExpeditionChange}
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            >
              {expeditions.map((exp) => (
                <option key={exp.id} value={exp.id}>
                  {exp.name}
                </option>
              ))}
            </select>
          </div>

          {/* Region & Location */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Region
            </label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Station / Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Bharati Station, Ny-Ålesund"
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Tags */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-xs font-bold text-slate-700">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Enter tags (comma separated): e.g. Ice Core, Glaciology, Antarctica"
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-xs font-bold text-slate-700">
              Description / Scientific Summary
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a technical summary of the uploaded record or dataset..."
              className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Optional Crossref DOI / NPDC Link Integration Box */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Icon name="globe" size={14} className="text-blue-600" />
              External Metadata Linkage (Crossref API & NPDC)
            </span>
            <span className="text-[10px] text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
              Optional Enrichment
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600">Publication DOI</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={doiInput}
                  onChange={(e) => setDoiInput(e.target.value)}
                  placeholder="e.g. 10.1016/j.polar.2023.100987"
                  className="flex-1 text-xs p-2 bg-white border border-slate-300 rounded text-slate-800 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleEnrichFromCrossref}
                  disabled={isFetchingDoi}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded text-xs font-medium transition-colors shrink-0 disabled:opacity-50"
                >
                  {isFetchingDoi ? "Fetching..." : "Fetch DOI"}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600">NPDC Dataset Reference ID</label>
              <input
                type="text"
                value={npdcId}
                onChange={(e) => setNpdcId(e.target.value)}
                placeholder="e.g. NPDC-DS-2023-ANT-012"
                className="w-full text-xs p-2 bg-white border border-slate-300 rounded text-slate-800 focus:outline-none"
              />
            </div>
          </div>

          {doiSuccessMsg && (
            <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-200">
              {doiSuccessMsg}
            </p>
          )}
        </div>

        {/* Submit Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Uploader: <strong>{currentUser.name}</strong> ({currentUser.role})
          </div>
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Extracting Text & Generating AI Draft...</span>
              </>
            ) : (
              <>
                <Icon name="sparkles" size={15} />
                <span>Upload & Generate AI Draft</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
