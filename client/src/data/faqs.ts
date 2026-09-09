export interface IFAQ {
  question: string;
  answer: string;
}

export const faqsData: IFAQ[] = [
  {
    question: "What is ThumbCraft?",
    answer:
      "ThumbCraft is an AI-powered thumbnail generator designed to help creators create engaging and professional-looking thumbnails without needing advanced graphic design skills. Simply provide your topic, choose your preferred style, aspect ratio, and color scheme, and let AI create the design for you.",
  },
  {
    question: "How does ThumbCraft generate thumbnails?",
    answer:
      "ThumbCraft uses AI image generation to transform your title and creative instructions into a complete thumbnail design. You can guide the result using different styles, aspect ratios, color schemes, and additional prompts.",
  },
  {
    question: "Do I need any design skills to use ThumbCraft?",
    answer:
      "Not at all. ThumbCraft is built to keep the process simple. You only need to describe what your thumbnail should be about, select your preferences, and generate. The AI handles the visual creation for you.",
  },
  {
    question: "Can I customize the thumbnail before generating it?",
    answer:
      "Yes. You can customize important aspects of your thumbnail including the aspect ratio, visual style, color scheme, and additional creative instructions. This gives you more control over the final design.",
  },
  {
    question: "Where can I find my generated thumbnails?",
    answer:
      "All your generated thumbnails are available in the My Generations section of your account. From there, you can view, download, open, or delete your generated thumbnails.",
  },
  {
    question: "Is ThumbCraft free to use?",
    answer:
      "ThumbCraft currently uses an AI generation service with limited free usage. Availability and generation limits may depend on the AI service being used. You can use the available free generation capacity and explore ThumbCraft without committing to a paid plan.",
  },
];