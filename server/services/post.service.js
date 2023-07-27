const RELEVANCE_MIN_DAYS = 1;
const RELEVANCE_POINTS = 5;
const POPULARITY_MULTIPLIER = 1.5;
const COMMENT_PER_REQUEST = 20;
const POST_PER_REQUEST = 10;

/**
 * Get the date which could be use to consider a post still relevant
 */
const getMinRelevanceDate = () => {
  const days = new Date();
  days.setDate(days.getDate() - RELEVANCE_MIN_DAYS);

  return days;
};

module.exports = {
  getMinRelevanceDate,
  RELEVANCE_POINTS,
  POPULARITY_MULTIPLIER,
  COMMENT_PER_REQUEST,
  POST_PER_REQUEST,
};
