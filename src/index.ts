import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }

  static validateStructure = (anyBlock: Block): boolean =>
    typeof anyBlock.index === "number" &&
    typeof anyBlock.hash === "string" &&
    typeof anyBlock.previousHash === "string" &&
    typeof anyBlock.data === "string" &&
    typeof anyBlock.timestamp === "number";
}

const calculateBlockHash = (
  index: number,
  previousHash: string,
  timestamp: number,
  data: string
): string =>
  CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

const genesisBLock: Block = new Block(0, "0202", "", "hello", 123456);

let blockchain: Block[] = [genesisBLock];

const getBlockChains = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );

  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );

  addBlock(newBlock);
  return newBlock;
};

const getHashforBlock = (anyBlock): string =>
  calculateBlockHash(
    anyBlock.index,
    anyBlock.previousHash,
    anyBlock.timestamp,
    anyBlock.data
  );

const isBlockVailed = (
  candidateBlock: Block,
  previousBlock: Block
): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockVailed(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  } else {
    console.log("추가실패");
  }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain);

export {};
