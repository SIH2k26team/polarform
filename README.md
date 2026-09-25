PolarSetu

Unified Knowledge, Discovery and Outreach Platform for Indian Polar Science

Smart India Hackathon 2026 — Problem Statement 26063
Theme: Smart Education
Category: Software
Domain: Polar Science / Knowledge Repository / Scientific Outreach

One-line idea: One report, dataset, photo or video uploaded once becomes a searchable scientific record, a student-friendly explainer and an outreach-ready draft — with a human checking AI-generated content before it becomes public.

1. About PolarSetu

PolarSetu is a proposed web platform for connecting Indian polar-science information that is otherwise distributed across reports, publications, datasets, expedition information and media.

The platform is designed as a linking and discovery layer, not as a replacement for specialised systems such as the National Polar Data Centre (NPDC) or an institutional repository.

The central idea is to make one scientific activity — especially an expedition — discoverable as a connected story:

Expedition
   ↓
Scientists / Team
   ↓
Reports / Papers
   ↓
Datasets
   ↓
Photos / Videos
   ↓
Topics / Education Content

PolarSetu combines this connected repository with a controlled AI workflow for summaries, student explanations and outreach content.

Important principle:

AI drafts → Human reviews → Approved content → Public discovery/export

AI is an assistant in the platform. It is not the scientific source of truth and does not directly publish or overwrite verified records.

2. Problem Statement

Polar-science information can exist across multiple systems and channels, each serving a different purpose. A user may therefore need to search several places to understand one expedition or research topic completely.

Main problems

Information is fragmented across datasets, reports, publications, websites and media.

Related resources may not be connected through a common record or identifier.

Scientific content is often technical for students and general audiences.

Finding a report, dataset and media about the same expedition can require separate searches.

Communication teams may need to repeatedly convert technical research into public-facing content.

Review and approval of AI-assisted content needs a traceable human workflow.

Core gap

The problem is not simply the absence of a website. The missing layer is the connection between related resources.

PolarSetu therefore focuses on:

Connecting records

Making cross-type discovery easier

Creating simpler audience-specific content

Keeping AI output under human review

3. Proposed Solution

PolarSetu is organised into three main layers.

Layer 1 — Repository + Linking

Stores one metadata record per resource and connects related resources.

Examples:

Expedition ↔ Scientist

Expedition ↔ Report

Expedition ↔ Dataset

Expedition ↔ Photo / Video

Record ↔ Topic

Paper ↔ Dataset

Layer 2 — AI + Human Review

AI can assist with:

Metadata suggestions

Keywords / tags

Short summaries

Plain-language explanations

Student explainers

Social-media captions

Accessibility text

Every AI output remains a draft until a named human reviews and approves it.

Layer 3 — Discovery + Outreach

Users can:

Search across resource types

Filter results

Open linked records

Read the same record in a student-friendly format

Prepare outreach content

Copy/export approved drafts

4. MVP Scope

The SIH prototype is intentionally limited to the smallest technically credible end-to-end workflow.

MVP workflow

Upload
  ↓
Metadata / Text Extraction
  ↓
AI Suggestions
  ↓
Researcher Confirmation
  ↓
Human Review
  ↓
Approval
  ↓
Linked Searchable Record
  ↓
Student View
  ↓
Outreach Draft / Export

MVP must demonstrate

Resource upload

Basic metadata extraction and editing

Record-to-record linking

Unified keyword + filter search

AI-generated draft content

Human review and approval

Student-friendly view

Outreach export/copy

Basic admin/review dashboard

Audit trail

10–15 labelled demo records

Intentionally outside the MVP

Government / institutional SSO

Aadhaar or eDistrict integration

Full NPDC data migration or bulk API integration

Large OpenSearch cluster

Large-scale vector database

Automatic social-media publishing

Production malware scanning

Full enterprise CMS

Production security/compliance audit

Large production data volumes

These can be considered for Pilot or Production stages.

5. Main Features

5.1 Authentication and Roles

Roles

Role

Main responsibility

Public / Student

Search and read public records

Researcher

Upload and manage submissions

Reviewer

Review records and AI drafts

Admin

Manage users, resources, review queue and audit data

MVP capabilities

Login

Logout

Role-based access control

Protected pages

Named user actions

5.2 Repository

Resources supported by the MVP:

Reports

Research papers

Dataset links

Photos

Videos

Each resource has a metadata record containing fields such as:

Title

Description

Content type

Author / team

Date

Expedition

Location

Topic

Tags / keywords

File or external link

Visibility

