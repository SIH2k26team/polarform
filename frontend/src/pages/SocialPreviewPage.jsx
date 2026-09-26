import React, { useState } from 'react';
import { Icon } from '../components/Icon';
import { RegionBadge } from '../components/Badge';

export const SocialPreviewPage = ({
  record,
  allRecords,
  onSelectRecord,
  onOpenRecordDetails,
  onBackToSearch
}) => {
  if (!record) return null;

  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(124);
  const [isLiked, setIsLiked] = useState(false);

  const captionData = record.aiDraft?.socialCaption || {
    hook: `❄️ Discoveries from ${record.location}!`,
    body: `${record.title}. Indian scientists under NCPOR continue pioneering research in polar frontiers.`,
    hashtags: ["#PolarScience", "#Antarctica", "#NCPOR", "#MoES", "#IndiaInAntarctica"],
    altText: `Scientific field activity at ${record.location}.`
  };

  const fullPostText = `${captionData.hook}\n\n${captionData.body}\n\n${captionData.hashtags?.join(' ')}`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(fullPostText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = record.thumbnail;
    link.target = '_blank';
    link.download = `polarsetu-${record.id}.jpg`;
    link.click();
  };

  const handleShareX = () => {
    const tweetText = encodeURIComponent(`${captionData.hook}\n\n${captionData.body.slice(0, 140)}...\n${captionData.hashtags?.slice(0, 3).join(' ')}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const publishedRecords = allRecords.filter(r => r.status === 'Published');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Back button */}
      <button
        onClick={onBackToSearch}
        className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-colors"
      >
        <Icon name="arrow-left" size={14} /> Back to Search / Records
      </button>

      {/* Header matching Reference UI */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-purple-100 text-purple-800 rounded">
              Outreach Studio
            </span>
            <RegionBadge region={record.region} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
            Social Media Post Preview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Turn verified scientific research into accessible, engaging outreach posts.
          </p>
        </div>

        {/* Quick Record Switcher */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-500 font-medium">Record:</label>
          <select
            value={record.id}
            onChange={(e) => {
              const target = allRecords.find(r => r.id === e.target.value);
              if (target) onSelectRecord(target);
            }}
            className="text-xs p-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none"
          >
            {publishedRecords.map(r => (
              <option key={r.id} value={r.id}>
                {r.title.slice(0, 38)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Left Social Mock Post + Right Share/Export Tools matching Reference UI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Cols: Authentic Social Media Post Card */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            {/* Account Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-xs">
                  <Icon name="polar-logo" className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-sm text-slate-900">PolarSetu India</h4>
                    <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">
                      ✓
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">@PolarSetu • Ministry of Earth Sciences</p>
                </div>
              </div>
              <span className="text-xs text-slate-400">Public Outreach</span>
            </div>

            {/* Post Body */}
            <div className="text-xs sm:text-sm text-slate-800 space-y-3 leading-relaxed">
              <p className="font-bold text-blue-900 text-sm">
                {captionData.hook}
              </p>
              <p className="text-slate-700 whitespace-pre-line">
                {captionData.body}
              </p>
              <div className="flex flex-wrap gap-1.5 text-blue-600 font-semibold text-xs pt-1">
                {captionData.hashtags?.map((h, i) => (
                  <span key={i} className="hover:underline cursor-pointer">{h}</span>
                ))}
              </div>
            </div>

            {/* Image Preview Box matching Reference UI */}
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 max-h-96">
              <img
                src={record.thumbnail}
                alt={captionData.altText || record.title}
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Alt text hint */}
            <div className="p-2.5 bg-slate-50 rounded-lg text-[11px] text-slate-500 flex items-center gap-2">
              <span className="font-semibold text-slate-700">Alt text:</span>
              <span className="truncate">{captionData.altText}</span>
            </div>

            {/* Mock Social Interactions matching Reference UI */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <button
                onClick={handleLikeToggle}
                className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-rose-600 font-bold' : 'hover:text-rose-600'
                  }`}
              >
                <Icon name="heart" size={16} />
                <span>{likes}</span>
              </button>

              <div className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer">
                <Icon name="repeat" size={16} />
                <span>38</span>
              </div>

              <div className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-pointer">
                <Icon name="message-circle" size={16} />
                <span>14</span>
              </div>

              <button
                onClick={handleCopyText}
                className="hover:text-slate-800 transition-colors"
                title="Copy share link"
              >
                <Icon name="share" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Download / Share Panel matching Reference Screenshot */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Icon name="share" size={15} className="text-purple-600" />
              Download / Share
            </h3>
            <p className="text-xs text-slate-500">
              Approved ready-to-publish media pack for official MoES/NCPOR communication channels.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={handleDownloadImage}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="download" size={15} />
                Download High-Res Image
              </button>

              <button
                onClick={handleCopyText}
                className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 border ${copied
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
                  }`}
              >
                <Icon name={copied ? 'check' : 'copy'} size={15} />
                {copied ? "Copied Post Text to Clipboard!" : "Copy Post Text"}
              </button>

              <button
                onClick={handleShareX}
                className="w-full py-2.5 px-4 bg-black hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="external-link" size={14} />
                Share on X (Twitter)
              </button>

              <button
                onClick={handleShareFacebook}
                className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="external-link" size={14} />
                Share on Facebook
              </button>

              <button
                onClick={handleShareLinkedIn}
                className="w-full py-2.5 px-4 bg-sky-700 hover:bg-sky-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="external-link" size={14} />
                Share on LinkedIn
              </button>
            </div>

            {/* Human Verification Seal */}
            <div className="pt-3 border-t border-slate-100 flex items-start gap-2.5 text-[11px] text-slate-500">
              <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                <Icon name="shield-check" size={13} />
              </div>
              <p>
                <strong>Human Checked:</strong> Reviewed by {record.aiDraft?.reviewedBy || 'NCPOR Scientific Reviewer'}.
              </p>
            </div>
          </div>

          {/* Link back to original record */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-xs space-y-2">
            <span className="font-bold text-slate-800 block">Source Record</span>
            <p className="text-slate-600 text-[11px] truncate">{record.title}</p>
            <button
              onClick={() => onOpenRecordDetails(record)}
              className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 text-xs"
            >
              View Full Scientific Record <Icon name="chevron-right" size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
