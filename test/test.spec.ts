import axios from "axios";
const URL = `http://localhost:3007/api/v1`;

let accessToken: string;

describe("test community", () => {
  test("login", async () => {
    const result = await axios.post(`${URL}/user/login`, {
      email: "realbewhy@gmail.com",
      password: "howtokillGOD",
    });
    accessToken = result.data.accessToken;
    expect(accessToken).toBeDefined();
  });

  test("get chat room", async () => {
    const res = await axios(`${URL}/chat/rooms`);
    expect(res.data[0]).toEqual({
      id: 1,
      name: "Community",
      avatar: null,
      createdAt: "2023-07-18T09:47:22.389Z",
      updatedAt: "2023-07-18T09:47:22.389Z",
      totalUser: 999,
    });
  });

  test("get trending article", async () => {
    const res = await axios(`${URL}/article`);
    expect(res.data.sort).toBeUndefined();
  });

  test("get article popular", async () => {
    const res = await axios(`${URL}/article?sort=1`);
    expect(res.data.sort).toEqual("Popular");
  });

  test("get article detail", async () => {
    const result = await axios(`${URL}/article/detail?id=4`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    });
    expect(result.data.title).toEqual("wqdlnqwkodnok");
  });

  test("get profile with access token", async () => {
    const result = await axios(`${URL}/user/profile`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    });
    const { email } = result.data;
    expect(email).toEqual("realbewhy@gmail.com");
  });

  test("get profile without access token", async () => {
    const result = await axios(`${URL}/user/profile`, {});
    const { email } = result.data;
    expect(email).toEqual("realbewhy@gmail.com");
  });

  test("get transactions", async () => {
    const result = await axios.post(
      `${URL}/transaction`,
      { page: 1, pageSize: 10, filters: { receiver: 1 } },
      {
        headers: {
          Authorization: `bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    expect(result.data.items[0].receiver).toBe(1);
  });

  test("get comments", async () => {
    const result = await axios.get(
      `${URL}/comment?userId=1&page=1&pageSize=6`,
      {
        headers: {
          Authorization: `bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    expect(result.data.items[0]).toEqual({
      id: 5,
      userId: 1,
      articleId: 4,
      parentCommentId: 2,
      content: "21321",
      lft: 6,
      rgt: 7,
      createdAt: "2023-07-24T03:40:28.028Z",
      updatedAt: "2023-07-24T03:40:28.028Z",
      articleTitle: "wqdlnqwkodnok",
    });
  });

  test("get comments by article", async () => {
    const result = await axios.get(
      `${URL}/article/c?articleId=4&page=1&pageSize=4`,
      {
        headers: {
          Authorization: `bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    expect(result.data.items[0].userId).toEqual(1);
  });

  test("get recent article", async () => {
    const result = await axios.get(`${URL}/article/recent?page=1&pageSize=4`, {
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    expect(result.data.items[0].userId).toEqual(1);
  });

  test("update profile", async () => {
    const result = await axios.post(
      `${URL}/user/profile`,
      {
        fields: {
          firstName: "Riley",
          lastName: "Tran",
          bio: "This is bio",
          gender: 1,
          profilePicture:
            "https://realbewhy-storage.s3.us-east-1.amazonaws.com/1689675188268-d3f4f447-ee03-403e-b26a-b81d005cc49d_1689675188269.png",
          coverPicture:
            "https://c.wallhere.com/images/56/20/fdda803702e4f0f6e79ef392a186-1563343.jpg!d",
        },
      },
      {
        headers: {
          Authorization: `bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    expect(result.data.success).toEqual(true);
  });

  test("create article", async () => {
    const result = await axios.post(
      `${URL}/article`,
      {
        title: "Demo 1",
        description: "Demo",
        // content: "",
        imgUrl:
          "https://realbewhy-storage.s3.us-east-1.amazonaws.com/1689675188268-d3f4f447-ee03-403e-b26a-b81d005cc49d_1689675188269.png",
      },
      {
        headers: {
          // Authorization: `bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    expect(result.data).toBeDefined();
  });

  test("update article", async () => {
    const result = await axios.put(
      `${URL}/article?id=${27}`,
      {
        title: "Demo 2",
        description: "Demo 2",
        content: "xxxx 2",
        imgUrl:
          "https://realbewhy-storage.s3.us-east-1.amazonaws.com/1689675188268-d3f4f447-ee03-403e-b26a-b81d005cc49d_1689675188269.png",
      },
      {
        headers: {
          // Authorization: `bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    expect(result.data).toBeDefined();
  });

  test("update username", async () => {
    const result = await axios.post(
      `${URL}/user/username`,
      {
        username: "riley083",
      },
      {
        headers: {
          // Authorization: `bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    expect(result.data.success).toEqual(true);
  });

  test("get user profile", async () => {
    const result = await axios(`${URL}/user/p?id=2`);
    const { email } = result.data;
    expect(email).toEqual("riley083g@gmail.com");
  });

  test("create memo", async () => {
    const result = await axios.post(
      `${URL}/memo`,
      {
        content: "oijdpoqwjdpoqwjkop",
        recipientIds: [2, 3, 4],
        // replyMemoId: 7,
        points: 10000000
      },
      {
        headers: {
          Authorization: `bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    expect(result.data.success).toEqual(true);
  });

  // test("get memo", async () => {
  //   const result = await axios.get(`${URL}/memo`, {
  //     headers: {
  //       Authorization: `bearer ${accessToken}`,
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   });
  //   expect(result.data.success).toEqual(true);
  // });
});

describe("test alive", () => {
  test("Bot Support", async () => {
    const result = await axios.get(
      "http://135.181.162.143:6868/api/admin/bot?page=0&pageSize=10"
    );
    expect(result).toBeDefined();
  });
  test("Matrix Prod", async () => {
    const result = await axios.get(
      "https://api.matrix3s.com/api/configuration"
    );
    expect(result).toBeDefined();
  });
});
