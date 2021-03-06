/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import {EventData, PastEventOptions} from "web3-eth-contract";

export interface StoreContract extends Truffle.Contract<StoreInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<StoreInstance>;
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

export interface campaignCreated {
  name: "campaignCreated";
  args: {
    _campaignId: BN;
    _creator: string;
    _wallet: string;
    _name: string;
    0: BN;
    1: string;
    2: string;
    3: string;
  };
}

type AllEvents = OwnershipTransferred | campaignCreated;

export interface StoreInstance extends Truffle.ContractInstance {
  _campaign_count(txDetails?: Truffle.TransactionDetails): Promise<BN>;

  campaigns(
    arg0: number | BN | string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<{0: string; 1: string; 2: string}>;

  /**
   * Returns the address of the current owner.
   */
  owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

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

  addWhitelister: {
    (_user: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(_user: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      _user: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _user: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  removeWhitelister: {
    (_user: string, txDetails?: Truffle.TransactionDetails): Promise<
      Truffle.TransactionResponse<AllEvents>
    >;
    call(_user: string, txDetails?: Truffle.TransactionDetails): Promise<void>;
    sendTransaction(
      _user: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _user: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  isWhitelister(
    _user: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<boolean>;

  createCampaign: {
    (
      _name: string,
      _price: number | BN | string,
      _baseURI: string,
      _tokenIds: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _name: string,
      _price: number | BN | string,
      _baseURI: string,
      _tokenIds: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<void>;
    sendTransaction(
      _name: string,
      _price: number | BN | string,
      _baseURI: string,
      _tokenIds: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _name: string,
      _price: number | BN | string,
      _baseURI: string,
      _tokenIds: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  methods: {
    _campaign_count(txDetails?: Truffle.TransactionDetails): Promise<BN>;

    campaigns(
      arg0: number | BN | string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<{0: string; 1: string; 2: string}>;

    /**
     * Returns the address of the current owner.
     */
    owner(txDetails?: Truffle.TransactionDetails): Promise<string>;

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

    addWhitelister: {
      (_user: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _user: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _user: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _user: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    removeWhitelister: {
      (_user: string, txDetails?: Truffle.TransactionDetails): Promise<
        Truffle.TransactionResponse<AllEvents>
      >;
      call(
        _user: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _user: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _user: string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    isWhitelister(
      _user: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<boolean>;

    createCampaign: {
      (
        _name: string,
        _price: number | BN | string,
        _baseURI: string,
        _tokenIds: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _name: string,
        _price: number | BN | string,
        _baseURI: string,
        _tokenIds: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<void>;
      sendTransaction(
        _name: string,
        _price: number | BN | string,
        _baseURI: string,
        _tokenIds: number | BN | string,
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _name: string,
        _price: number | BN | string,
        _baseURI: string,
        _tokenIds: number | BN | string,
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