Status

Version history should be retained for records where edits are required.

5.3 Metadata Extraction

For supported digital PDFs:

PDF Upload
   ↓
File Validation
   ↓
Text Extraction
   ↓
Basic Metadata / Keyword Detection
   ↓
AI Suggestions (optional)
   ↓
Researcher Confirmation

The system must also support manual correction so that upload does not depend completely on AI availability.

OCR should be treated as an optional extension for scanned documents rather than a mandatory MVP pipeline.

5.4 Knowledge Linking

Knowledge linking is the central product feature.

Each resource should be able to reference related records.

Example:

                    Antarctic Expedition 2022
                       /     |       \
                      /      |        \
                     ↓       ↓         ↓
                Scientists  Report   Dataset
                     |        |         |
                     └────────┼─────────┘
                              ↓
                         Photos / Videos
                              ↓
                          Topic / Theme

When a user opens one record, the interface should surface its related resources.

5.5 Unified Search and Discovery

Search

Global search bar

Keyword search

Search across all supported resource types

Result count

Result cards

Sorting

Related-resource suggestions

Filters

Content type

Expedition

Topic

Location

Date

Example query

Antarctic ice core 2023

The expected result should be able to surface relevant records across types instead of treating each resource as an isolated item.

5.6 Record Details Page

A record page should contain:

Title

Resource type

Expedition

Date

Location

Description / overview

Source information

Main file/link

Related datasets

Related reports/papers

Related photos/videos

Related scientists/team members

Topics/tags

Student View entry point

Outreach entry point where applicable

5.7 AI Drafting Service

The AI layer should be isolated behind an adapter so that the application is not tied directly to a single AI provider.

Draft outputs

Short summary

Keyword / tag suggestions

Plain-language summary

Student explainer

Social-media caption

Website/web copy

Alt text

Hashtags

AI rule

Verified Scientific Record
          │
          ▼
       AI Adapter
          │
          ▼
      AI Draft Only
          │
          ▼
      Human Review
          │
     ┌────┴────┐
     ↓         ↓
  Approve    Reject/Edit

The original scientific record remains unchanged by AI outreach drafting.

5.8 Review and Approval

The review workflow should enforce the human approval principle through application states.

Suggested states

DRAFT
  ↓
PENDING_REVIEW
  ↓
APPROVED
  ↓
PUBLISHED

Alternative path:

PENDING_REVIEW
      ↓
   CHANGES
      ↓
    DRAFT

Reviewer functions

Open source record

Inspect metadata

Inspect AI draft

Edit draft

Approve

Reject / request changes

Add comments

Record reviewer name

Record approval timestamp

Key rule

AI never receives write access to the verified scientific record.

5.9 Student View

The Student View uses the same verified record but presents it in easier language.

Components

Simple title

Plain-language explanation

Key takeaways

Important terms / glossary

Basic expedition context

Related media

Related resources

Example structure:

What was studied?
        ↓
Why is it important?
        ↓
What did scientists observe?
        ↓
What did they learn?
        ↓
Related resources

The Student View should simplify the presentation without creating a second, conflicting source of truth.

5.10 Outreach Studio

From an approved scientific record, the communication team can generate a small content pack.

Outputs

Website copy

Social-media caption

Student-friendly text

Alt text

Hashtags

MVP actions

Edit

Copy text

Export/download

Direct social-media API posting is outside the MVP.

5.11 Admin Dashboard

Dashboard information

Total records

Pending review

Published records

Recent uploads

Recent review activity

Admin controls

Review queue

Resource management

Basic user management

Status management

Public/internal visibility

Audit log

5.12 Audit Log

The audit log should record important actions such as:

User uploaded record
User edited metadata
AI draft generated
Reviewer edited draft
Reviewer approved record
Reviewer rejected record
Record published

Each event should contain, where applicable:

User

Action

Record

Timestamp

This provides traceability for the review process.

