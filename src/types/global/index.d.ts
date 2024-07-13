type TUser = {
  id?: number;
  walletAddress: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  status?: number;
  username: string;
  ref: number | null;
};

type TUserProfile = {
  id: number;
  userId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: boolean;
  bio: string;
  profilePicture: string;
  coverPicture: string;
  createdAt: Date;
  updatedAt: Date;
  displayName?: string;
  avatar?: string;
};

type TAccount = TUser & TUserProfile;

type TMessage = {
  id?: number;
  userId: string;
  roomId: number;
  message: string;
  medias?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  authorAvatar?: string;
  authorDisplayname?: string;
  email?: string;
  username?: string;
  walletAddress?: string;
  firstName?: string;
  lastName?: string;
};

type TArticle = {
  id?: number;
  userId: number | null;
  title: string;
  shortTitle?: string;
  content: string;
  imgUrl?: string;
  description?: string;
  tags?: string[];
  createdAt?: Date;
  isOwner?: boolean;
  type?: number;
  shareCount?: number;
  displayContent?: string;
  liked?: number;
  disliked?: number;
  cates?: number[];
  _author_point?: number;
  _author_level?: number;
  _author_displayName?: string;
  _author_avatar?: string;
  _author_walletAddress?: string;
  _author_username?: string;
  _author_email?: string;
  _author_firstname?: string;
  _author_lastname?: string;
  _author_type?: number;
  imgUrls?: string[];
  source?: string | null;
  commentCount?: number;
  seenCount?: number;
  likeCount?: number;
  dislikeCount?: number;
  status?: number;
  catId?: number;
  sourceSite?: string | null;
  shortContent?: string;
  metadataImage?: string;
  crumbs?: {
    id: number;
    label: string;
  }[];
};

type TRoom = {
  name: string;
  id: number;
  avatar?: string;
  onlineUsers: number;
};

