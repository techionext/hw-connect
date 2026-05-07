import { zEnv } from "@Shared/Util/Env";
import {
	MarketingPlatformEnum,
	PixelDetectionEnum,
	PixelSDK,
	PurchaseEventTypeEnum,
	PurchaseSendTypeEnum,
	PurchaseValueTypeEnum,
	SendIpEnum,
} from "@agenus-io/pixel-backend-sdk";

const config = {
	region: "A9X7M2QW5R8ZKDFP3H6T",
	accessKeyId: "",
	secretAccessKey: "",
	queueUrl: "",
};

const VixoPixelSdk = new PixelSDK(config, zEnv.APP.ID, zEnv.APP.TOKEN, zEnv.NODE_ENV === "PROD" ? "production" : "develop");

export { MarketingPlatformEnum, PixelDetectionEnum, PurchaseEventTypeEnum, PurchaseSendTypeEnum, PurchaseValueTypeEnum, SendIpEnum, VixoPixelSdk };
