export const getComments = async () => {
  return [
    {
      id: "1",
      body: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      username: "amyrobson",
      userId: "1",
      score: 12,
      image: "image-amyrobson.png",
      parentId: null,
      createdAt: "2023-06-16T23:00:33.010+02:00"
    },
    {
      id: "2",
      body: "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
      username: "maxblagun",
      userId: "2",
      score: 12,
      image: "image-maxblagun.png",
      parentId: null,
      createdAt: "2023-07-26T23:00:33.010+02:00"
    },
    {
      id: "3",
      body: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      username: "ramsesmiron",
      userId: "3",
      score: 4,
      image: "image-ramsesmiron.png",
      parentId: "2",
      createdAt: "2023-07-30T23:00:33.010+02:00"
    },
    {
      id: "4",
      body: "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
      username: "juliusomo",
      userId: "4",
      score: 0,
      image: "image-juliusomo.png",
      parentId: "3",
      createdAt: "2023-07-30T23:00:33.010+02:00"
    }
  ];
};

export const createComment = async (text, parentId = null) => {
  const newComment = {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "juliusomo",
    score: 0,
    image: "image-juliusomo.png",
    createdAt: new Date().toISOString(),
  };

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return newComment; // Return the created comment object
};

export const addComment = async (text, parentId) => {
  const newComment = {
    id: Math.random().toString(36).substr(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "juliusomo",
    score: 0,
    image: "image-juliusomo.png",
    createdAt: new Date().toISOString(),
  };

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return newComment;
};

// export const updateComment = async (text) => {
//   return { text };
// };

export const updateComment = async (comments, commentId, updatedText) => {
  // Find the comment in the data and update its body
  const updatedComments = comments.map((comment) => {
    if (comment.id === commentId) {
      return {
        ...comment,
        body: updatedText,
      };
    }
    return comment;
  });

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return updatedComments;
};


export const deleteComment = async () => {
  return {};
};