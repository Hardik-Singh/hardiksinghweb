import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LatticeBackground from '../components/LatticeBackground';
import AgentGraph from '../components/AgentGraph';
import TypewriterPrompt from '../components/TypewriterPrompt';
import SignedReceipt from '../components/SignedReceipt';

export default function PlaygroundPage() {
  const [graphDone, setGraphDone] = useState(false);
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const [startSignal, setStartSignal] = useState(0);

  useEffect(() => {
    document.title = 'Playground — Hardik Singh';
    return () => { document.title = 'Hardik Singh'; };
  }, []);

  const handleTypewriterDone = useCallback(() => {
    window.setTimeout(() => {
      setStartSignal((count) => count + 1);
    }, 220);
  }, []);

  const handleGraphComplete = useCallback(() => {
    setGraphDone(true);
  }, []);

  const handleSignedVisible = useCallback(() => {
    setReceiptVisible(true);
  }, []);

  const handleReplay = () => {
    setGraphDone(false);
    setReceiptVisible(false);
    setStartSignal(0);
    setRunKey((k) => k + 1);
  };

  return (
    <div className="App">
      <LatticeBackground />
      <Navbar />
      <div className="playground-page">
        <div className="container">
          <div className="playground-header">
            <span className="section-label">Playground</span>
            <h1 className="section-heading" style={{ marginBottom: 12 }}>DCA Model</h1>
            <p className="contrast-caption">
              Flat trace: sequential log lines → Execution graph: dependency-aware rollout
            </p>
            <p className="contrast-caption" style={{ marginTop: 8 }}>
              Prompt types first. Traversal starts after. Click any node to inspect lineage and signatures.
            </p>
          </div>

          <div className="typewriter-container">
            <TypewriterPrompt
              key={`tw-${runKey}`}
              text="Take care of my emails and TODOs."
              onComplete={handleTypewriterDone}
            />
          </div>

          <div className="agent-graph-container">
            <AgentGraph
              key={`ag-${runKey}`}
              startSignal={startSignal}
              onComplete={handleGraphComplete}
              onSignedVisible={handleSignedVisible}
            />
          </div>

          {/* Replay button */}
          {graphDone && (
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <button className="replay-btn" onClick={handleReplay}>
                Retry Demo
              </button>
            </div>
          )}

          <div className="playground-bottom-row">
            <SignedReceipt visible={receiptVisible} />

            <div className="playground-legend">
              <div className="legend-title">Legend</div>
              <div className="legend-items">
                <span className="legend-item">
                  <span className="legend-circle legend-hot" />
                  Active traversal
                </span>
                <span className="legend-item">
                  <span className="legend-circle legend-available" />
                  Available (not traversed)
                </span>
                <span className="legend-item">
                  <span className="legend-diamond" />
                  Approval required
                </span>
                <span className="legend-item">
                  <span className="legend-circle legend-signed" />
                  Signed (Ed25519)
                </span>
                <span className="legend-item">
                  <span className="legend-capsule">ctx</span>
                  Scoped context
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
