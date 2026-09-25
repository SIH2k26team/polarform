// Status and Tag Badges
import React from 'react';
import { Icon } from './Icon';

export const StatusBadge = ({ status, className = "" }) => {
  switch (status) {
    case 'Published':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Published
        </span>
      );
    case 'Under Review':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          Under Review
        </span>
      );
    case 'Changes Requested':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          Changes Requested
        </span>
      );
    case 'Draft':
    default:
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          Draft (AI-Suggested)
        </span>
      );
  }
};

export const ContentTypeBadge = ({ type, className = "" }) => {
  switch (type) {
    case 'Dataset':
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 ${className}`}>
          <Icon name="database" size={12} />
          Dataset
        </span>
      );
    case 'Report':
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 ${className}`}>
          <Icon name="file-text" size={12} />
          Report
        </span>
      );
    case 'Photo':
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200 ${className}`}>
          <Icon name="image" size={12} />
          Photo
        </span>
      );
    case 'Video':
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200 ${className}`}>
          <Icon name="video" size={12} />
          Video
        </span>
      );
    case 'Explainer':
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200 ${className}`}>
          <Icon name="book-open" size={12} />
          Student Explainer
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 ${className}`}>
          <Icon name="file" size={12} />
          {type || 'Record'}
        </span>
      );
  }
};

export const RegionBadge = ({ region, className = "" }) => {
  let color = "bg-sky-50 text-sky-700 border-sky-200";
  if (region === 'Arctic') color = "bg-cyan-50 text-cyan-700 border-cyan-200";
  if (region === 'Himalayas') color = "bg-amber-50 text-amber-800 border-amber-200";
  if (region === 'Southern Ocean') color = "bg-teal-50 text-teal-700 border-teal-200";

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium border ${color} ${className}`}>
      <Icon name="map-pin" size={12} />
      {region}
    </span>
  );
};
