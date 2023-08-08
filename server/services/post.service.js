const fs = require('fs');

const COMMENT_PER_REQUEST = 20;
const POST_PER_REQUEST = 20;
const ENGAGEMENT_WEIGHT = 0.45;
const RECENCY_WEIGHT = 0.05;
const RELEVANCE_WEIGHT = 0.5;
const MILLISECONDS_IN_HOUR = 3600000;

const removePostWithoutMedia = (posts) => {
  return posts.filter((post) => {
    const { media } = post;

    return (
      media.filter((data) => fs.existsSync(data.src) === false).length === 0
    );
  });
};

module.exports = {
  COMMENT_PER_REQUEST,
  POST_PER_REQUEST,
  ENGAGEMENT_WEIGHT,
  RELEVANCE_WEIGHT,
  RECENCY_WEIGHT,
  MILLISECONDS_IN_HOUR,
  removePostWithoutMedia,
};
