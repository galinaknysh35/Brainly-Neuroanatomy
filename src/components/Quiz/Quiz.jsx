import { useState, useEffect } from 'react';
import { brainStructures } from '../../data/brainData';
import './Quiz.css';

const Quiz = ({ onClose }) => {
  // Quiz state
  const [quizActive, setQuizActive] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('medium'); // easy, medium, hard
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0
  });

  // Generate quiz questions
  const generateQuestions = () => {
    // Filter structures based on difficulty
    let filtered = brainStructures;
    
    if (difficulty === 'easy') {
      filtered = brainStructures.filter(s => s.region && s.region.length > 0);
    } else if (difficulty === 'hard') {
      filtered = brainStructures.filter(s => s.function && s.function.length > 50);
    }

    // Shuffle and limit to 10 questions
    const shuffled = filtered.sort(() => Math.random() - 0.5).slice(0, 10);
    setTotalQuestions(shuffled.length);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setStats({ correct: 0, incorrect: 0, skipped: 0 });
  };

  // Timer effect
  useEffect(() => {
    if (!quizStarted || answered) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSkipQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, answered]);

  const handleStructureClick = (clickedStructure) => {
    if (answered) return;

    const correctStructure = brainStructures[currentQuestion];
    const isCorrect = clickedStructure.id === correctStructure.id;

    setAnswered(true);

    if (isCorrect) {
      setScore(score + 1);
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      setFeedback({
        type: 'correct',
        message: `✅ Correct! This is the ${correctStructure.name}`,
        details: correctStructure.function
      });
    } else {
      setStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      setFeedback({
        type: 'incorrect',
        message: `❌ Incorrect! You clicked on ${clickedStructure.name}`,
        correct: `The correct answer was: ${correctStructure.name}`,
        details: correctStructure.function
      });
    }
  };

  const handleSkipQuestion = () => {
    setStats(prev => ({ ...prev, skipped: prev.skipped + 1 }));
    setAnswered(true);
    setFeedback({
      type: 'skipped',
      message: `⏭️ Time's up!`,
      correct: `The answer was: ${brainStructures[currentQuestion].name}`,
      details: brainStructures[currentQuestion].function
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setFeedback(null);
      setTimeRemaining(30);
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    setQuizActive(false);
  };

  // Quiz not started - show difficulty selection
  if (!quizStarted) {
    return (
      <div className="quiz-modal-overlay" onClick={onClose}>
        <div className="quiz-modal" onClick={(e) => e.stopPropagation()}>
          <button className="quiz-close-btn" onClick={onClose}>✕</button>

          <div className="quiz-start-screen">
            <div className="quiz-header">
              <h1 className="quiz-title">🧠 Brain Quiz</h1>
              <p className="quiz-subtitle">Test your knowledge of brain structures</p>
            </div>

            <div className="difficulty-selector">
              <h3>Select Difficulty</h3>
              <div className="difficulty-buttons">
                <button
                  className={`difficulty-btn ${difficulty === 'easy' ? 'active' : ''}`}
                  onClick={() => setDifficulty('easy')}
                >
                  <span className="difficulty-emoji">🟢</span>
                  <span className="difficulty-name">Easy</span>
                  <span className="difficulty-desc">Major structures</span>
                </button>

                <button
                  className={`difficulty-btn ${difficulty === 'medium' ? 'active' : ''}`}
                  onClick={() => setDifficulty('medium')}
                >
                  <span className="difficulty-emoji">🟡</span>
                  <span className="difficulty-name">Medium</span>
                  <span className="difficulty-desc">All structures</span>
                </button>

                <button
                  className={`difficulty-btn ${difficulty === 'hard' ? 'active' : ''}`}
                  onClick={() => setDifficulty('hard')}
                >
                  <span className="difficulty-emoji">🔴</span>
                  <span className="difficulty-name">Hard</span>
                  <span className="difficulty-desc">Deep dive</span>
                </button>
              </div>
            </div>

            <button className="quiz-start-btn" onClick={generateQuestions}>
              Start Quiz
            </button>

            <div className="quiz-info">
              <div className="quiz-info-item">
                <span className="info-emoji">❓</span>
                <span>10 questions</span>
              </div>
              <div className="quiz-info-item">
                <span className="info-emoji">⏱️</span>
                <span>30 seconds per question</span>
              </div>
              <div className="quiz-info-item">
                <span className="info-emoji">🎯</span>
                <span>Click the correct structure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz finished - show results
  if (!quizActive) {
    const percentage = Math.round((score / totalQuestions) * 100);
    let resultEmoji = '🌟';
    let resultMessage = 'Outstanding!';

    if (percentage >= 80) {
      resultEmoji = '🏆';
      resultMessage = 'Excellent work!';
    } else if (percentage >= 60) {
      resultEmoji = '👏';
      resultMessage = 'Good job!';
    } else if (percentage >= 40) {
      resultEmoji = '📚';
      resultMessage = 'Keep learning!';
    } else {
      resultEmoji = '💪';
      resultMessage = 'Practice more!';
    }

    return (
      <div className="quiz-modal-overlay" onClick={onClose}>
        <div className="quiz-modal" onClick={(e) => e.stopPropagation()}>
          <button className="quiz-close-btn" onClick={onClose}>✕</button>

          <div className="quiz-results-screen">
            <div className="results-header">
              <h1 className="results-emoji">{resultEmoji}</h1>
              <h2 className="results-title">Quiz Complete!</h2>
              <p className="results-message">{resultMessage}</p>
            </div>

            <div className="score-card">
              <div className="score-display">
                <span className="score-number">{score}</span>
                <span className="score-total">/ {totalQuestions}</span>
              </div>
              <div className="score-percentage">{percentage}%</div>
            </div>

            <div className="stats-grid">
              <div className="stat-box correct">
                <span className="stat-emoji">✅</span>
                <span className="stat-number">{stats.correct}</span>
                <span className="stat-label">Correct</span>
              </div>
              <div className="stat-box incorrect">
                <span className="stat-emoji">❌</span>
                <span className="stat-number">{stats.incorrect}</span>
                <span className="stat-label">Incorrect</span>
              </div>
              <div className="stat-box skipped">
                <span className="stat-emoji">⏭️</span>
                <span className="stat-number">{stats.skipped}</span>
                <span className="stat-label">Skipped</span>
              </div>
            </div>

            <div className="results-actions">
              <button className="retry-btn" onClick={() => {
                setQuizStarted(false);
                setQuizActive(true);
              }}>
                🔄 Try Again
              </button>
              <button className="close-btn" onClick={onClose}>
                Close Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz in progress - show question
  const questionData = brainStructures[currentQuestion];
  
  return (
    <div className="quiz-modal-overlay" onClick={onClose}>
      <div className="quiz-modal" onClick={(e) => e.stopPropagation()}>
        <button className="quiz-close-btn" onClick={onClose}>✕</button>

        <div className="quiz-screen">
          {/* Header with progress */}
          <div className="quiz-progress-header">
            <div className="progress-info">
              <span className="progress-counter">
                Question {currentQuestion + 1} / {totalQuestions}
              </span>
              <span className="progress-score">Score: {score}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="quiz-question">
            <h2>Identify this structure:</h2>
            <p className="question-text">{questionData.name}</p>
            <p className="question-hint">Function: {questionData.function}</p>
          </div>

          {/* Timer */}
          <div className={`timer ${timeRemaining < 10 ? 'warning' : ''}`}>
            <span className="timer-icon">⏱️</span>
            <span className="timer-value">{timeRemaining}s</span>
          </div>

          {/* Feedback message */}
          {feedback && (
            <div className={`feedback feedback-${feedback.type}`}>
              <p className="feedback-message">{feedback.message}</p>
              {feedback.correct && (
                <p className="feedback-correct">{feedback.correct}</p>
              )}
              <p className="feedback-details">{feedback.details}</p>
            </div>
          )}

          {/* Next button or navigation */}
          {answered && (
            <button className="next-btn" onClick={handleNextQuestion}>
              {currentQuestion + 1 < totalQuestions ? 'Next Question →' : 'See Results →'}
            </button>
          )}

          {!answered && (
            <button className="skip-btn" onClick={handleSkipQuestion}>
              Skip (or wait for timer)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;