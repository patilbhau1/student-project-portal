export type Project = {
  id: string;
  title: string;
  studentRoll: string;
  synopsis: string;
  description: string;
  files: { name: string; size: string }[];
  likes: number;
};

export const rolls = Array.from({ length: 30 }, (_, i) => (1001 + i).toString());

export const projects: Project[] = Array.from({ length: 12 }, (_, i) => ({
  id: `p-${i + 1}`,
  title: `Project ${i + 1}`,
  studentRoll: rolls[i % rolls.length],
  synopsis: "A concise overview of the project goals and expected outcomes.",
  description:
    "This demo record represents a student's project. In the real app, this would be fetched from the database. Use this page to preview synopsis, files, likes, and comments.",
  files: [
    { name: "synopsis.pdf", size: "240 KB" },
    { name: "report.docx", size: "1.4 MB" },
    { name: "slides.pptx", size: "3.1 MB" },
  ],
  likes: Math.floor(Math.random() * 50) + 5,
}));