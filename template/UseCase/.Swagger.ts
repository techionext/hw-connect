import { registry } from "@Config/Swagger/Swagger";
import { swaggerResponseField } from "@Shared/Util/ZOD/Fields/Custom/swaggerResponse";
import { REPLACERequestSchema } from "./Schema/REPLACE.Schema.Request";
import { rEPLACEResponseSchema } from "./Schema/REPLACE.Schema.Response";

registry.registerPath({
	method: "post",
	path: "/",
	tags: [""],
	summary: "",

	request: {
		params: REPLACERequestSchema.shape.params,

		query: REPLACERequestSchema.shape.query,

		body: {
			content: {
				"application/json": {
					schema: REPLACERequestSchema.shape.body,
				},
			},
		},
	},

	responses: {
		200: {
			description: "Sucesso",
			content: {
				"application/json": {
					schema: rEPLACEResponseSchema,
				},
			},
		},

		400: {
			description: "Ocorreu algum erro",
			content: {
				"application/json": {
					schema: swaggerResponseField,
				},
			},
		},
	},
});
