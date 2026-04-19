import { SnackbarList } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';

export const Notices = () => {
	const { removeNotice } = useDispatch( noticesStore );
	const notices = useSelect(
		( select ) => select( noticesStore ).getNotices(),
		[]
	);

	if ( notices.length === 0 ) {
		return null;
	}

	return (
		<div className="fixed bottom-0 end-0 z-50">
			<SnackbarList
				notices={ notices }
				className="relative bottom-4 end-4"
				onRemove={ ( notice ) => {
					removeNotice( notice );
				} }
			/>
		</div>
	);
};