6. System Architecture

                         ┌─────────────────────────┐
                         │        USER / WEB        │
                         │ Public / Student        │
                         │ Researcher / Reviewer   │
                         │ Admin                   │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │     React + Tailwind    │
                         │        Frontend         │
                         └────────────┬────────────┘
                                      │ REST API
                                      ▼
                         ┌─────────────────────────┐
                         │     FastAPI + Python    │
                         │ Backend / Business Logic│
                         └───────┬────────┬────────┘
                                 │        │
             ┌───────────────────┘        └──────────────────┐
             ▼                                               ▼
    ┌──────────────────┐                           ┌──────────────────┐
    │    PostgreSQL    │                           │   File Storage   │
    │                  │                           │                  │
    │ Users            │                           │ PDFs             │
    │ Resources        │                           │ Images           │
    │ Relationships    │                           │ Videos           │
    │ Reviews          │                           └──────────────────┘
    │ Audit Logs       │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │   Search Layer   │
    │ PostgreSQL FTS   │
    │      (MVP)       │
    └──────────────────┘

             ┌───────────────────────────────┐
             │         AI Adapter            │
             │  Summaries / Tags / Drafts    │
             └──────────────┬────────────────┘
                            │
                            ▼
                    ┌─────────────────┐
                    │ AI / NLP Service │
                    └────────┬────────┘
                             │
                             ▼
                      Draft Output Only
                             │
                             ▼
                    ┌─────────────────┐
                    │  Human Review   │
                    └────────┬────────┘
                             ▼
                     Approved Content

7. Technology Stack

Layer

Technology

MVP purpose

Frontend

React

User interface

Styling

Tailwind CSS

Layout and styling

Backend

FastAPI + Python

REST API and business logic

Database

PostgreSQL

Metadata and relationships

Search

PostgreSQL Full-Text Search

MVP discovery

AI

LLM through an adapter

Summaries and draft content

NLP

Lightweight/classic NLP

Keyword extraction

PDF processing

PDF text extraction library

Extract text from digital PDFs

OCR

Optional

Scanned documents if required

File storage

Local disk

Prototype/demo media

Authentication

JWT + roles

MVP access control

Maps

Leaflet + OpenStreetMap

Optional/pilot map feature

External metadata

Crossref API

Publication metadata proof-of-concept

Deployment

Docker Compose

Repeatable local/demo deployment

Pilot / Production extensions

OpenSearch for larger-scale search

pgvector or small vector index for semantic related-item search

S3-compatible object storage / MinIO

Institutional/government SSO

Government-approved hosting

Formal security/compliance review

8. Suggested Data Model

User

id
name
email
password_hash
role
status
created_at

Resource

id
title
description
resource_type
file_url / external_url
author
publication_date
location
expedition_id
visibility
status
created_by
created_at
updated_at

Expedition

id
name
description
region
start_date
end_date
location
lead_institution

Person / Scientist

id
name
institution
role

Topic

id
name
description

Relationship

id
source_resource_id
target_resource_id
relationship_type
created_by
created_at

AI Draft

id
resource_id
draft_type
content
model/provider
status
created_by_system
created_at
updated_at

Review

id
resource_id
draft_id
reviewer_id
status
comments
reviewed_at

Audit Log

id
user_id
action
resource_id
details
timestamp

9. Recommended Frontend Pages

Public pages

Home / Landing

Explore / Search

Search Results

Record Details

Student View

About

Researcher pages

Login

Researcher Dashboard

Upload Record

Metadata Confirmation

My Uploads

Reviewer pages

Review Queue

AI Draft Review

Admin pages

Admin Dashboard

User / Resource Management

Audit Log

Communication page

Outreach Studio / Social Post Preview

The final UI can combine some of these into fewer routes for a simpler student-built prototype.

10. Recommended API Structure

Example REST endpoints for the MVP:

Authentication

POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

Resources

GET    /api/resources
POST   /api/resources
GET    /api/resources/{id}
PUT    /api/resources/{id}
DELETE /api/resources/{id}
POST   /api/resources/{id}/publish

Search

GET /api/search?q=...
GET /api/search?type=...
GET /api/search?expedition=...

Relationships

GET  /api/resources/{id}/related
POST /api/resources/{id}/relationships
DELETE /api/relationships/{id}

AI

POST /api/ai/summary
POST /api/ai/tags
POST /api/ai/student-explainer
POST /api/ai/social-caption
POST /api/ai/outreach-pack

Review

GET  /api/reviews/pending
GET  /api/reviews/{id}
POST /api/reviews/{id}/approve
POST /api/reviews/{id}/reject
POST /api/reviews/{id}/request-changes

Admin / Audit

GET /api/admin/stats
GET /api/admin/users
GET /api/admin/audit-logs

Endpoint names may be adjusted to match the actual implementation.

11. Recommended Project Structure

If the project is implemented as a combined frontend/backend repository, a practical structure is:

polarsetu/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── data/
│   │   └── App.*
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── services/
│   │   │   ├── ai/
│   │   │   ├── metadata/
│   │   │   └── search/
│   │   ├── auth/
│   │   └── main.py
│   ├── uploads/
│   └── requirements.txt
│
├── database/
│   ├── migrations/
│   └── seed/
│
├── docs/
│
├── .env.example
├── docker-compose.yml
└── README.md

