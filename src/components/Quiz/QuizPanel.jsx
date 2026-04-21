import { useState, useEffect } from 'react';
import { brainStructures } from '../../data/brainData';
import './QuizPanel.css';

const QuizPanel = ({ onStructureClick }) => {
  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [stats, setStats] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0
  });
  const [showResults, setShowResults] = useState(false);
  const [quizStructures, setQuizStructures] = useState([]);
  const [clickedStructure, setClickedStructure] = useState(null);

  // Timer effect
  useEffect(() => {
    if (!quizStarted || answered || showResults) return;

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
  }, [quizStarted, answered, showResults]);

  // Setup quiz - tell parent what structures are available to click
  const generateQuestions = () => {
  // Filter based on the difficulty field in brainData.jsx
  let filtered = brainStructures;

  if (difficulty === 'easy') {
    filtered = brainStructures.filter(s => s.difficulty === 'easy');
  } else if (difficulty === 'hard') {
    filtered = brainStructures.filter(s => s.difficulty === 'hard');
  } else if (difficulty === 'medium') {
    filtered = brainStructures.filter(s => s.difficulty === 'medium');
  }


    const shuffled = filtered.sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffled);
    setQuizStructures(shuffled);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setStats({ correct: 0, incorrect: 0, skipped: 0 });
    setAnswered(false);
    setFeedback(null);
    setShowResults(false);
    setTimeRemaining(30);
    setClickedStructure(null);
  };

  // Handle when a structure is clicked on the brain
  const handleQuizStructureClick = (clickedStructure) => {
    console.log('Quiz: Structure clicked -', clickedStructure.name);
    
    // Don't process if quiz not active or already answered
    if (!quizStarted || answered || showResults) {
      console.log('Quiz: Ignoring click - quiz not active or already answered');
      return;
    }

    if (questions.length === 0) {
      console.log('Quiz: No questions loaded');
      return;
    }

    const correctStructure = questions[currentQuestion];
    const isCorrect = clickedStructure.id === correctStructure.id;

    console.log('Quiz: Checking answer -', {
      clicked: clickedStructure.id,
      correct: correctStructure.id,
      isCorrect
    });

    setClickedStructure(clickedStructure);
    setAnswered(true);

    if (isCorrect) {
      setScore(score + 1);
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      setFeedback({
        type: 'correct',
        message: `✅ Correct!`,
        details: `This is the ${correctStructure.name}. ${correctStructure.function}`
      });
    } else {
      setStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      setFeedback({
        type: 'incorrect',
        message: `❌ Incorrect`,
        details: `You clicked: ${clickedStructure.name}. The correct answer is: ${correctStructure.name}`
      });
    }
  };

  // Make quiz aware of parent's structure click
  useEffect(() => {
    if (onStructureClick && quizStarted) {
      onStructureClick(handleQuizStructureClick);
    }
  }, [quizStarted, answered, showResults, questions, currentQuestion, score]);

  const handleSkipQuestion = () => {
    setClickedStructure(null);
    setStats(prev => ({ ...prev, skipped: prev.skipped + 1 }));
    setAnswered(true);
    setFeedback({
      type: 'skipped',
      message: `⏭️ Time's up!`,
      details: `The correct answer was: ${questions[currentQuestion].name}. ${questions[currentQuestion].function}`
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
      setFeedback(null);
      setTimeRemaining(30);
      setClickedStructure(null);
    } else {
      setShowResults(true);
    }
  };

  // Not started - difficulty selection
  if (!quizStarted) {
    return (
      <div className="quiz-panel">
        <div className="quiz-start">
          <h3 className="quiz-panel-title">📝 Brain Quiz</h3>
          <p className="quiz-panel-desc">Test your brain structure knowledge!</p>

          <div className="difficulty-selection">
            <label>Select Difficulty:</label>
            <div className="difficulty-options">
              <button
                className={`difficulty-option ${difficulty === 'easy' ? 'active' : ''}`}
                onClick={() => setDifficulty('easy')}
              >
                🟢 Easy
              </button>
              <button
                className={`difficulty-option ${difficulty === 'medium' ? 'active' : ''}`}
                onClick={() => setDifficulty('medium')}
              >
                🟡 Medium
              </button>
              <button
                className={`difficulty-option ${difficulty === 'hard' ? 'active' : ''}`}
                onClick={() => setDifficulty('hard')}
              >
                🔴 Hard
              </button>
            </div>
          </div>

          <button className="start-quiz-btn" onClick={generateQuestions}>
            Start Quiz
          </button>

          <div className="quiz-info">
            <div>❓ 10 questions</div>
            <div>⏱️ 30 seconds each</div>
            <div>🎯 Click brain to answer</div>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const percentage = Math.round((score / questions.length) * 100);
    let resultEmoji = '🌟';
    if (percentage >= 80) resultEmoji = '🏆';
    else if (percentage >= 60) resultEmoji = '👏';
    else if (percentage >= 40) resultEmoji = '📚';
    else resultEmoji = '💪';

    return (
      <div className="quiz-panel">
        <div className="quiz-results">
          <div className="results-emoji">{resultEmoji}</div>
          <h3 className="results-title">Quiz Complete!</h3>
          
          <div className="score-display">
            <span className="score-num">{score}</span>
            <span className="score-of">/ {questions.length}</span>
          </div>
          <div className="percentage">{percentage}%</div>

          <div className="results-stats">
            <div className="result-stat">
              <span className="stat-emoji">✅</span>
              <span>{stats.correct} Correct</span>
            </div>
            <div className="result-stat">
              <span className="stat-emoji">❌</span>
              <span>{stats.incorrect} Incorrect</span>
            </div>
            <div className="result-stat">
              <span className="stat-emoji">⏭️</span>
              <span>{stats.skipped} Skipped</span>
            </div>
          </div>

          <div className="results-buttons">
            <button className="retry-btn" onClick={() => {
              setQuizStarted(false);
              setShowResults(false);
              setDifficulty('medium');
              setClickedStructure(null);
            }}>
              🔄 Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz in progress
  if (quizStarted && questions.length > 0) {
    const questionData = questions[currentQuestion];

    return (
      <div className="quiz-panel">
        <div className="quiz-progress">
          <div className="progress-header">
            <span className="progress-num">Q{currentQuestion + 1}/{questions.length}</span>
            <span className="progress-score">Score: {score}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="question-box">
          <h4>Identify:</h4>
          <p className="question-name">{questionData.name}</p>
          <p className="question-function">{questionData.function}</p>
        </div>

        <div className={`timer ${timeRemaining < 10 ? 'warning' : ''}`}>
          ⏱️ {timeRemaining}s
        </div>

        <div className="instruction-box">
          <p>👆 Click on the structure in the brain</p>
        </div>

        {clickedStructure && (
          <div className="clicked-structure-box">
            <p className="clicked-label">You clicked:</p>
            <p className="clicked-name">{clickedStructure.name}</p>
          </div>
        )}

        {feedback && (
          <div className={`feedback feedback-${feedback.type}`}>
            <p className="feedback-msg">{feedback.message}</p>
            <p className="feedback-details">{feedback.details}</p>
          </div>
        )}

        {answered && (
          <button className="next-btn" onClick={handleNextQuestion}>
            {currentQuestion + 1 < questions.length ? 'Next →' : 'Results →'}
          </button>
        )}

        {!answered && (
          <button className="skip-btn" onClick={handleSkipQuestion}>
            Skip (⏱️ {timeRemaining}s)
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default QuizPanel;