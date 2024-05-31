export const authors = new Map([
  [1, "Amar"],
  [2, "Akbar"],
  [3, "Anthony"],
]);
export const mockData = [
  {
    id: 1,
    comment: "Hi, Akbar",
    authorId: 1,
    children: [
      {
        id: 2,
        comment: "Sirf Akbar ko hi HI bolega kya, bhai!",
        authorId: 3,
        children: [
          {
            id: 3,
            comment: "Bhai, tu naaraz kyun hota. Main bolta na tere ko hi",
            authorId: 2,
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    comment: "Hi, Akbar",
    authorId: 1,
    children: [
      {
        id: 5,
        comment: "Sirf Akbar ko hi HI bolega kya, bhai!",
        authorId: 3,
        children: [
          {
            id: 6,
            comment: "Bhai, tu naaraz kyun hota. Main bolta na tere ko hi",
            authorId: 2,
            children: [],
          },
        ],
      },
    ],
  },
];
