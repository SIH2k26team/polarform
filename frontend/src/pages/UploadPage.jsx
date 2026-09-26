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
    if (!title) {
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      setTitle(`Expedition Report: ${cleanName.replace(/[-_]/g, ' ')}`);
    }
    if (!description) {
      setDescription(`Scientific analysis and observational documentation collected during the expedition. File uploaded: ${file.name}`);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  // Crossref Real/Mock Metadata Lookup
  const handleEnrichFromCrossref = async () => {
    const testDoi = doiInput.trim() || '10.1016/j.polar.2023.100987';
    setIsFetchingDoi(true);
    setDoiSuccessMsg('');

    try {
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
        useDemoDoiEnrichment(testDoi);
      }
    } catch (err) {
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

  const handleClearForm = () => {
    setTitle('');
    setContentType('Report');
    setRegion('Antarctica');
    setLocation('');
    setTags('');
    setDescription('');
    setAbstract('');
    setDoi('');
    setDoiInput('');
    setNpdcId('');
    setSelectedFile(null);
    setDoiSuccessMsg('');
  };

  const handleAddTag = (newTag) => {
    const currentTags = tags.split(',').map(t => t.trim()).filter(Boolean);
    if (!currentTags.includes(newTag)) {
      setTags([...currentTags, newTag].join(', '));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide a title for the record.");
      return;
    }

    setIsProcessing(true);

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
        status: "Under Review",
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
    }, 1000);
  };

  const sampleTags = ["Ice Core", "Glaciology", "Atmosphere", "Biodiversity", "Oceanography", "Himadri", "Bharati", "Maitri"];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <button
            onClick={() => onNavigate('explore')}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 mb-1 font-medium"
          >
            <Icon name="arrow-left" size={13} /> Back to Explore
          </button>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Submit Polar Research Record
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add reports, datasets, photos, or expedition notes to the Indian polar repository
          </p>
        </div>

        {/* Quick Helper Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleFillSample}
            className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-medium border border-blue-200 flex items-center gap-1.5 transition-colors"
          >
            <Icon name="sparkles" size={13} /> Fill Sample Antarctica Data
          </button>
          <button
            type="button"
            onClick={handleClearForm}
            className="text-xs px-3 py-1.5 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg font-medium transition-colors"
          >
            Clear Form
          </button>
        </div>
      </div>



      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: File Upload */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              Upload File or Document
            </h2>
            <span className="text-[11px] text-slate-400">PDF, JPG, PNG, CSV, MP4 (Max 50MB)</span>
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            onClick={() => document.getElementById('file-upload-input').click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${isDragging
              ? 'border-blue-500 bg-blue-50/50'
              : selectedFile
                ? 'border-emerald-400 bg-emerald-50/30'
                : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
              }`}
          >
            <input
              id="file-upload-input"
              type="file"
              className="hidden"
              onChange={(e) => e.target.files && handleFileSelected(e.target.files[0])}
              accept=".pdf,.jpg,.jpeg,.png,.mp4,.csv,.nc"
            />

            {selectedFile ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white rounded-lg border border-emerald-200">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Icon name="file-text" size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-800 truncate max-w-sm">
                      {selectedFile.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Selected for upload
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="text-xs text-rose-600 hover:text-rose-800 font-medium px-2 py-1 hover:bg-rose-50 rounded"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div className="space-y-2 py-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
                  <Icon name="upload" size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">
                    Click to select file or drag & drop here
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Scientific papers, field photos, raw datasets, or expedition reports
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Expedition & Location */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            Expedition & Geographic Anchor
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="space-y-1 md:col-span-3">
              <label className="block text-[11px] font-semibold text-slate-700">
                Expedition <span className="text-rose-500">*</span>
              </label>
              <select
                value={expeditionId}
                onChange={handleExpeditionChange}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {expeditions.map((exp) => (
                  <option key={exp.id} value={exp.id}>
                    {exp.name} ({exp.region})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-slate-700">Region</label>
              <input
                type="text"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                placeholder="e.g. Antarctica, Arctic, Himalayas"
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-700">Station / Field Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bharati Station, Maitri Station, Ny-Ålesund, Himansh"
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Record Details & Metadata */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            Record Details & Scientific Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="space-y-1 md:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-700">
                Title of Record <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Indian Antarctic Expedition 2022: Ice Core Study"
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-slate-700">
                Content Type <span className="text-rose-500">*</span>
              </label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Report">Report (PDF / Technical Paper)</option>
                <option value="Dataset">Dataset (Data Tables / NetCDF)</option>
                <option value="Photo">Photo (Field Image Collection)</option>
                <option value="Video">Video (Expedition Footage)</option>
                <option value="Explainer">Student Explainer</option>
              </select>
            </div>

            <div className="space-y-1 md:col-span-3">
              <label className="block text-[11px] font-semibold text-slate-700">
                Keywords & Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. Ice Core, Glaciology, Paleoclimate, NCPOR"
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-slate-400 font-medium">Quick suggestions:</span>
                {sampleTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddTag(tag)}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded transition-colors"
                  >
                    +{tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1 md:col-span-3">
              <label className="block text-[11px] font-semibold text-slate-700">
                Scientific Description / Abstract
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Summary of methodology, observations, and primary conclusions..."
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Section 4: External Linking (Optional) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              External Metadata & DOI Linking
            </h2>
            <span className="text-[11px] text-slate-400">Optional</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-slate-700">Publication DOI</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={doiInput}
                  onChange={(e) => setDoiInput(e.target.value)}
                  placeholder="e.g. 10.1016/j.polar.2023.100987"
                  className="flex-1 text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleEnrichFromCrossref}
                  disabled={isFetchingDoi}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-medium transition-colors shrink-0 disabled:opacity-50"
                >
                  {isFetchingDoi ? "Fetching..." : "Fetch Metadata"}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-semibold text-slate-700">NPDC Dataset Reference ID</label>
              <input
                type="text"
                value={npdcId}
                onChange={(e) => setNpdcId(e.target.value)}
                placeholder="e.g. NPDC-DS-2023-ANT-012"
                className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {doiSuccessMsg && (
            <p className="text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
              {doiSuccessMsg}
            </p>
          )}
        </div>

        {/* Submit Action Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-slate-100 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-600">
            Submitting as: <strong className="text-slate-800">{currentUser.name}</strong> ({currentUser.role})
          </div>
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Submitting & Preparing Draft...</span>
              </>
            ) : (
              <>
                <Icon name="upload" size={14} />
                <span>Submit Record for Review</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
