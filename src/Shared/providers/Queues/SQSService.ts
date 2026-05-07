// import { AWS_SQS } from "Config/AWS/SQS/SQSConfig";
// import type AWS from "aws-sdk";
// import type { ReceiveMessageResult } from "aws-sdk/clients/sqs";

// import type { ISQSService, ISQSServiceMessageBody } from "./ISQSConfig";

// /**
//  * @note Esta classe não deve ser usada diretamente.
//  * Utilize os serviços de fila específicos.
//  */
// export class SQSService implements ISQSService {
// 	private sqs: AWS.SQS;

// 	constructor() {
// 		this.sqs = AWS_SQS;
// 	}

// 	async sendMessage(queueUrl: string, messageBody: ISQSServiceMessageBody): Promise<void> {
// 		const params = {
// 			QueueUrl: queueUrl,
// 			MessageBody: JSON.stringify(messageBody),
// 		};

// 		try {
// 			await this.sqs.sendMessage(params).promise();
// 		} catch (error) {
// 			console.error("Error sending message:", error);
// 			throw error;
// 		}
// 	}

// 	async receiveMessages(queueUrl: string): Promise<ISQSServiceMessageBody[]> {
// 		const params = {
// 			QueueUrl: queueUrl,
// 			MaxNumberOfMessages: 10, // Define quantas mensagens consumir por vez
// 			WaitTimeSeconds: 10, // Long polling para melhorar a performance
// 		};

// 		try {
// 			const data: ReceiveMessageResult = await this.sqs.receiveMessage(params).promise();

// 			const messages: ISQSServiceMessageBody[] = [];

// 			if (data.Messages) {
// 				for (const message of data.Messages) {
// 					if (message.Body) {
// 						messages.push(JSON.parse(message.Body));
// 						await this.deleteMessage(queueUrl, message.ReceiptHandle!);
// 					}
// 				}
// 			} else {
// 				console.log("No messages to process.");
// 			}

// 			return messages;
// 		} catch (error) {
// 			console.error("Error receiving messages:", error);
// 			throw error;
// 		}
// 	}

// 	private async deleteMessage(queueUrl: string, receiptHandle: string): Promise<void> {
// 		const params = {
// 			QueueUrl: queueUrl,
// 			ReceiptHandle: receiptHandle,
// 		};

// 		try {
// 			await this.sqs.deleteMessage(params).promise();
// 		} catch (error) {
// 			console.error("Error deleting message:", error);
// 			throw error;
// 		}
// 	}
// }
