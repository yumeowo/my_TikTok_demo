/**
 * 格式化数字为简短形式
 * @param num 数字
 * @returns 格式化后的字符串（如: 1234567 → "123.5w"）
 */
export function formatCount(num: number): string {
  if (num < 10000) {
    return num.toString();
  }

  const wan = num / 10000;

  // 保留一位小数，去掉末尾的 .0
  const formatted = wan.toFixed(1);
  return formatted.endsWith('.0')
    ? `${Math.floor(wan)}w`
    : `${formatted}w`;
}

/**
 * 格式化时间戳为相对时间
 * @param timestamp 时间戳（秒）
 * @returns 相对时间字符串（如: "2天前"）
 */
export function formatTime(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;

  if (diff < 0) {
    return '刚刚';
  }

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  if (diff < minute) {
    return '刚刚';
  }

  if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes}分钟前`;
  }

  if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours}小时前`;
  }

  if (diff < month) {
    const days = Math.floor(diff / day);
    return `${days}天前`;
  }

  if (diff < year) {
    const months = Math.floor(diff / month);
    return `${months}个月前`;
  }

  const years = Math.floor(diff / year);
  return `${years}年前`;
}