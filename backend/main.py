from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import time
import random

app = FastAPI(
    title="FraudShield AI API",
    description="Backend services for Digital Public Safety Intelligence",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnalysisResult(BaseModel):
    riskScore: int
    threatLevel: str
    reasoning: list[str]
    action: str

@app.get("/")
def read_root():
    return {"status": "online", "message": "FraudShield AI Backend Running"}

@app.post("/api/analyze-evidence", response_model=AnalysisResult)
async def analyze_evidence(
    text: str = Form(None), 
    url: str = Form(None), 
    file: UploadFile = File(None)
):
    """
    Simulates AI analysis for Citizen Fraud Shield module.
    In a real scenario, this would route to LangChain/YOLO/Whisper.
    """
    # Simulate processing delay
    await asyncio.sleep(2.0)
    
    if text:
        return AnalysisResult(
            riskScore=random.randint(70, 99),
            threatLevel="High",
            reasoning=[
                "Text contains urgent payment demands.",
                "Sender is not in verified institutional contacts.",
                "Uses fear tactics common in digital arrest scripts."
            ],
            action="Do not respond. Report the number immediately."
        )
    elif url:
        return AnalysisResult(
            riskScore=random.randint(85, 100),
            threatLevel="Critical",
            reasoning=[
                f"Domain '{url}' registered recently (2 days ago).",
                "Website mimics official government portal (UI similarity 94%).",
                "Payment gateway redirects to untraceable crypto wallet."
            ],
            action="Close the website immediately. Clear browser cache."
        )
    elif file:
        return AnalysisResult(
            riskScore=92,
            threatLevel="Critical",
            reasoning=[
                f"File '{file.filename}' contains forged RBI seal (Confidence: 89%).",
                "Audio transcription detects Inspector impersonation.",
                "Background noise analysis matches known scam call center profile."
            ],
            action="Submit this evidence to the nearest Cyber Cell."
        )
    
    raise HTTPException(status_code=400, detail="No evidence provided.")

@app.get("/api/heatmap-data")
async def get_heatmap_data():
    """
    Returns real-time geospatial data of active fraud networks.
    """
    return {
        "timestamp": time.time(),
        "hotspots": [
            {"id": 1, "name": "Mumbai Cyber Cell", "position": [19.0760, 72.8777], "risk": "High", "cases": 450},
            {"id": 2, "name": "Delhi NCR Fraud Ring", "position": [28.7041, 77.1025], "risk": "Critical", "cases": 820},
            {"id": 3, "name": "Bengaluru Tech Scams", "position": [12.9716, 77.5946], "risk": "Medium", "cases": 310},
            {"id": 4, "name": "Hyderabad Identity Theft", "position": [17.3850, 78.4867], "risk": "High", "cases": 490},
            {"id": 5, "name": "Kolkata Phishing Hub", "position": [22.5726, 88.3639], "risk": "Critical", "cases": 670},
            {"id": 9, "name": "Jamtara Operations", "position": [23.9575, 86.8124], "risk": "Critical", "cases": 1200},
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
