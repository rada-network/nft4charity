import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { CampaignNftMetaData } from "../entities";

@Resolver(() => CampaignNftMetaData)
export class CampaignNftMetaDataResolver {
  @ResolveField(() => String)
  async ipfsBaseUrl(
    @Parent() { nftMetaData }: CampaignNftMetaData,
  ): Promise<string> {
    return `ipfs://${nftMetaData.folderId}/metadata`;
  }

  @ResolveField(() => [String])
  async nftUrls(
    @Parent() campaignNftMetadata: CampaignNftMetaData,
  ): Promise<string[]> {
    const metadata = campaignNftMetadata.nftMetaData;

    return Array.from(Array(metadata.total), (_, idx) => {
      const id = parseInt(metadata.startNumber) + idx;
      const idStr = id.toString().padStart(metadata.startNumber.length, "0");

      return `https://ipfs.moralis.io:2053/ipfs/${metadata.folderId}/metadata/${idStr}.json`;
    });
  }
}
