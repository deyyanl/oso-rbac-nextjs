import type { NextApiRequest, NextApiResponse } from 'next';
import { Oso } from 'oso-cloud';
const API_KEY: string = process.env.OSO_AUTH || '';
const API_URL: string = 'https://cloud.osohq.com';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const oso = new Oso(API_URL, API_KEY);
	const { userId, resource, action } = req.query;

	return new Promise((resolve, reject) => {
		oso
			.authorize(String(userId), String(action), String(resource))
			.then((result) => {
				console.log(result);
				res.status(200).json({ actionAllowed: result });
			})
			.catch((error) => {
				console.log(error);
				res.status(500).json({ actionAllowed: false });
				resolve(error);
			});
		resolve(true);
	});
}
