/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import {EventData, PastEventOptions} from "web3-eth-contract";

export interface CampaignNFTContract
  extends Truffle.Contract<CampaignNFTInstance> {
  "new"(
    _creator: string,
    _name: string,
    _price: number | BN | string,
    _baseURI: string,
    _tokenIds: number | BN | string,
    meta?: Truffle.TransactionDetails
  ): Promise<CampaignNFTInstance>;
}

export interface ApprovalForAll {
  name: "ApprovalForAll";
  args: {
    account: string;
    operator: string;
    approved: boolean;
    0: string;
    1: string;
    2: boolean;
  };
}

export interface OwnershipTransferred {
  name: "OwnershipTransferred";
  args: {
    previousOwner: string;
    newOwner: string;
    0: string;
    1: string;
  };
}

export interface TransferBatch {
  name: "TransferBatch";
  args: {
    operator: string;
    from: string;
    to: string;
    ids: BN[];
    values: BN[];
    0: string;
    1: string;
    2: string;
    3: BN[];
    4: BN[];
  };
}

export interface TransferSingle {
  name: "TransferSingle";
  args: {
    operator: string;
    from: string;
    to: string;
    id: BN;
    value: BN;
    0: string;
    1: string;
    2: string;
    3: BN;
    4: BN;
  };
}

export interface URI {
  name: "URI";
  args: {
    value: string;
    id: BN;
    0: string;
    1: BN;
  };
}

export interface minted {
  name: "minted";
  args: {
    _tokenId: BN;
    _donor: string;
    0: BN;
    1: string;
  };
}

type AllEvents =
  | ApprovalForAll
  | OwnershipTransferred
  | TransferBatch
  | TransferSingle
  | URI
  | minted;

