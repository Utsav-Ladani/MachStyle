import { dispatch } from '@wordpress/data';
import { store as noticeStore } from '@wordpress/notices';

const ID = 'mach-style';

export const createNotice = (
	message: string,
	type: 'success' | 'info' | 'error' = 'success'
) => {
	dispatch( noticeStore ).createNotice( type, message, {
		id: ID,
		type,
		isDismissible: true,
	} );
};
