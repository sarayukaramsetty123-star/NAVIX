import { config } from '../config/env.js';
import { CAMPUS_LOCATIONS } from '../data/campusData.js';
import { calculateRoute } from './route.service.js';

/**
 * Generates personalized AI navigation advice and student survival guidance
 * @param {string} startId
 * @param {string} destId
 * @param {object} preferences - { avoidStairs, needElevator, isRaining }
 * @returns {Promise<object>} AI generated navigation package
 */
export async function generateAIDirections(startId, destId, preferences = {}) {
  const baseRoute = calculateRoute(startId, destId);
  const start = baseRoute.start;
  const dest = baseRoute.destination;

  // Check if external Gemini API key is configured
  if (config.geminiApiKey) {
    try {
      const externalAIAdvice = await callGeminiAPI(start, dest, baseRoute, preferences);
      if (externalAIAdvice) {
        return {
          source: 'gemini-ai',
          ...baseRoute,
          aiGuidance: externalAIAdvice
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed, using intelligent heuristic fallback:', err.message);
    }
  }

  // Intelligent Built-in Heuristic AI Engine
  const heuristicGuidance = generateHeuristicAdvice(start, dest, baseRoute, preferences);

  return {
    source: 'campus-ai-engine',
    ...baseRoute,
    aiGuidance: heuristicGuidance
  };
}

/**
 * Intelligent heuristic fallback navigation generator
 */
function generateHeuristicAdvice(start, dest, baseRoute, preferences) {
  const tips = [];
  const shortcuts = [];
  const weatherNotes = [];

  // Weather & environmental adjustments
  if (preferences.isRaining) {
    weatherNotes.push('Take the covered bridge connecting Saraswathi Block and Admin Block to avoid rain.');
    weatherNotes.push('Floor tiles near the canteen lobby can get slippery when wet; walk with caution.');
  }

  // Stair / Elevator accessibility
  if (preferences.needElevator || preferences.avoidStairs) {
    if (dest.id === 'titanic-block') {
      shortcuts.push('Use the West Atrium elevator which has direct ramp access from the paved corridor.');
    } else if (dest.id === 'central-library') {
      shortcuts.push('The library elevator is situated right behind the security check-in counter.');
    } else {
      shortcuts.push('All ground-level entrances feature standard access ramps.');
    }
  }

  // Destination-specific intelligence for freshers
  if (dest.id === 'titanic-block') {
    tips.push('If heading to 1st year CSE labs (North wing), entering through the rear portico saves ~1.5 minutes.');
    tips.push('Between lecture periods (10:45 AM and 1:30 PM), avoid the central staircase to skip crowding.');
  } else if (dest.id === 'central-library') {
    tips.push('Make sure your RFID badge is around your neck before approaching the automated entrance gates.');
    tips.push('3rd floor study cubicles are the quietest zone during mid-term preparation.');
  } else if (dest.id === 'main-canteen') {
    tips.push('Lunch lines peak at 12:45 PM. Using the UPI fast counter near window 3 saves significant waiting time.');
  } else if (dest.id === 'admin-block') {
    tips.push('Examination branch counters are active from 10:30 AM to 4:00 PM.');
  } else {
    tips.push(dest.juniorTip || 'Follow the yellow paved wayfinding markings on the campus path.');
  }

  return {
    summary: `Shortest ${baseRoute.walkTimeMinutes}-minute walking route from ${start.shortName} to ${dest.shortName}.`,
    recommendedPath: `Follow the central spine northwards, passing landmark trees and signboards towards ${dest.shortName}.`,
    studentTips: tips,
    shortcuts: shortcuts.length > 0 ? shortcuts : ['Main promenade is the most direct unobstructed route.'],
    weatherNotes: weatherNotes.length > 0 ? weatherNotes : ['Clear weather conditions on campus walkway.']
  };
}

/**
 * Optional Google Gemini API integration
 */
async function callGeminiAPI(start, dest, baseRoute, preferences) {
  const prompt = `You are an experienced senior student campus navigator at SNIST (Sreenidhi Institute of Science and Technology).
Provide helpful, friendly, and practical walking directions and 2 insider junior student tips for walking from "${start.name}" to "${dest.name}".
Walk time: ${baseRoute.walkTimeMinutes} minutes. Distance: ${baseRoute.distanceMeters} meters.
User preferences: ${JSON.stringify(preferences)}.
Respond in concise JSON with fields: summary, recommendedPath, studentTips (array of strings), shortcuts (array of strings).`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.geminiApiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  return text ? JSON.parse(text) : null;
}
