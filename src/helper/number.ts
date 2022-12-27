export const formatNumberSpace = (value?: string) => {
  if (!value) return;
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(' ');
  } else {
    return value;
  }
};

export const formatNumberCurrent = (value?: string) => {
  if (!value) return;
  return new Intl.NumberFormat('de-DE').format(Number(value));
};