type TArticleLike = {
  id: number;
  articleId: number;
  userId: number;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type TArticleShare = {
  id: number;
  articleId: number;
  userId: number;
  platform: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type TBanner = {
  id?: number;
  image: string;
  title?: string;
  description?: string;
  url?: string;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

type TAdministrator = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  adminRole: number;
  type: number;
  avatar: string;
};

type TCategory = {
  id: number;
  label: string;
  parentId: number;
  rate: number;
  subCats: TCategory[];
  status: number;
  allowUser: number;
  chatRoomId: number | null;
  descendants?: number[];
};

type TBalance = {
  id: number;
  userId: number;
  balance: number;
  lockBalance: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type TTransaction = {
  id?: number;
  userId: number;
  amount: number;
  lockAmount: number;
  type: number;
  articleId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
  status: number;
  txHash: string | null;
  displayType?: string;
  newBalance?: number;
  oldBalance?: number;
  note: string | null;
  assetId: number;
};

type TComment = {
  id: number;
  userId: number;
  content: string;
  parentCommentId: number | null;
  lft: number;
  rgt: number;
  createdAt?: Date;
  updatedAt?: Date;
  _author_point?: number;
  _author_level?: number;
  _author_displayName?: string;
  _author_avatar?: string;
  _author_walletAddress?: string;
  _author_username?: string;
  _author_email?: string;
  _author_firstname?: string;
  _author_lastname?: string;
  status: number;
  articleId: number;
  userStatus?: number;
};

type TGameRoom = {
  id: number;
  label: string;
  maxPerUser: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
  startTime: Date;
  endTime: Date;
  total: number;
  resultVideo?: string;
  status?: number;
  rewardAmount?: number;
  processStatus?: number;
  apiKeys?: string[];
  waitFor: number;
  currentRound?: number;
  maxBalls: number;
  winners: {
    displayname: string;
    points: number;
  }[];
  players: {
    id: number;
    displayName: string;
  }[];
  runtime: any;
  feePercent: number;
  useBot: number;
  winnerNo: number;
  dbWinnerNo: number;
  ballsBotCanJoin: number;
  displayRoundId: number;
  startAt?: number;
  playerCount: number;
  winnerId: number;
};

type TMemo = {
  id?: number;
  senderId?: number;
  recipientId?: number;
  seen?: boolean;
  gotPoints?: boolean;
  points: number;
  userId: number;
  content: string;
  replyMemoId: number | null;
  receivers?: any[];
  senderDisplayname?: string;
  senderAvatar?: string;
};

type TExtraRecordsField = {
  page?: number;
  pageSize?: number;
  filters?: { key: any; value: any }[];
  tableName?: string;
  orderBy?: string;
  order?: "acs" | "desc";
  subFields?: string;
  joinQuery?: string;
  groupBy?: string;
  extraColumns?: {
    Field: string;
  }[];
  filterList?: TFilter[];
  columns?: {
    Field: string;
    label: string;
  }[];
  searchBy?: { key: string; value: string };
};

type TExtraQueryField = {
  page?: number;
  pageSize?: number;
  tableName: string;
  subTables?: {
    tableName: string;
    columns: string[];
    column: string;
    refColumn: string;
    alias?: string;
    //sub of sub table
    sosTable?: {
      tableName: string;
      columns: string[];
      column: string;
      refColumn: string;
      alias?: string;
    };
  }[];
  filterList?: TFilter[];
  // sortList:
  searchList?: {
    Field: string;
    label: string;
  }[];

  sortWith?: { key: string; type: "ASC" | "DESC" };
  filterWith?: { key: any; value: any }[];
  searchWith?: { key: string; value: string };

  extraSelect?: string;
};

type TExtraQueryResult = {
  page: number;
  pageSize: number;
  itemCount: number;
  pageCount: number;
  items: any[];
  filterList: TFilter[];
  // sortList:
  searchList: {
    Field: string;
    label: string;
  }[];
};

type TPlayer = TUser &
  TUserProfile & { displayName: string; hiddenName: string };

type TFilter = {
  key: any;
  values: {
    [key: number]: string;
  };
  type: "text" | "select";
  label: string;
};

type TArticleReport = {
  id: number;
  userId: number;
  articleId: number;
  type: number;
  note: string;
};

type TUserReport = {
  id: number;
  userId: number;
  reportedUserId: number;
  type: number;
  note: string;
};

type TNotification = {
  id: number;
  type: number;
  sender: number;
  receiver: number;
  unread: number;
  articleId: number;
  commentId: number;
  createdAt: Date;
  updatedAt: Date;
};

type TUserStatistic = {
  post: number;
  like: number;
  comment: number;
  share: number;
  memo: number;
  beLike: number;
};

type TMedalData = {
  id: number;
  missionId: number;
  milestone: number;
  medalImage: string;
  createdAt: string;
  updatedAt: string;
  submissionType: number;
  description: string;
  name: string;
  isOk: boolean;
  compareWith: string | number;
  maxPerDay: number | null;
  progress: number;
  medal: any;
  current: any;
  next: any;
};

type TCommentEmotion = {
  id?: number;
  commentId: number;
  userId: number;
  type: 1 | 2;
};

type TLongShortAnswer = {
  id?: number;
  userId: number;
  type: 0 | 1; //0: long, 1: short
  createdAt?: Date;
  updatedAt?: Date;
};

type TUserSetting = {
  id?: number;
  userId: number;
  breakingNewNotification?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

type TAppVersion = {
  name: string;
  status: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type TMiningSetting = {
  duration: number;
  amount: number;
  boostFee: number;
  boostPercent: number;
  boostAmount: number;
  numberOfTimesInADay: number;
};

type TMiningHistory = {
  id?: number;
  userId: number;
  point: number;
  endTime?: any;
  createdAt?: any;
  updatedAt?: any;
};

type TPointConfig =
  | "post"
  | "comment"
  | "share"
  | "replyComment"
  | "like"
  | "dislike"
  | "goLike"
  | "goDislike"
  | "goComment"
  | "goShare"
  | "goReplyComment";

type TTradingBotAccount = {
  id?: number;
  userId: number;
  apiKey: string;
  secretKey: string;
  createdAt?: Date;
  updatedAt?: Date;
};

// readjoy

type TBook = {
  id?: number;
  userId: number;
  title: string;
  author: string;
  description?: string;
  image: string;
  images?: string[];
  publishingCompany?: string;
  categories?: string;
  rate?: number;
  status?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