Adapt this to the existing project rather than restructuring a working codebase unnecessarily.

12. Environment Variables

Example .env values:

DATABASE_URL=postgresql://user:password@localhost:5432/polarsetu
JWT_SECRET=change-this-in-development
AI_API_KEY=your-api-key
AI_MODEL=your-model
UPLOAD_DIR=./uploads
CROSSREF_API_URL=https://api.crossref.org/works

Do not commit real secrets to Git.

Use .env.example for configuration documentation.

13. Running the Prototype

Option A — Docker Compose

git clone <repository-url>
cd polarsetu
cp .env.example .env
docker compose up --build

Then open the frontend using the local URL printed by the application.

Option B — Frontend and Backend separately

Frontend

cd frontend
npm install
npm run dev

Backend

cd backend
python -m venv .venv

Windows:

.venv\Scripts\activate

Linux/macOS:

source .venv/bin/activate

Install dependencies:

pip install -r requirements.txt

Run FastAPI:

uvicorn app.main:app --reload

The exact commands should be updated to match the final repository configuration.

14. Demo Data Policy

The hackathon prototype should clearly separate:

Real public metadata

For example, selected publication metadata retrieved from the public Crossref API.

Mock / sample records

Reports, expedition examples and demo media that are created or adapted only for demonstrating the workflow.

On-screen labels

Use labels such as:

Sample / Mock Data for Demonstration

or

Demo Media — not claimed as NCPOR-owned

Do not present mock records as an official NCPOR data feed.

15. External Integrations

Crossref

Purpose:

Retrieve publication metadata

DOI

Title

Authors

Journal

Year

This can be used as the real external API proof-of-concept for the prototype.

NPDC

The intended PolarSetu approach is to link to NPDC records, not copy or recreate the specialised dataset management system.

A real institutional/API integration should only be implemented after the required access and link format are confirmed.

OpenStreetMap

Can be used to display expedition coordinates when the map feature is implemented.

Social Media APIs

Direct posting is a future extension. The MVP should export/copy approved content instead.

16. Security and Data Handling

MVP controls

JWT authentication

Role-based permissions

Protected researcher/reviewer/admin actions

Upload type validation

Upload size validation

Public vs internal record state

Named reviewer approval

Audit logging

AI-assisted label on generated content

Production considerations

Before production use, the project would require formal review for applicable government website, security, accessibility, data-sharing and personal-data requirements.

The SIH prototype should not claim production compliance that has not been formally audited.

17. Failure Handling

Invalid or oversized file

Upload → Validation fails → Clear error → Not published

AI service unavailable

Upload → Metadata extraction → Manual editing remains available

AI failure must not make the repository unusable.

Reviewer finds an error

Pending Review → Request Changes → Private Draft → Resubmit

AI creates an incorrect outreach draft

Approved Record
      ↓
AI Draft
      ↓
Edit / Discard

The original scientific record must remain unchanged.

18. Prototype UI Guidelines

PolarSetu is a student-built SIH MVP, so the interface should communicate the concept clearly without appearing over-engineered.

Visual direction

Clean white/light interface

Blue as the primary visual accent

Simple navigation bar

Clear forms

Standard cards

Simple tables and badges

Moderate spacing

Readable typography

Basic responsive behaviour

Realistic sample content

Minimal animation

Avoid

Excessive gradients

Glassmorphism

Huge animated hero sections

Decorative AI effects

Complex 3D visualisations

Too many dashboard charts

Unnecessary sidebars everywhere

Features unrelated to the problem

The UI should look like a functional prototype created by a capable student team, not a finished commercial SaaS product.

19. Core User Journeys

Journey A — Researcher

Login
 ↓
Upload report / dataset link / media
 ↓
Metadata extraction
 ↓
AI tag + summary suggestions
 ↓
Researcher confirms metadata and links
 ↓
Submit for review
 ↓
Reviewer approval
 ↓
Record becomes searchable

Journey B — Student

Open PolarSetu
 ↓
Search topic
 ↓
View linked records
 ↓
Open expedition / research record
 ↓
Switch to Student View
 ↓
Read simplified explanation
 ↓
Explore related resources

Journey C — Communication Team

Open approved record
 ↓
Generate outreach pack
 ↓
AI drafts web copy + social caption + alt text
 ↓
Human edits
 ↓
Human approves
 ↓
Copy / Export

