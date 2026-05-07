import { AWS_SNS } from "@Config/AWS/SNS";
import { logger } from "@Shared/Util/Logger";
import type { SNS } from "aws-sdk";
import { injectable } from "tsyringe";
import type { ISNSService } from "./ISNSService";

@injectable()
export class SNSService implements ISNSService {
	private sns: SNS;

	constructor() {
		this.sns = AWS_SNS;
	}

	async SendSMS(data: ISNSService.Params): Promise<ISNSService.Result> {
		try {
			const response = await this.sns
				.publish({
					Message: data.message,
					PhoneNumber: data.phone,
				})
				.promise();

			logger.info(response);

			return {
				success: true,
			};
		} catch (error) {
			logger.error(error);

			return {
				success: false,
			};
		}
	}
}
