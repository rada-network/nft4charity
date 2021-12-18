import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { CampaignNftMetaData } from "../entities";
import { IPFS_BASE_URL } from "../environments";

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

      return `${IPFS_BASE_URL}/${metadata.folderId}/metadata/${idStr}.json`;
    });
  }
}