20. Recommended SIH Demo Flow

The complete demonstration can be kept to approximately 3–5 minutes.

Step 1 — Show the original problem

Demonstrate that an example expedition's report, dataset and media are separate pieces of information.

Step 2 — Upload

Upload a sample report and show metadata extraction.

Step 3 — AI draft

Show generated tags, summary and student-friendly content.

Step 4 — Human review

Open the review page, edit/verify the draft and approve it.

Step 5 — Unified discovery

Search the expedition/topic and show the connected report, dataset and media.

Step 6 — Student View

Switch to the simpler explanation of the same approved record.

Step 7 — Outreach Studio

Generate social/web copy and alt text, show the human edit step and export/copy the result.

Step 8 — Audit

Finish on the dashboard/audit trail showing who approved the content and when.

21. Important Design Principles

1. One source record

Do not create separate competing versions of the scientific source.

2. Link instead of duplicate

PolarSetu should connect to specialised systems where appropriate instead of rebuilding them.

3. AI is advisory

AI produces suggestions and drafts only.

4. Human approval is enforceable

The application state machine must prevent unapproved AI-generated content from being treated as published content.

5. Search should connect resource types

A user should be able to discover the larger story around an expedition.

6. Student content uses the same verified record

Simplification should not become a separate source of truth.

7. Honest demo data

Clearly label mock/sample data and real external metadata.

8. Keep the MVP small

Implement the complete core workflow before adding advanced infrastructure.

22. Future Roadmap

Pilot

Potential additions:

Permissioned real NCPOR sample data

Interactive expedition map

Crossref enrichment at larger scale

Semantic related-item search

pgvector / vector indexing

OpenSearch for larger collections

MinIO/S3-compatible object storage

More detailed analytics

Production

Potential additions:

Government/institutional SSO

Government-approved hosting

Larger institutional catalogue

Formal security review

Accessibility and website compliance audit

Malware scanning

Production object storage

Controlled social-media integrations

Wider institutional interoperability

23. What PolarSetu Is NOT

PolarSetu is not intended to be:

A replacement for NPDC

A replacement for an institutional publication repository

A DOI-issuing system

An AI chatbot placed on top of a website

An automated social-media publisher in the MVP

A government identity platform

A general-purpose CMS

Its central purpose is connection + discovery + human-controlled AI outreach.

24. Success Measures for the Pilot

The proposal avoids inventing baseline performance numbers. Instead, the pilot can measure:

Time from upload to approval/publishing

Number of linked resources per expedition

Number of content formats generated from one approved record

Search-to-find time for a cross-type query

Number/share of AI drafts requiring major edits

Reviewer activity and approval history

Example target behaviour:

One approved source record
        ↓
Report + Dataset + Media linked
        ↓
One search result experience
        ↓
Student explanation
        ↓
Web + Social + Alt-text drafts

25. Project Status

Prototype / SIH MVP

The initial implementation should prioritise the following working loop:

UPLOAD
  → EXTRACT
  → CONNECT
  → AI DRAFT
  → HUMAN REVIEW
  → APPROVE
  → SEARCH
  → STUDENT VIEW
  → OUTREACH EXPORT

Advanced infrastructure should be added only after this core loop works reliably.

26. Reference Basis

The project design and scope are based on the submitted SIH 2026 PolarSetu proposal for Problem Statement 26063 and its accompanying easy-understanding technical guide.

The proposal identifies the smallest technically credible MVP as:

upload → metadata extraction → AI-drafted tags/summary → human approval → linked search → student view → human-approved outreach export.

The proposed technical foundation is:

React + FastAPI + PostgreSQL + an AI service behind an adapter + Docker Compose.

The hackathon prototype is intended to use approximately 10–15 labelled mock/sample records, with a real public Crossref API integration used as an external metadata proof-of-concept.

27. License / Ownership

This repository is a hackathon prototype created for Smart India Hackathon 2026.

Before production deployment, licensing, data ownership, institutional approvals, third-party media rights, API permissions and applicable government requirements should be reviewed by the responsible organisation.

PolarSetu in one picture

                       POLARSETU
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
        REPOSITORY        AI +         DISCOVERY
        + LINKING         REVIEW       + OUTREACH
             │             │             │
             ▼             ▼             ▼
       Connected       Draft only     One search
       scientific      Human check    Student view
       records         required       Export pack
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                    VERIFIED, CONNECTED
                    POLAR SCIENCE CONTENT

PolarSetu = Connect the science → simplify the science → verify the output → make it discoverable.
