interface DataItem {
  name: string;
  has_synonyms: boolean;
  is_moderator_only: boolean;
  is_required: boolean;
  count: number;
}

interface CountRange {
  min: number;
  max: number;
}

function generateData(names: string[], countRange: CountRange): DataItem[] {
  const data: DataItem[] = [];
  names.forEach((name) => {
    const count = Math.floor(Math.random() * (countRange.max - countRange.min + 1) + countRange.min);
    data.push({
      name: name,
      has_synonyms: Math.random() < 0.5,
      is_moderator_only: Math.random() < 0.5,
      is_required: Math.random() < 0.5,
      count: count,
    });
  });
  return data;
}

const names: string[] = [
  "React",
  "Angular",
  "C#",
  "templates",
  "google-apps-script",
  "React",
  "Angular",
  "C#",
  "templates",
  "google-apps-script",
  "React",
  "Angular",
  "C#",
  "templates",
  "google-apps-script",
];
const countRange: CountRange = { min: 1, max: 50000 };

export const mockData: DataItem[] = generateData(names, countRange);
