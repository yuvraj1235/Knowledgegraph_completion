# AI Knowledge Graph Platform

An AI-powered educational intelligence platform that transforms academic PDFs into structured Knowledge Graphs using Large Language Models (LLMs). The system extracts Topics and Subtopics from educational material, enables human validation, and prepares semantic educational graphs for personalized learning systems.

---

# Overview

This platform is designed to solve one of the biggest challenges in higher education:

* rigid learning pathways
* lack of curriculum interoperability
* absence of semantic course mapping
* difficulty in personalized learning recommendations

The system automatically analyzes educational PDFs and converts them into structured educational ontologies.

---

# Core Features

## AI-Powered Topic Extraction

* Upload educational PDFs
* Extract structured educational concepts using GPT-4o
* Automatically generate:

  * Topics
  * Subtopics
  * Summaries
  * Descriptions

---

## Human-in-the-Loop Validation

Teachers can:

* review extracted concepts
* edit topics/subtopics
* approve or reject AI-generated content
* validate educational ontology before graph insertion

---

## Knowledge Graph Visualization

Interactive graph-based representation of:

* Topics
* Subtopics
* Semantic relationships
* Educational hierarchies

Built using React Flow.

---

## Scalable AI Architecture

The system is designed to support:

* semantic similarity mapping
* cross-course overlap detection
* personalized learning pathways
* educational recommendation systems

---

# Tech Stack

## Frontend

| Technology         | Purpose                       |
| ------------------ | ----------------------------- |
| React + TypeScript | Frontend framework            |
| Vite               | Development tooling           |
| TailwindCSS        | UI styling                    |
| React Flow         | Knowledge graph visualization |
| Zustand            | Global state management       |
| Axios              | API communication             |
| Framer Motion      | Animations                    |

---

## Backend

| Technology    | Purpose          |
| ------------- | ---------------- |
| FastAPI       | Backend API      |
| OpenAI GPT-4o | Topic extraction |
| PyMuPDF       | PDF parsing      |
| Python        | NLP processing   |
| Pydantic      | Data validation  |

---

## Planned Infrastructure

| Technology          | Purpose           |
| ------------------- | ----------------- |
| Neo4j               | Graph database    |
| Pinecone / pgvector | Vector similarity |
| Redis               | Queueing          |
| Celery              | Background jobs   |
| Docker              | Containerization  |

---

# System Architecture

```text id="8m4i9d"
PDF Upload
    ↓
FastAPI Backend
    ↓
PDF Text Extraction (PyMuPDF)
    ↓
GPT-4o Topic Extraction
    ↓
Structured Educational Ontology
    ↓
Teacher Validation Dashboard
    ↓
Knowledge Graph Generation
    ↓
Semantic Educational Intelligence
```

---

# Project Structure

## Frontend

```text id="fjlwm7"
frontend/
│
├── src/
│   ├── api/
│   ├── components/
│   ├── pages/
│   ├── store/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
```

---

## Backend

```text id="oiv3mf"
backend/
│
├── app/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── utils/
│   ├── config/
│   └── main.py
│
├── uploads/
├── requirements.txt
└── .env
```

---

# Installation

# 1. Clone Repository

```bash id="a9w6g5"
git clone <repository-url>

cd project-folder
```

---

# 2. Frontend Setup

```bash id="k4v0f8"
cd frontend

npm install
```

Run frontend:

```bash id="6ntrcd"
npm run dev
```

Frontend runs on:

```text id="jlwmkr"
http://localhost:5173
```

---

# 3. Backend Setup
```
cd backend

pip install -r requirements.txt
```

Create `.env`:

```env id="b7s1z4"
OPENAI_API_KEY=your_openai_api_key
```

Run backend:

```bash id="d4oxgq"
uvicorn app.main:app --reload
```

Backend runs on:

```text id="o7hbl9"
http://127.0.0.1:8000
```

---

# API Endpoints

## Upload & Extract Topics

### POST `/ingest`

Accepts:

* multipart/form-data
* PDF file upload

### Response

```json id="94s9cg"
{
  "transcript": "Educational content...",
  "extracted_topics": {
    "topics": [
      {
        "title": "Machine Learning",
        "summary": "Introduction to ML systems",
        "subtopics": [
          {
            "title": "Linear Regression",
            "description": "Supervised learning algorithm"
          }
        ]
      }
    ]
  }
}
```

---

# Frontend Features

## Dashboard

* PDF upload
* extraction progress
* transcript display
* extracted topics visualization

---

## Validation System

* editable topic cards
* subtopic editing
* approve/reject actions
* validation analytics

---

## Graph Visualization

Interactive knowledge graph with:

* topic nodes
* subtopic nodes
* graph relationships
* zoom/pan support

---

# UI Design Philosophy

The UI follows a premium AI-native enterprise dashboard aesthetic inspired by:

* Linear
* Vercel
* Notion AI
* Raycast

Design principles:

* minimalism
* clarity
* intelligent spacing
* soft glassmorphism
* dark enterprise interface

---

# Future Roadmap

## Phase 1 — Current MVP

* PDF ingestion
* GPT extraction
* frontend validation
* graph visualization

---

## Phase 2 — Graph Intelligence

* Neo4j integration
* semantic similarity engine
* embeddings search
* automated relationship mapping

---

## Phase 3 — Personalization

* student knowledge modeling
* adaptive learning recommendations
* curriculum overlap analysis
* skill gap detection

---

## Phase 4 — Enterprise Scale

* authentication
* collaborative validation
* realtime processing
* background queues
* analytics pipeline

---

# Planned Knowledge Graph Ontology

```text id="p5tmrq"
Module
 └── Lecture
      └── Session
           └── Topic
                └── SubTopic
```

Additional models:

* Domain Model
* User Model
* Semantic Similarity Model

---

# Example Use Cases

## Universities

* curriculum modernization
* interdisciplinary mapping
* accreditation analytics

---

## Students

* personalized study pathways
* concept overlap analysis
* adaptive learning recommendations

---

## Researchers

* educational ontology generation
* curriculum semantic analysis
* AI-assisted pedagogy systems

---

# Development Goals

This project aims to become:

* an AI-native educational intelligence system
* a semantic curriculum mapping platform
* a knowledge graph powered learning ecosystem

---

# Contributing

Contributions are welcome.

Suggested areas:

* Neo4j integration
* semantic graph algorithms
* recommendation systems
* vector similarity pipelines
* frontend UX improvements

