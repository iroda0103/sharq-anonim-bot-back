// server.js - Updated with Telegram data tracking
const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage (production: use MongoDB/PostgreSQL)
const feedbacks = [];
const polls = [
  {
    id: '1',
    category: 'darslar',
    question: 'Darslar sifati qanday?',
    type: 'rating',
    options: ['1', '2', '3', '4', '5'],
    responses: []
  },
  {
    id: '2',
    category: 'takliflar',
    question: 'Universitetda qanday yangiliklar bo\'lishini istaysiz?',
    type: 'multiple',
    options: ['Yangi laboratoriyalar', 'Ko\'proq sport majmualar', 'Kutubxona kengaytirish', 'Online darslar'],
    responses: []
  }
];

const categories = [
  { id: 'takliflar', name: 'Takliflar', icon: '💡', description: 'Yangi g\'oyalar va takliflar' },
  { id: 'shikoyatlar', name: 'Shikoyatlar', icon: '⚠️', description: 'Muammolar va kamchiliklar' },
  { id: 'darslar', name: 'Darslar', icon: '📚', description: 'O\'quv jarayoni haqida' },
  { id: 'infratuzilma', name: 'Infratuzilma', icon: '🏢', description: 'Bino va jihozlar' },
  { id: 'boshqa', name: 'Boshqa', icon: '💬', description: 'Qolgan barcha fikrlar' }
];

// Generate anonymous ID
const generateAnonymousId = () => crypto.randomBytes(8).toString('hex');

// Get categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

// Get polls by category
app.get('/api/polls/:category', (req, res) => {
  const categoryPolls = polls.filter(p => p.category === req.params.category);
  res.json(categoryPolls);
});

// Submit feedback (WITH TELEGRAM DATA)
app.post('/api/feedback', (req, res) => {
  const { 
    category, 
    message, 
    telegramId,           // Telegram user ID
    telegramUsername,     // Telegram username
    telegramFirstName,    // First name
    telegramLastName,     // Last name
    pollAnswers           // Poll responses
  } = req.body;
  
  if (!category || !message) {
    return res.status(400).json({ error: 'Category va message talab qilinadi' });
  }

  if (!telegramId) {
    return res.status(400).json({ error: 'Telegram ma\'lumotlari topilmadi' });
  }

  const feedback = {
    id: generateAnonymousId(),
    category,
    message,
    // Telegram data (for admin only, not shown publicly)
    telegram: {
      userId: telegramId,
      username: telegramUsername,
      firstName: telegramFirstName,
      lastName: telegramLastName,
      fullName: `${telegramFirstName} ${telegramLastName || ''}`.trim()
    },
    pollAnswers: pollAnswers || {},
    timestamp: new Date().toISOString(),
    anonymousId: generateAnonymousId().substring(0, 8) // For public display
  };

  feedbacks.push(feedback);
  
  console.log('New feedback from:', feedback.telegram.fullName, `(@${feedback.telegram.username})`);
  
  res.json({ 
    success: true, 
    message: 'Fikringiz qabul qilindi!',
    feedbackId: feedback.id
  });
});

// Submit poll response
app.post('/api/polls/:pollId/respond', (req, res) => {
  const { pollId } = req.params;
  const { answer } = req.body;

  const poll = polls.find(p => p.id === pollId);
  if (!poll) {
    return res.status(404).json({ error: 'So\'rovnoma topilmadi' });
  }

  poll.responses.push({
    answer,
    timestamp: new Date().toISOString()
  });

  res.json({ success: true });
});

// Get statistics
app.get('/api/stats', (req, res) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const totalFeedbacks = feedbacks.length;
  const todayFeedbacks = feedbacks.filter(f => new Date(f.timestamp) >= today).length;
  const weeklyFeedbacks = feedbacks.filter(f => new Date(f.timestamp) >= weekAgo).length;

  const categoryCounts = {};
  feedbacks.forEach(f => {
    categoryCounts[f.category] = (categoryCounts[f.category] || 0) + 1;
  });

  const topCategory = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])[0];

  const categoryName = topCategory 
    ? categories.find(c => c.id === topCategory[0])?.name || 'Noma\'lum'
    : 'Ma\'lumot yo\'q';

  res.json({
    totalFeedbacks,
    todayFeedbacks,
    weeklyFeedbacks,
    topCategory: categoryName,
    categoryBreakdown: categoryCounts
  });
});

// ==================== ADMIN ENDPOINTS ====================

// Get all feedbacks (with Telegram data for admin)
app.get('/api/admin/feedbacks', (req, res) => {
  // In production, add authentication middleware here
  const feedbacksWithDetails = feedbacks.map(f => ({
    ...f,
    categoryName: categories.find(c => c.id === f.category)?.name || f.category
  }));
  
  res.json(feedbacksWithDetails);
});

// Get feedbacks by category
app.get('/api/admin/feedbacks/category/:categoryId', (req, res) => {
  const categoryFeedbacks = feedbacks.filter(
    f => f.category === req.params.categoryId
  ).map(f => ({
    ...f,
    categoryName: categories.find(c => c.id === f.category)?.name
  }));
  
  res.json(categoryFeedbacks);
});

// Get recent feedbacks
app.get('/api/admin/feedbacks/recent', (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const recentFeedbacks = feedbacks
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit)
    .map(f => ({
      ...f,
      categoryName: categories.find(c => c.id === f.category)?.name
    }));
    
  res.json(recentFeedbacks);
});

// Get user's feedbacks by Telegram ID
app.get('/api/feedback/user/:telegramId', (req, res) => {
  const userFeedbacks = feedbacks.filter(
    f => f.telegram.userId === parseInt(req.params.telegramId)
  ).map(f => ({
    id: f.id,
    category: f.category,
    categoryName: categories.find(c => c.id === f.category)?.name,
    message: f.message,
    timestamp: f.timestamp,
    anonymousId: f.anonymousId
  }));
  
  res.json(userFeedbacks);
});

// Get poll results
app.get('/api/polls/:pollId/results', (req, res) => {
  const poll = polls.find(p => p.id === req.params.pollId);
  if (!poll) {
    return res.status(404).json({ error: 'So\'rovnoma topilmadi' });
  }

  const results = {};
  poll.responses.forEach(r => {
    const answer = Array.isArray(r.answer) ? r.answer : [r.answer];
    answer.forEach(a => {
      results[a] = (results[a] || 0) + 1;
    });
  });

  res.json({ 
    poll: poll.question, 
    results, 
    total: poll.responses.length 
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    feedbacksCount: feedbacks.length
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server ${PORT} portda ishlamoqda`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/api/admin/feedbacks`);
});