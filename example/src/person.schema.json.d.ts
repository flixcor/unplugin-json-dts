export const $id : "https://example.com/person.schema.json";
export const $schema : "https://json-schema.org/draft/2020-12/schema";
export const title : "Person";
export const type : "object";
export const properties : {
	firstName: {
		type: "string",
		description: "The person's first name."
	},
	lastName: {
		type: "string",
		description: "The person's last name."
	},
	age: {
		description: "Age in years which must be equal to or greater than zero.",
		type: "integer",
		minimum: 0
	}
};
declare const $defaultExport: {
	$id: typeof $id,
	$schema: typeof $schema,
	title: typeof title,
	type: typeof type,
	properties: typeof properties
};

export default $defaultExport