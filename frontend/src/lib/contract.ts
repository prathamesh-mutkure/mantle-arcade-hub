export const CONTRACT_ADDRESS = "0x86E1d4bF5F232932Eb46ACb17B7D474c95A3068b";

export const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_gameId",
        type: "string",
      },
    ],
    name: "approveGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_submissionFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_submissionStake",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxSubmissionsPerUser",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "gameId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "GameApproved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "gameId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "GameRejected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "string",
        name: "gameId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "submitter",
        type: "address",
      },
    ],
    name: "GameSubmitted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_gameId",
        type: "string",
      },
      {
        internalType: "string",
        name: "_reason",
        type: "string",
      },
    ],
    name: "rejectGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "submitter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "StakeConfiscated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "submitter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "StakeReturned",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "id",
            type: "string",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "poster",
            type: "string",
          },
          {
            internalType: "string",
            name: "flashFile",
            type: "string",
          },
          {
            internalType: "enum GameMarketplace.GameCategory[]",
            name: "categories",
            type: "uint8[]",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "bool",
            name: "featured",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isMobileFriendly",
            type: "bool",
          },
          {
            internalType: "enum GameMarketplace.GameType",
            name: "gameType",
            type: "uint8",
          },
          {
            internalType: "address",
            name: "submitter",
            type: "address",
          },
          {
            internalType: "enum GameMarketplace.GameStatus",
            name: "status",
            type: "uint8",
          },
        ],
        internalType: "struct GameMarketplace.Game",
        name: "_game",
        type: "tuple",
      },
    ],
    name: "submitGame",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_newSubmissionFee",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_newSubmissionStake",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_newMaxSubmissionsPerUser",
        type: "uint256",
      },
    ],
    name: "updateSubmissionParameters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawFees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum GameMarketplace.GameStatus",
        name: "_status",
        type: "uint8",
      },
    ],
    name: "getGamesByStatus",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSubmissionsPerUser",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "submissionFee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "submissionStake",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userSubmissionCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
