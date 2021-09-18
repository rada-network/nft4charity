import { Injectable } from "@nestjs/common";

@Injectable()
export class CampaignsService {
  private readonly campaigns = [{ id: 1, name: "Campaign 1", userId: 1 }];

  findAll(): any[] {
    return this.campaigns;
  }

  findOneById(id: number): any {
    return this.campaigns.find((campaign) => campaign.id === id);
  }
}
