import { useState, useEffect } from 'react';
import { User } from '../types/interfaces';

async function canRead(user: User): Promise<boolean> {
	const response = await fetch(
		`/api/authorize?userId=${user.name}&action=read&resource=posts`
	);
	const { actionAllowed } = await response.json();
	return !!actionAllowed;
}

const tempUser: User = {
	name: 'John',
	role: 'admin',
};

export default function Home() {
	const [data, setData] = useState<User | null>(null);
	useEffect(() => {
		canRead(tempUser).then((readable) => {
			if (readable) setData(tempUser);
		});
	}, []);
	return <>{data?.name || 'denied'}</>;
}
