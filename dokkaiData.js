// dokkaiData.js - This file stores the reading comprehension passages and their data.

// Structure the data by JLPT level
const dokkaiPassages = {
  N5: [
    { // Passage 1 for N5 (From your Word file)
      id: 'N5-1', // Unique ID for the passage
      originalText: "にちようびに いもうとと うみへ いきました。いもうとは およぐことが すきです。わたしは およがなかったです。わたしは すなで あそびました。おひるに ふたりで おにぎりを たべました。",
      translatedText: "On Sunday, I went to the beach with my little sister. My little sister likes swimming. I didn’t swim. I played in the sand. At noon, we ate rice balls together.",
      question: "Q. わたしは なにを しましたか。", // Question text
      answerOptions: [
        { key: 'A', text: 'およぎました' },
        { key: 'B', text: 'すなで あそびました' },
        { key: 'C', text: 'おにぎりを つくりました' },
        { key: 'D', text: 'いえに いました' },
      ],
      correctAnswerKey: 'B',
      explanation: "In the passage, it says: わたしは すなで あそびました。 → “I played in the sand.”\nThat clearly answers the question: “What did  I  do?”\nA is wrong because the speaker says:  およがなかったです  (I didn’t swim)\nC is wrong — they ate onigiri, not made it\nD is wrong — they were at the beach, not at home\nSo, the correct answer is  B .",
    },
    { // Passage 2 for N5 (From your Word file)
      id: 'N5-2', // Unique ID for the passage
      originalText: "あしたは ははの たんじょうびです。わたしは けーきを つくります。ちいさい けーきと おおきい けーき、どちらが いいですか。わたしは おおきい けーきが すきです。だから、おおきい けーきを つくります。",
      translatedText: "Tomorrow is my mother's birthday. I will make a cake. Which is better, a small cake or a big cake? I like big cakes. So, I will make a big cake.",
      question: "Q. わたしは なにを つくりますか。", // Question text
      answerOptions: [
        { key: 'A', text: 'ちいさい けーき' },
        { key: 'B', text: 'おおきい けーき' },
        { key: 'C', text: 'ちいさい ぱん' },
        { key: 'D', text: 'おおきい ごはん' },
      ],
      correctAnswerKey: 'B',
      explanation: "The passage says: わたしは おおきい けーきが すきです。だから、おおきい けーきを つくります。 → \"I like big cakes. So I will make a big cake.\"\nThis tells us clearly that the speaker will make a  big cake , so the correct answer is  B .",
    },
    // Add more N5 passages here following the same structure
  ],
  N4: [
    // Add N4 passages here
  ],
  N3: [
    // Add N3 passages here
  ],
  N2: [
    // Add N2 passages here
  ],
  N1: [
    // Add N1 passages here
  ],
};

// Export the data
export default dokkaiPassages;