export interface CampaignNFTInstance extends Truffle.ContractInstance {
  /**
   * See {IERC1155-balanceOf}. Requirements: - `account` cannot be the zero address.
   */
  balanceOf(
    account: string,
    id: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  /**
   * See {IERC1155-balanceOfBatch}. Requirements: - `accounts` and `ids` must have the same length.
   */
  balanceOfBatch(
    accounts: string[],
    ids: (number | BN | string)[],
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN[]>;

  current(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  donorsCount(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  /**
   * Indicates whether any token exist with a given id, or not.
   */
  exists(
    id: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  /**
   * See {IERC1155-isApprovedForAll}.
   */
  isApprovedForAll(
    account: string,
    operator: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  name(txDetails?: Truffle.TransactionDetails): Promise<string>;

  /**
   * Returns the address of the current owner.
   */
  owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

  price(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  /**
   * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
   */
  renounceOwnership: {
    (txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
    estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
  };

  /**
   * See {IERC1155-safeBatchTransferFrom}.
   */
  safeBatchTransferFrom: {
    (
      from: string,
      to: string,
      ids: (number | BN | string)[],
      amounts: (number | BN | string)[],
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      from: string,
      to: string,
      ids: (number | BN | string)[],
      amounts: (number | BN | string)[],
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      from: string,
      to: string,
      ids: (number | BN | string)[],
      amounts: (number | BN | string)[],
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      from: string,
      to: string,
      ids: (number | BN | string)[],
      amounts: (number | BN | string)[],
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * See {IERC1155-safeTransferFrom}.
   */
  safeTransferFrom: {
    (
      from: string,
      to: string,
      id: number | BN | string,
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      from: string,
      to: string,
      id: number | BN | string,
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      from: string,
      to: string,
      id: number | BN | string,
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      from: string,
      to: string,
      id: number | BN | string,
      amount: number | BN | string,
      data: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * See {IERC1155-setApprovalForAll}.
   */
  setApprovalForAll: {
    (
      operator: string,
      approved: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      operator: string,
      approved: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      operator: string,
      approved: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      operator: string,
      approved: boolean,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * See {IERC165-supportsInterface}.
   */
  supportsInterface(
    interfaceId: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  tokenIds(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  /**
   * Total amount of tokens in with a given id.
   */
  totalSupply(
    id: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  /**
   * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
   */
  transferOwnership: {
    (newOwner: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      newOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  /**
   * See {IERC1155MetadataURI-uri}. This implementation returns the same URI for *all* token types. It relies on the token type ID substitution mechanism https://eips.ethereum.org/EIPS/eip-1155#metadata[defined in the EIP]. Clients calling this function must replace the `\{id\}` substring with the actual token type ID.
   */
  uri(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<string>;

  setPrice: {
    (
      _newPrice: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _newPrice: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _newPrice: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _newPrice: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  mint: {
    (
      _tokenId: number | BN | string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _tokenId: number | BN | string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _tokenId: number | BN | string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _tokenId: number | BN | string,
      _amount: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    /**
     * See {IERC1155-balanceOf}. Requirements: - `account` cannot be the zero address.
     */
    balanceOf(
      account: string,
      id: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    /**
     * See {IERC1155-balanceOfBatch}. Requirements: - `accounts` and `ids` must have the same length.
     */
    balanceOfBatch(
      accounts: string[],
      ids: (number | BN | string)[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN[]>;

    current(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    donorsCount(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    /**
     * Indicates whether any token exist with a given id, or not.
     */
    exists(
      id: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    /**
     * See {IERC1155-isApprovedForAll}.
     */
    isApprovedForAll(
      account: string,
      operator: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    name(txDetails?: Truffle.TransactionDetails): Promise<string>;

    /**
     * Returns the address of the current owner.
     */
    owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

    price(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    /**
     * Leaves the contract without owner. It will not be possible to call `onlyOwner` functions anymore. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby removing any functionality that is only available to the owner.
     */
    renounceOwnership: {
      (txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(txDetails?: Truffle.TransactionDetails): Promise<void>;
      sendTransaction(txDetails?: Truffle.TransactionDetails): Promise<string>;
      estimateGas(txDetails?: Truffle.TransactionDetails): Promise<number>;
    };

    /**
     * See {IERC1155-safeBatchTransferFrom}.
     */
    safeBatchTransferFrom: {
      (
        from: string,
        to: string,
        ids: (number | BN | string)[],
        amounts: (number | BN | string)[],
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        from: string,
        to: string,
        ids: (number | BN | string)[],
        amounts: (number | BN | string)[],
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        from: string,
        to: string,
        ids: (number | BN | string)[],
        amounts: (number | BN | string)[],
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        from: string,
        to: string,
        ids: (number | BN | string)[],
        amounts: (number | BN | string)[],
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * See {IERC1155-safeTransferFrom}.
     */
    safeTransferFrom: {
      (
        from: string,
        to: string,
        id: number | BN | string,
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        from: string,
        to: string,
        id: number | BN | string,
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        from: string,
        to: string,
        id: number | BN | string,
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        from: string,
        to: string,
        id: number | BN | string,
        amount: number | BN | string,
        data: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * See {IERC1155-setApprovalForAll}.
     */
    setApprovalForAll: {
      (
        operator: string,
        approved: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        operator: string,
        approved: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        operator: string,
        approved: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        operator: string,
        approved: boolean,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * See {IERC165-supportsInterface}.
     */
    supportsInterface(
      interfaceId: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    tokenIds(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    /**
     * Total amount of tokens in with a given id.
     */
    totalSupply(
      id: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    /**
     * Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.
     */
    transferOwnership: {
      (newOwner: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        newOwner: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    /**
     * See {IERC1155MetadataURI-uri}. This implementation returns the same URI for *all* token types. It relies on the token type ID substitution mechanism https://eips.ethereum.org/EIPS/eip-1155#metadata[defined in the EIP]. Clients calling this function must replace the `\{id\}` substring with the actual token type ID.
     */
    uri(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;

    setPrice: {
      (
        _newPrice: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _newPrice: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _newPrice: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _newPrice: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    mint: {
      (
        _tokenId: number | BN | string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _tokenId: number | BN | string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _tokenId: number | BN | string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _tokenId: number | BN | string,
        _amount: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}
