export namespace ISNSService {
	export type Params = {
		phone: string;
		message: string;
	};
	export type Result = {
		success: boolean;
	};
}

export interface ISNSService {
	SendSMS(data: ISNSService.Params): Promise<ISNSService.Result>;
}
