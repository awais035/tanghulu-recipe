// Format date to readable string
export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Calculate reading time
export function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime;
}

// Truncate text
export function truncateText(text, maxLength = 150) {
  if (!text) return '';
  const strippedText = text.replace(/<[^>]*>/g, '');
  if (strippedText.length <= maxLength) return strippedText;
  return strippedText.substring(0, maxLength).trim() + '...';
}

// Generate excerpt from content if none exists
export function generateExcerpt(content, maxLength = 160) {
  if (!content) return '';
  const text = content.replace(/<[^>]*>/g, '');
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

// Format cooking time
export function formatCookingTime(minutes) {
  if (minutes < 60) {
    return `${minutes} mins`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  }
  return `${hours} hr${hours > 1 ? 's' : ''} ${mins} mins`;
}
